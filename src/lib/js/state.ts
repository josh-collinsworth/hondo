import { writable } from 'svelte/store'
import { STARTING_GUESSES } from './constants'

import type { ToastStatus } from './types'

export const currentGuess = writable<string>('')
export const codeWord =  writable<string>('')
export const previousGuesses = writable<string[]>(['',' ','  ','   ','    '])
export const remainingAttempts = writable<number>(STARTING_GUESSES)
export const discoveredCodeWord = writable<string>('')
export const isLoadingNewWord = writable<boolean>(false)
export const runningScore = writable<number>(0)
export const usedAttempts = writable<number>(0)
export const gameIsOver = writable<boolean>(false)
export const maxRemainingAttempts = writable<number>(STARTING_GUESSES)
export const message = writable<string>('')
export const messageType = writable<ToastStatus>('')
export const darkMode = writable<boolean>(false)
export const remainingLifelineCooldowns = writable<number[]>([])
export const shownModal = writable<Modal>(null)