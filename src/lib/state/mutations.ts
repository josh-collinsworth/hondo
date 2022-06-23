import type { ToastMessage } from '../js/types'
import {
  codeWord,
  currentGuesses,
  currentGuess,
  gameIsOver,
  runningScore,
  remainingAttempts,
  usedAttempts,
  maxRemainingAttempts,
  discoveredCodeWord,
  streak,
  pointsScoredForLastGuess,
  previousGuesses,
} from './game'
import { shownModal, toast, isMenuOpen } from './global'
import { isDarkMode } from './user'
import {
  GAME_HISTORY_STORAGE_KEY,
  GAME_DATA_STORAGE_KEY,
  LONGEST_STREAK_STORAGE_KEY,
  SCORE_TICK_DURATION,
  SHUFFLE_COST,
  STARTING_GUESSES,
} from '../js/constants'

import { isValidGuess, loadFromLocalStorage, saveToLocalStorage } from '../js/helpers'
import { codeWords } from '../js/codeWords'

import { dev } from '$app/env'
import { goto } from '$app/navigation'
import { SvelteComponent, tick } from 'svelte'
import { get } from 'svelte/store'
import { adjustedGuessBenefit, adjustedGuessCost, adjustedScorePerCodeWord, isStreakAllowed, selectedStaticPowerup } from './powerups'


export const startNewGame = (): void => {
  saveToLocalStorage(GAME_DATA_STORAGE_KEY, null)
  setDefaultGameState()
  goto('/game')
}

export const getRandomCodeWord = (): string => {
  return codeWords[Math.floor(Math.random() * codeWords.length)]
}

export const setNewRandomCodeWord = (log = false): void => {
  const newWord: string = getRandomCodeWord()
  if (newWord !== get(codeWord) && !get(currentGuesses).includes(newWord)) {
    codeWord.set(newWord)
    if (log) {
      console.log(newWord) // eslint-disable-line no-console
    }
    return
  }
  setNewRandomCodeWord(log)
}

export const handleNewGuess = (): void => {
  if (isValidGuess(get(currentGuess))) {
    if (!get(currentGuesses).includes(get(currentGuess))) {
      previousGuesses.set([...get(currentGuesses)])
      currentGuesses.set([...get(currentGuesses).slice(1, 5), get(currentGuess)])

      setNewScores()
      if (!get(gameIsOver)) {
        saveGameData()
      }
      
    } else if (get(currentGuesses).includes(get(currentGuess)) && get(currentGuess) === get(codeWord)){
      // This whole condition is here just to handle weird error states. Hopefully isn't needed in prod.
      setToast({ message: 'Bad state detected. Reshuffling…', type: 'warning'})
      handleCorrectGuess()
      currentGuess.set('')
    } else {
      setToast({ message: 'Already guessed that word', type: 'warning'})
    }
  } else if (get(currentGuess).length === 5) {
    setToast({ message: 'Sorry, not in word list', type: 'warning'})
  }
}

export const incrementRemainingAttempts = (adjustment: number): void => {
  const adjustedRemainingAttempts = get(remainingAttempts) + adjustment
  if (adjustedRemainingAttempts > get(maxRemainingAttempts)) {
    remainingAttempts.set(get(maxRemainingAttempts))
    return
  }
  remainingAttempts.set(adjustedRemainingAttempts)
}

export const incrementRunningScore = (adjustment: number): void => {
  const adjustedRunningScore = get(runningScore) + adjustment
  const scoreDifferential = Math.abs(adjustedRunningScore - get(runningScore))
  let timer = 0
  
  for (let i = 0; i < scoreDifferential; i++) {
    timer += SCORE_TICK_DURATION
    setTimeout(() => {
      runningScore.set(Math.min(get(runningScore) + 1, 100))
      if (get(runningScore) >= 100) {
        handleEndgame()
        return
      }
    }, timer)
  }
}

export const incrementStreak = (adjustment: number): void => {
  streak.set(get(streak) + adjustment)
}

export const setStreak = (value: number): void => {
  streak.set(value)
}

export const setNewScores = (): void => {
  if (get(currentGuess) === get(codeWord)) {
    const streakPoints = get(isStreakAllowed) ? get(streak) : 0
    const tally = get(adjustedScorePerCodeWord) + streakPoints
    incrementRunningScore(tally)
    pointsScoredForLastGuess.set(tally)
    incrementRemainingAttempts(get(adjustedGuessBenefit))
    incrementStreak(1)
    handleCorrectGuess()
  } else {
    incrementRemainingAttempts(-get(adjustedGuessCost))
    setStreak(0)
  }
  // Update the count of total used guesses
  usedAttempts.set(get(usedAttempts) + 1)

  // Clear the current guess
  currentGuess.set('')

  // Alert the player if this is their last guess
  if (get(remainingAttempts) && get(remainingAttempts) <= get(adjustedGuessCost)) {
    setToast({
      message: 'Last guess!',
      type: 'warning',
    })
  }

  // Check for game over state
  if (get(remainingAttempts) <= 0 || get(runningScore) >= 100) {
    handleEndgame()
  }
}

export const handleEndgame = (): void => {
  gameIsOver.set(true)
  registerHighScore()
  localStorage.removeItem(GAME_DATA_STORAGE_KEY)
}

export const showModal = (modal: SvelteComponent): void => {
  shownModal.set(modal)
}

export const closeModal = (): void => {
  shownModal.set(null)
}

export const registerHighScore = (): void => {
  let previousHighScores = loadFromLocalStorage(GAME_HISTORY_STORAGE_KEY) || []

  // Just some cleanup from prerelease data saving. Can be removed later.
  previousHighScores = previousHighScores.filter(item => typeof item !== 'number')

  saveToLocalStorage(GAME_HISTORY_STORAGE_KEY, [
    ...previousHighScores, [get(runningScore), get(usedAttempts)]
  ])
}

export const handleCorrectGuess = (): void => {
  discoveredCodeWord.set(get(codeWord))
  saveGameData()
  setTimeout(async () => {
    discoveredCodeWord.set('')
    setNewRandomCodeWord(dev)
    saveGameData()
  }, 1200)
}

export const saveGameData = (): void => {
  saveToLocalStorage(GAME_DATA_STORAGE_KEY, {
    codeWord: window.btoa(get(codeWord)),
    currentGuesses: get(currentGuesses),
    previousGuesses: get(previousGuesses),
    remainingAttempts: get(remainingAttempts),
    runningScore: get(runningScore),
    gameIsOver: get(gameIsOver),
    maxRemainingAttempts: get(maxRemainingAttempts),
    usedAttempts: get(usedAttempts),
    streak: get(streak),
  })
  const longestStreak = loadFromLocalStorage(LONGEST_STREAK_STORAGE_KEY) || 0
  if (get(pointsScoredForLastGuess) > longestStreak) {
    saveToLocalStorage(LONGEST_STREAK_STORAGE_KEY, get(pointsScoredForLastGuess))
  }
}

export const setToast = async (msg: ToastMessage = { message: '', type: 'warning' }): Promise<void> => {
  const { message, type } = msg
  toast.set({ message: '', type })
  await tick()
  toast.set({ message, type })
}

export const shuffleGuesses = (): void => {
  let newGuesses: string[] = []

  while (newGuesses.length < 5) {
    const wordToAdd = getRandomCodeWord()
    if (wordToAdd !== get(codeWord) && !newGuesses.includes(wordToAdd)) {
      newGuesses = [...newGuesses, wordToAdd]
    }
  }

  previousGuesses.set(get(currentGuesses))
  currentGuesses.set(newGuesses)
  remainingAttempts.set(get(remainingAttempts) - SHUFFLE_COST)
  saveGameData()
}

export const toggleMenuOpen = (): void => {
  isMenuOpen.set(!get(isMenuOpen))
}

export const toggleDarkMode = (): void => {
  isDarkMode.set(!get(isDarkMode))
  if (get(isDarkMode)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  saveToLocalStorage('theme', get(isDarkMode) ? 'dark' : 'light')
}

const setDefaultGameState = (): void => {
  setNewRandomCodeWord()
  currentGuess.set('')
  currentGuesses.set(['',' ','  ','   ','    '])
  previousGuesses.set(['','','','','',])
  remainingAttempts.set(STARTING_GUESSES)
  discoveredCodeWord.set('')
  runningScore.set(0)
  usedAttempts.set(0)
  gameIsOver.set(false)
  maxRemainingAttempts.set(STARTING_GUESSES)
  streak.set(0)
  pointsScoredForLastGuess.set(0)
}