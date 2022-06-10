import { legalGuesses } from './legalGuesses'

export const alphabetAsString = 'abcdefghijklmnopqrstuvwxyz'
export const alphabetAsArray: string[] = [...alphabetAsString]

export const isSingleLetter = (str: string): boolean => {
  return alphabetAsArray.includes(str)
}

export const stringContainsLetter = (str: string): boolean => {
  str = str.toLowerCase()
  return Boolean(str.match(/[abcdefghijklmnopqrstuvwxyz]/))
}

export const save = (key: string, data: any): void => {
  localStorage.setItem(key, JSON.stringify(data))
}

export const load = (key: string): any => {
  const item = localStorage.getItem(key)
  if (item) {
    return JSON.parse(localStorage.getItem(key))
  }
  return null
}

export const isValidGuess = (guess: string): boolean => {
  return guess.length === 5 && legalGuesses.includes(guess.toLowerCase())
}

export const randomIntegerInRange = (min: number, max: number): number => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const floatFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});