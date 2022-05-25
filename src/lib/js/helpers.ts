import legalGuesses from './legalGuesses'
import codeWords from './codeWords'
import { MAX_SCORE } from './constants'
import { previousGuesses, codeWord, runningScore, score, currentGuess, gameIsOver } from './state'
import { get } from 'svelte/store'

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
  console.log('choosing')
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
  const addedPoints = partial + full + full
  runningScore.set(get(runningScore) + addedPoints)

  const adjustedPoints = get(score) - 10 + addedPoints
  if (adjustedPoints > MAX_SCORE) {
    score.set(MAX_SCORE)
  } else {
    score.set(adjustedPoints)
  }

  currentGuess.set('')

  if (get(score) <= 0) {
    gameIsOver.set(true)
  }
}