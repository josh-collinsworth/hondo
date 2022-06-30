import type { PlayedGame } from '$lib/js/types'
import { writable } from 'svelte/store'
import { STARTING_GUESSES } from '../js/constants'

export const codeWord =  writable<string>('')
export const currentGuess = writable<string>('')
export const currentGuesses = writable<string[]>(['',' ','  ','   ','    '])
export const previousGuesses = writable<string[]>([])
export const remainingAttempts = writable<number>(STARTING_GUESSES)
export const discoveredCodeWord = writable<string>('')
export const isLoadingNewWord = writable<boolean>(false)
export const runningScore = writable<number>(0)
export const usedAttempts = writable<number>(0)
export const gameIsOver = writable<boolean>(false)
export const maxRemainingAttempts = writable<number>(STARTING_GUESSES)
export const streak = writable<number>(0)
export const pointsScoredForLastGuess = writable<number>(0)
export const gameHistory = writable<PlayedGame[]>([])