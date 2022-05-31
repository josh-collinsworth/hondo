import { writable } from 'svelte/store'

export const currentGuess = writable('')
export const codeWord =  writable('')
export const previousGuesses = writable(['',' ','  ','   ','    '])
export const remainingAttempts = writable(10)
export const discoveredCodeWord = writable('')
export const isLoadingNewWord = writable(false)
export const runningScore = writable(0)
export const usedAttempts = writable(0)
export const gameIsOver = writable(false)
export const maxRemainingAttempts = writable(10)
export const message = writable('')