import type { SvelteComponent } from 'svelte'
import { writable } from 'svelte/store'
import { STARTING_GUESSES } from './constants'

import type { ToastMessage } from './types'

export const currentGuess = writable<string>('')
export const codeWord =  writable<string>('')
export const previousGuesses = writable<string[]>(['',' ','  ','   ','    '])
export const remainingAttempts = writable<number>(STARTING_GUESSES)
export const discoveredCodeWord = writable<string>('')
export const isLoading = writable<boolean>(false)
export const isLoadingNewWord = writable<boolean>(false)
export const runningScore = writable<number>(0)
export const usedAttempts = writable<number>(0)
export const gameIsOver = writable<boolean>(false)
export const maxRemainingAttempts = writable<number>(STARTING_GUESSES)
export const message = writable<string>('')
export const messageType = writable<ToastMessage>({ message: '' })
export const darkMode = writable<boolean>(false)
export const shownModal = writable<SvelteComponent|null>(null)

export const bonusWindow = writable<number>(0)
export const streak = writable<number>(0)
export const pointsScoredForLastGuess = writable<number>(0)