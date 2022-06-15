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
  streak,
  pointsScoredForLastGuess,
  shuffleCooldown
} from './state'

import {
  PREVIOUS_HIGH_SCORES_STORAGE_KEY,
  GAME_DATA_STORAGE_KEY,
  DEFAULT_SHUFFLE_COOLDOWN,
  SCORE_TICK_DURATION,
} from './constants'

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
      console.log(newWord) // eslint-disable-line no-console
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
  shuffleCooldown.set(Math.max(0, get(shuffleCooldown) - 1))

  // Clear the current guess
  currentGuess.set('')

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
  let previousHighScores = load(PREVIOUS_HIGH_SCORES_STORAGE_KEY) || []

  // Just some cleanup from prerelease data saving. Can be removed later.
  previousHighScores = previousHighScores.filter(item => typeof item !== 'number')

  save(PREVIOUS_HIGH_SCORES_STORAGE_KEY, [
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
  save(GAME_DATA_STORAGE_KEY, {
    codeWord: window.btoa(get(codeWord)),
    previousGuesses: get(previousGuesses),
    remainingAttempts: get(remainingAttempts),
    runningScore: get(runningScore),
    gameIsOver: get(gameIsOver),
    maxRemainingAttempts: get(maxRemainingAttempts),
    usedAttempts: get(usedAttempts),
    streak: get(streak),
    shuffleCooldown: get(shuffleCooldown),
  })
}

export const setToast = async (msg: ToastMessage = { message: '', type: 'warning' }): Promise<void> => {
  message.set('')
  await tick()
  message.set(msg.message)
  messageType.set(msg.type)
}

export const shuffleGuesses = (): void => {
  if (get(shuffleCooldown)) return
  let newGuesses: string[] = []

  while (newGuesses.length < 5) {
    const wordToAdd = getRandomCodeWord()

    if (wordToAdd !== get(codeWord) && !newGuesses.includes(wordToAdd)) {
      newGuesses = [...newGuesses, wordToAdd]
    }
  }

  previousGuesses.set(newGuesses)
  shuffleCooldown.set(DEFAULT_SHUFFLE_COOLDOWN)
}