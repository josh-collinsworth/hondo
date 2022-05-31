import legalGuesses from './legalGuesses'
import codeWords from './codeWords'
import { previousGuesses, codeWord, runningScore, remainingAttempts, currentGuess, gameIsOver, maxRemainingAttempts, usedAttempts, message } from './state'
import { GAME_DATA_STORAGE_KEY, PREVIOUS_HIGH_SCORES_STORAGE_KEY } from './constants'
import { get } from 'svelte/store'
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

export const chooseRandomCodeWord = (): void => {
  const newWord = codeWords[Math.floor(Math.random() * codeWords.length)]
  if (newWord !== get(codeWord) && !get(previousGuesses).includes(newWord)) {
    codeWord.set(newWord)
    return
  }
  chooseRandomCodeWord()
}

export const evaluateGuess = (guess: string): number[] => {
  const guessArray = [...guess]
  const codeWordArray = [...get(codeWord)]
  let partial = 0
  let full = 0

  for (let i = 0; i < 5; i++) {
    if (codeWordArray[i] === guessArray[i]) {
      full++
    } else if (codeWordArray.includes(guessArray[i])) {
      partial++
    }
  }
  return [partial, full]
}

export const setNewScores = (): void => {
  //TODO: partial is never used.
  const [partial, full] = evaluateGuess(get(currentGuess))
  
  if (full === 5) {
    runningScore.set(get(runningScore) + 1)
    remainingAttempts.set(Math.min(get(maxRemainingAttempts), get(remainingAttempts) + 1))
  } else {
    remainingAttempts.set(get(remainingAttempts) - 1)
  }
  usedAttempts.set(get(usedAttempts) + 1)

  if (get(maxRemainingAttempts) < get(remainingAttempts)) {
    remainingAttempts.set(get(maxRemainingAttempts))
  }
  currentGuess.set('')

  if (get(remainingAttempts) <= 0) {
    gameIsOver.set(true)

    const previousHighScores = load(PREVIOUS_HIGH_SCORES_STORAGE_KEY) || []
    save(PREVIOUS_HIGH_SCORES_STORAGE_KEY, [...previousHighScores, get(runningScore)])
    localStorage.removeItem(GAME_DATA_STORAGE_KEY)
  }
}

export const saveGameData = (): void => {
  // This prevents saving more guesses than it should, since there's a slight delay between entry of the word and updating of the game board
  const guessesToSave = get(previousGuesses)
  if (guessesToSave.length > 5) guessesToSave.slice(1, 6)

  save(GAME_DATA_STORAGE_KEY, {
    codeWord: get(codeWord),
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