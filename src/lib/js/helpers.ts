import legalGuesses from './legalGuesses'
import codeWords from './codeWords'
import {
  previousGuesses,
  codeWord,
  runningScore,
  remainingAttempts,
  currentGuess,
  gameIsOver,
  maxRemainingAttempts,
  usedAttempts,
  message,
  discoveredCodeWord,
  isLoadingNewWord
} from './state'
import { GAME_DATA_STORAGE_KEY, PREVIOUS_HIGH_SCORES_STORAGE_KEY } from './constants'
import { get } from 'svelte/store'
import { dev } from '$app/env'
import { tick } from 'svelte'

export const alphabetAsString = 'abcdefghijklmnopqrstuvwxyz'
export const alphabetAsArray: string[] = [...alphabetAsString]

export const isSingleLetter = (str: string): boolean => {
  return alphabetAsArray.includes(str)
}

export const stringContainsLetter = (str: string): boolean => {
  str = str.toLowerCase()
  return Boolean(str.match(/[abcdefghijklmnopqrstuvwxyz]/))
}

export const save = (key: string, data: number[]|object): void => {
  localStorage.setItem(key, JSON.stringify(data))
}

export const load = (key: string): any => {
  return JSON.parse(localStorage.getItem(key))
}

export const isValidGuess = (guess: string): boolean => {
  return guess.length === 5 && legalGuesses.includes(guess.toLowerCase())
}

export const chooseRandomCodeWord = (log = false): void => {
  const newWord = codeWords[Math.floor(Math.random() * codeWords.length)]
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
      previousGuesses.set([...get(previousGuesses), get(currentGuess)])

      setNewScores()
      if (!get(gameIsOver)) {
        saveGameData()
      }
    } else {
      setToastMessage('Already guessed that word')
    }
    //Prevents some buggy stuff from happening when loading the game
    if (get(previousGuesses).length > 5) {
      previousGuesses.set([...get(previousGuesses)].slice(1, get(previousGuesses).length))
    }
  } else if (get(currentGuess).length === 5) {
    setToastMessage('Sorry, not in word list')
  }
}

export const setNewScores = (): void => {
  if (get(currentGuess) === get(codeWord)) {
    runningScore.set(get(runningScore) + 1)
    remainingAttempts.set(Math.min(get(maxRemainingAttempts), get(remainingAttempts) + 1))
    handleCorrectGuess()
  } else {
    remainingAttempts.set(get(remainingAttempts) - 1)
  }
  usedAttempts.set(get(usedAttempts) + 1)

  if (get(maxRemainingAttempts) < get(remainingAttempts)) {
    remainingAttempts.set(get(maxRemainingAttempts))
  }
  currentGuess.set('')

  if (get(remainingAttempts) <= 0 || get(runningScore) >= 100) {
    gameIsOver.set(true)
    registerHighScore()
    localStorage.removeItem(GAME_DATA_STORAGE_KEY)
  }
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
  setTimeout(async () => {
    isLoadingNewWord.set(true)
    chooseRandomCodeWord(dev)
    await tick()
    isLoadingNewWord.set(false)
    saveGameData()
  }, 1000)
}

export const saveGameData = (): void => {
  // This prevents saving more guesses than it should, since there's a slight delay between entry of the word and updating of the game board
  const guessesToSave = get(previousGuesses)
  if (guessesToSave.length > 5) guessesToSave.slice(1, 6)

  save(GAME_DATA_STORAGE_KEY, {
    codeWord: window.btoa(get(codeWord)),
    previousGuesses: guessesToSave,
    remainingAttempts: get(remainingAttempts),
    runningScore: get(runningScore),
    gameIsOver: get(gameIsOver),
    maxRemainingAttempts: get(maxRemainingAttempts),
    usedAttempts: get(usedAttempts),
  })
}

export const setToastMessage = async (msg: string): Promise<void> => {
  message.set('')
  await tick()
  message.set(msg)
}

export const randomIntegerInRange = (min: number, max: number): number => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const numberFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 0,      
  maximumFractionDigits: 2,
});