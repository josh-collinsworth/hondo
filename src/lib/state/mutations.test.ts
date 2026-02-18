import { describe, it, expect, beforeEach, vi } from 'vitest'
import { get } from 'svelte/store'

// Mock $app/environment and $app/navigation before importing mutations
vi.mock('$app/environment', () => ({ dev: false }))
vi.mock('$app/navigation', () => ({ goto: vi.fn() }))

// Mock localStorage
const localStorageMock = (() => {
	let store: Record<string, string> = {}
	return {
		getItem: vi.fn((key: string) => store[key] ?? null),
		setItem: vi.fn((key: string, value: string) => {
			store[key] = value
		}),
		removeItem: vi.fn((key: string) => {
			delete store[key]
		}),
		clear: vi.fn(() => {
			store = {}
		})
	}
})()
Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock })

// Also mock window.btoa for saveGameData
Object.defineProperty(globalThis, 'window', {
	value: {
		...globalThis.window,
		btoa: (str: string) => globalThis.btoa(str)
	},
	writable: true
})

import {
	codeWord,
	currentGuess,
	currentGuesses,
	remainingAttempts,
	runningScore,
	usedAttempts,
	streak,
	maxRemainingAttempts,
	gameIsOver,
	bonusPointsScored,
	shufflesUsed,
	skipsUsed,
	previousGuesses,
	discoveredCodeWord,
	pointsScoredForLastGuess
} from './game'

import {
	setNewScores,
	incrementRemainingAttempts,
	shuffleGuesses,
	skipCodeWord,
	setDefaultGameState
} from './mutations'

import {
	STARTING_GUESSES,
	GUESS_COST,
	GUESS_BENEFIT,
	SHUFFLE_COST,
	SKIP_COST
} from '$lib/js/constants'

function resetStores() {
	codeWord.set('crane')
	currentGuess.set('')
	currentGuesses.set(['', '', '', '', ''])
	previousGuesses.set(['', '', '', '', ''])
	remainingAttempts.set(STARTING_GUESSES)
	maxRemainingAttempts.set(STARTING_GUESSES)
	runningScore.set(0)
	usedAttempts.set(0)
	streak.set(0)
	gameIsOver.set(false)
	bonusPointsScored.set(0)
	shufflesUsed.set(0)
	skipsUsed.set(0)
	discoveredCodeWord.set('')
	pointsScoredForLastGuess.set(0)
	localStorageMock.clear()
}

beforeEach(() => {
	resetStores()
	vi.useFakeTimers()
})

describe('setNewScores', () => {
	describe('correct guess', () => {
		it('increases score, energy, and streak', () => {
			codeWord.set('crane')
			currentGuess.set('crane')
			currentGuesses.set(['apple', 'beach', 'cloud', 'delta', ''])
			// Start below max so we can see energy increase
			remainingAttempts.set(STARTING_GUESSES - 20)

			setNewScores()

			// Score increments by 1 (base) + 0 (streak was 0)
			// incrementRunningScore is async with timers, so advance them
			vi.runAllTimers()
			expect(get(runningScore)).toBe(1)

			// Energy increases by GUESS_BENEFIT (capped at max)
			expect(get(remainingAttempts)).toBe(STARTING_GUESSES - 20 + GUESS_BENEFIT)

			// Streak increments
			expect(get(streak)).toBe(1)
		})

		it('adds streak bonus to score on consecutive correct guesses', () => {
			codeWord.set('crane')
			currentGuess.set('crane')
			currentGuesses.set(['apple', 'beach', 'cloud', 'delta', ''])
			streak.set(3)

			setNewScores()
			vi.runAllTimers()

			// Score should be 1 + 3 (streak) = 4
			expect(get(runningScore)).toBe(4)
			expect(get(streak)).toBe(4)
		})
	})

	describe('incorrect guess', () => {
		it('decreases energy and resets streak', () => {
			codeWord.set('crane')
			currentGuess.set('beach')
			currentGuesses.set(['apple', '', '', '', ''])
			streak.set(3)

			setNewScores()

			expect(get(remainingAttempts)).toBe(STARTING_GUESSES - GUESS_COST)
			expect(get(streak)).toBe(0)
		})

		it('does not change running score', () => {
			codeWord.set('crane')
			currentGuess.set('beach')
			currentGuesses.set(['apple', '', '', '', ''])
			runningScore.set(50)

			setNewScores()
			vi.runAllTimers()

			expect(get(runningScore)).toBe(50)
		})
	})

	it('increments usedAttempts on every guess', () => {
		codeWord.set('crane')
		currentGuess.set('beach')
		currentGuesses.set(['apple', '', '', '', ''])

		expect(get(usedAttempts)).toBe(0)
		setNewScores()
		expect(get(usedAttempts)).toBe(1)
	})

	it('clears currentGuess after every guess', () => {
		codeWord.set('crane')
		currentGuess.set('beach')
		currentGuesses.set(['apple', '', '', '', ''])

		setNewScores()
		expect(get(currentGuess)).toBe('')
	})
})

describe('energy management', () => {
	it('incrementRemainingAttempts caps at maxRemainingAttempts', () => {
		remainingAttempts.set(STARTING_GUESSES - 5)
		maxRemainingAttempts.set(STARTING_GUESSES)

		incrementRemainingAttempts(20)
		expect(get(remainingAttempts)).toBe(STARTING_GUESSES)
	})

	it('incrementRemainingAttempts does not exceed max', () => {
		remainingAttempts.set(STARTING_GUESSES)
		maxRemainingAttempts.set(STARTING_GUESSES)

		incrementRemainingAttempts(10)
		expect(get(remainingAttempts)).toBe(STARTING_GUESSES)
	})

	it('shuffleGuesses costs SHUFFLE_COST energy', () => {
		const before = get(remainingAttempts)
		shuffleGuesses()
		expect(get(remainingAttempts)).toBe(before - SHUFFLE_COST)
	})

	it('skipCodeWord costs SKIP_COST energy', () => {
		const before = get(remainingAttempts)
		skipCodeWord()
		expect(get(remainingAttempts)).toBe(before - SKIP_COST)
	})
})

describe('game over detection', () => {
	it('game ends when remainingAttempts hits 0', () => {
		codeWord.set('crane')
		currentGuess.set('beach')
		currentGuesses.set(['apple', '', '', '', ''])
		remainingAttempts.set(GUESS_COST)

		setNewScores()

		expect(get(gameIsOver)).toBe(true)
	})

	it('game ends when runningScore hits 100', () => {
		codeWord.set('crane')
		currentGuess.set('crane')
		currentGuesses.set(['apple', 'beach', 'cloud', 'delta', ''])
		runningScore.set(99)

		setNewScores()
		vi.runAllTimers()

		expect(get(gameIsOver)).toBe(true)
	})
})

describe('setDefaultGameState', () => {
	it('resets all values to their starting points', () => {
		// Dirty up the state
		runningScore.set(50)
		usedAttempts.set(10)
		streak.set(5)
		remainingAttempts.set(30)
		gameIsOver.set(true)
		bonusPointsScored.set(15)
		shufflesUsed.set(2)
		skipsUsed.set(1)

		setDefaultGameState(false)

		expect(get(currentGuess)).toBe('')
		expect(get(remainingAttempts)).toBe(STARTING_GUESSES)
		expect(get(runningScore)).toBe(0)
		expect(get(usedAttempts)).toBe(0)
		expect(get(gameIsOver)).toBe(false)
		expect(get(maxRemainingAttempts)).toBe(STARTING_GUESSES)
		expect(get(streak)).toBe(0)
		expect(get(pointsScoredForLastGuess)).toBe(0)
		expect(get(bonusPointsScored)).toBe(0)
		expect(get(shufflesUsed)).toBe(0)
		expect(get(skipsUsed)).toBe(0)
		// codeWord should be set to a new random word (non-empty)
		expect(get(codeWord)).toBeTruthy()
	})
})

describe('shuffleGuesses', () => {
	it('produces 5 unique words, none matching the code word', () => {
		codeWord.set('crane')
		shuffleGuesses()

		const guesses = get(currentGuesses)
		expect(guesses).toHaveLength(5)
		expect(new Set(guesses).size).toBe(5)
		expect(guesses).not.toContain('crane')
	})

	it('increments shufflesUsed', () => {
		expect(get(shufflesUsed)).toBe(0)
		shuffleGuesses()
		expect(get(shufflesUsed)).toBe(1)
	})
})
