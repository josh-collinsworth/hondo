import { writable } from 'svelte/store'
import { MAX_SCORE } from './constants'

export const currentGuess = writable('')
export const codeWord =  writable('')
export const previousGuesses = writable(['',' ','  ','   ','    '])
export const remainingAttempts = writable(MAX_SCORE)
export const discoveredCodeWord = writable('')
export const isLoadingNewWord = writable(false)
export const runningScore = writable(0)
export const gameIsOver = writable(false)