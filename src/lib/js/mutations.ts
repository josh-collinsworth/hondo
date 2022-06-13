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
  remainingLifelineCooldowns,
  shownModal,
  message,
  messageType,
  bonusWindow,
  streak,
  pointsScoredForLastGuess
} from './state'
import { PREVIOUS_HIGH_SCORES_STORAGE_KEY, GAME_DATA_STORAGE_KEY, LIFELINE_DURATION } from './constants'
import { isValidGuess, load, save } from './helpers'
import { codeWords } from './codeWords'

import { dev } from '$app/env'
import { SvelteComponent, tick } from 'svelte'
import { get } from 'svelte/store'


export const startNewGame = (): void => {
  save(GAME_DATA_STORAGE_KEY, null)
  window.location.reload()
}

export const chooseRandomCodeWord = (log = false): void => {
  const newWord: string = codeWords[Math.floor(Math.random() * codeWords.length)]
  if (newWord !== get(codeWord) && !get(previousGuesses).includes(newWord)) {
    codeWord.set(newWord)
    if (log) {
      // eslint-disable-next-line no-console
      console.log(newWord)
    }
    return
  }
  chooseRandomCodeWord(log)
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

const updateLifelinesAfterGuess = (): void => {
  if (!get(remainingLifelineCooldowns).length) return
  const previousCooldowns = get(remainingLifelineCooldowns)
  previousCooldowns[0] -= 1

  if (previousCooldowns[0] === 0) {
    previousCooldowns.shift()     
    maxRemainingAttempts.set(get(maxRemainingAttempts) + 1)
  }
  remainingLifelineCooldowns.set(previousCooldowns)
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

export const setNewScores = (): void => {
  // Update the lifelines and see if we need to restore max attempts
  updateLifelinesAfterGuess()

  // We do the above before this so score can be added if a new max attempt was just unlocked
  if (get(currentGuess) === get(codeWord)) {
    const tally = 1 + (get(bonusWindow) ? 1 : 0) + (get(streak) || 0)
    incrementRunningScore(tally)
    pointsScoredForLastGuess.set(tally)
    incrementRemainingAttempts(1)
    bonusWindow.set(2)
    if (get(streak) !== null) {
      streak.set(get(streak) + 1)
    } else {
      streak.set(0)
    }
    handleCorrectGuess()
  } else {
    incrementRemainingAttempts(-1)
    bonusWindow.set(Math.max(get(bonusWindow) - 1, 0))
    streak.set(null)
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

export const useLifeline = (): void => {
  // Is +1 because the first one will immediately be reduced by 1 as part of setNewScores()
  const durationOfCooldownsToAdd: number = get(remainingLifelineCooldowns).length ? LIFELINE_DURATION : LIFELINE_DURATION + 1
  const quantityOfCooldownsToAdd: number = get(remainingLifelineCooldowns).length + 1
  const cooldownsToAdd: number[] = Array.from({ length: quantityOfCooldownsToAdd }).fill(durationOfCooldownsToAdd)

  maxRemainingAttempts.set(get(maxRemainingAttempts) - quantityOfCooldownsToAdd)
  remainingLifelineCooldowns.set(
    [...get(remainingLifelineCooldowns), ...cooldownsToAdd]
  ) 

  currentGuess.set(get(codeWord))
  handleNewGuess()
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
    chooseRandomCodeWord(dev)
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
    remainingLifelineCooldowns: get(remainingLifelineCooldowns),
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
