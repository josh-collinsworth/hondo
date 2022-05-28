import legalGuesses from './legalGuesses'
import codeWords from './codeWords'
import { previousGuesses, codeWord, runningScore, remainingAttempts, currentGuess, gameIsOver, maxScore } from './state'
import { get } from 'svelte/store'
import { STARTING_GUESSES } from './constants'

export const alphabetAsString = 'abcdefghijklmnopqrstuvwxyz'
export const alphabetAsArray: string[] = [...alphabetAsString]

export const isSingleLetter = (str: string): boolean => {
  return alphabetAsArray.includes(str)
}

export const stringContainsLetter = (str: string): boolean => {
  str = str.toLowerCase()
  return Boolean(str.match(/[abcdefghijklmnopqrstuvwxyz]/))
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
  const [partial, full] = evaluateGuess(get(currentGuess))

  if (full === 5) {
    runningScore.set(get(runningScore) + 1)
    remainingAttempts.set(Math.min(get(maxScore), get(remainingAttempts) + 1))
  } else {
    remainingAttempts.set(get(remainingAttempts) - 1)
  }

  maxScore.set(STARTING_GUESSES - Math.floor(get(runningScore) / 10))

  currentGuess.set('')

  if (get(remainingAttempts) <= 0) {
    gameIsOver.set(true)
  }
}