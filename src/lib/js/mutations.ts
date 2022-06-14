import type { ToastMessage } from './types'

import {
  codeWord,
  previousGuesses,
  currentGuess,
  gameIsOver,
  runningScore,
  remainingAttempts,
  usedAttempts,
  maxRemainingAttempts,
  discoveredCodeWord,
  shownModal,
  message,
  messageType,
  bonusWindow,
  streak,
  pointsScoredForLastGuess
} from './state'
import { PREVIOUS_HIGH_SCORES_STORAGE_KEY, GAME_DATA_STORAGE_KEY } from './constants'
import { isValidGuess, load, save } from './helpers'
import { codeWords } from './codeWords'

import { dev } from '$app/env'
import { SvelteComponent, tick } from 'svelte'
import { get } from 'svelte/store'


export const startNewGame = (): void => {
  save(GAME_DATA_STORAGE_KEY, null)
  window.location.reload()
}

export const getRandomCodeWord = (): string => {
  return codeWords[Math.floor(Math.random() * codeWords.length)]
}

export const setNewRandomCodeWord = (log = false): void => {
  const newWord: string = getRandomCodeWord()
  if (newWord !== get(codeWord) && !get(previousGuesses).includes(newWord)) {
    codeWord.set(newWord)
    if (log) {
      // eslint-disable-next-line no-console
      console.log(newWord)
    }
    return
  }
  setNewRandomCodeWord(log)
}

export const handleNewGuess = (): void => {
  if (isValidGuess(get(currentGuess))) {
    if (!get(previousGuesses).includes(get(currentGuess))) {
      const previousFour = [...get(previousGuesses)]
      previousFour.shift()
      previousGuesses.set([...previousFour, get(currentGuess)])

      setNewScores()
      if (!get(gameIsOver)) {
        saveGameData()
      }
    } else if (get(previousGuesses).includes(get(currentGuess)) && get(currentGuess) === get(codeWord)){
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
  if (adjustedRunningScore > 100) {
    runningScore.set(100)
    return
  }
  runningScore.set(adjustedRunningScore)
}

export const incrementStreak = (adjustment: number): void => {
  streak.set(get(streak) + adjustment)
}

export const setStreak = (value: number): void => {
  streak.set(value)
}

export const setNewScores = (): void => {
  if (get(currentGuess) === get(codeWord)) {
    const tally = 1 + get(streak)
    incrementRunningScore(tally)
    pointsScoredForLastGuess.set(tally)
    incrementRemainingAttempts(1)
    incrementStreak(1)
    handleCorrectGuess()
  } else {
    incrementRemainingAttempts(-1)
    setStreak(0)
  }
  // Update the count of total used guesses
  usedAttempts.set(get(usedAttempts) + 1)

  // Clear the current guess
  currentGuess.set('')

  // Check for game over state
  if (get(remainingAttempts) <= 0 || get(runningScore) >= 100) {
    gameIsOver.set(true)
    registerHighScore()
    localStorage.removeItem(GAME_DATA_STORAGE_KEY)
  }
}

export const showModal = (modal: SvelteComponent): void => {
  shownModal.set(modal)
}

export const closeModal = (): void => {
  shownModal.set(null)
}

export const registerHighScore = (): void => {
  let previousHighScores = load(PREVIOUS_HIGH_SCORES_STORAGE_KEY) || []

  // Just some cleanup from prerelease data saving. Can be removed later.
  previousHighScores = previousHighScores.filter(item => typeof item !== 'number')

  save(
    PREVIOUS_HIGH_SCORES_STORAGE_KEY, 
    [...previousHighScores, [get(runningScore), get(usedAttempts)]]
  )
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
  save(GAME_DATA_STORAGE_KEY, {
    codeWord: window.btoa(get(codeWord)),
    previousGuesses: get(previousGuesses),
    remainingAttempts: get(remainingAttempts),
    runningScore: get(runningScore),
    gameIsOver: get(gameIsOver),
    maxRemainingAttempts: get(maxRemainingAttempts),
    usedAttempts: get(usedAttempts),
    streak: get(streak),
    bonusWindow: get(bonusWindow),
  })
}

export const setToast = async (msg: ToastMessage = { message: '', type: 'warning' }): Promise<void> => {
  message.set('')
  await tick()
  message.set(msg.message)
  messageType.set(msg.type)
}

export const shuffleGuesses = (): void => {
  let newGuesses: string[] = []

  while (newGuesses.length < 5) {
    const wordToAdd = getRandomCodeWord()

    if (wordToAdd !== get(codeWord) && !newGuesses.includes(wordToAdd)) {
      newGuesses = [...newGuesses, wordToAdd]
    }
  }

  const previousAttempts = get(remainingAttempts)

  newGuesses.forEach(newGuess => {
    remainingAttempts.set(get(remainingAttempts) + 1)
    currentGuess.set(newGuess)
    handleNewGuess()
  })
  
  remainingAttempts.set(previousAttempts - 2)
}