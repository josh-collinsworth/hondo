import { writable, derived } from 'svelte/store'
import { STARTING_GUESSES } from './constants'

export const currentGuess = writable('')
export const codeWord =  writable('')
export const previousGuesses = writable(['',' ','  ','   ','    '])
export const remainingAttempts = writable(10)
export const discoveredCodeWord = writable('')
export const isLoadingNewWord = writable(false)
export const runningScore = writable(9)
export const usedAttempts = writable(0)
export const gameIsOver = writable(false)
export const maxRemainingAttempts = derived(
  runningScore, 
  $runningScore => STARTING_GUESSES - Math.floor($runningScore / 10)
)
export const message = writable('')