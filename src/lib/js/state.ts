import { writable } from 'svelte/store'
import { STARTING_GUESSES } from './constants'

export const currentGuess = writable('')
export const codeWord =  writable('')
export const previousGuesses = writable(['',' ','  ','   ','    '])
export const remainingAttempts = writable(STARTING_GUESSES)
export const discoveredCodeWord = writable('')
export const isLoadingNewWord = writable(false)
export const runningScore = writable(0)
export const usedAttempts = writable(0)
export const gameIsOver = writable(false)
export const maxRemainingAttempts = writable(STARTING_GUESSES)
export const message = writable('')
