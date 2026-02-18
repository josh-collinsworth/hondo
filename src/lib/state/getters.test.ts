import { describe, it, expect, beforeEach } from 'vitest'
import { get } from 'svelte/store'
import { gameHistory } from './game'
import {
	totalGamesPlayed,
	totalPointsScored,
	totalGuessesUsed,
	highScore,
	hondos,
	totalHondos,
	perfectHondos,
	fastestHondo,
	totalBonusPointsScored,
	totalShufflesUsed,
	totalSkipsUsed
} from './getters'

import type { PlayedGame } from '$lib/js/types'

// PlayedGame = [score, guesses, bonusPoints, shuffles, skips]

beforeEach(() => {
	gameHistory.set([])
})

describe('totalGamesPlayed', () => {
	it('counts entries correctly', () => {
		gameHistory.set([
			[50, 20, 5, 1, 0],
			[75, 25, 10, 2, 1],
			[100, 14, 20, 0, 0]
		])
		expect(get(totalGamesPlayed)).toBe(3)
	})

	it('returns 0 for empty history', () => {
		expect(get(totalGamesPlayed)).toBe(0)
	})
})

describe('totalPointsScored', () => {
	it('sums index [0] of all entries', () => {
		gameHistory.set([
			[50, 20, 5, 1, 0],
			[75, 25, 10, 2, 1]
		])
		expect(get(totalPointsScored)).toBe(125)
	})

	it('returns 0 for empty history', () => {
		expect(get(totalPointsScored)).toBe(0)
	})
})

describe('totalGuessesUsed', () => {
	it('sums index [1] of all entries', () => {
		gameHistory.set([
			[50, 20, 5, 1, 0],
			[75, 25, 10, 2, 1]
		])
		expect(get(totalGuessesUsed)).toBe(45)
	})
})

describe('highScore', () => {
	it('returns max of index [0]', () => {
		gameHistory.set([
			[50, 20, 5, 1, 0],
			[75, 25, 10, 2, 1],
			[60, 18, 3, 0, 0]
		])
		expect(get(highScore)).toBe(75)
	})
})

describe('hondos', () => {
	it('filters for games with score === 100', () => {
		gameHistory.set([
			[100, 20, 15, 1, 0],
			[75, 25, 10, 2, 1],
			[100, 14, 20, 0, 0]
		])
		expect(get(hondos)).toHaveLength(2)
		expect(get(hondos).every((g: PlayedGame) => g[0] === 100)).toBe(true)
	})
})

describe('totalHondos', () => {
	it('returns count of hondos', () => {
		gameHistory.set([
			[100, 20, 15, 1, 0],
			[75, 25, 10, 2, 1],
			[100, 14, 20, 0, 0]
		])
		expect(get(totalHondos)).toBe(2)
	})

	it('returns 0 when no hondos', () => {
		gameHistory.set([[50, 20, 5, 1, 0]])
		expect(get(totalHondos)).toBe(0)
	})
})

describe('perfectHondos', () => {
	it('filters hondos for guesses === 14', () => {
		gameHistory.set([
			[100, 20, 15, 1, 0],
			[100, 14, 20, 0, 0],
			[100, 14, 25, 0, 0]
		])
		expect(get(perfectHondos)).toBe(2)
	})

	it('returns 0 when no perfect hondos', () => {
		gameHistory.set([[100, 20, 15, 1, 0]])
		expect(get(perfectHondos)).toBe(0)
	})
})

describe('fastestHondo', () => {
	it('returns minimum guesses among hondos', () => {
		gameHistory.set([
			[100, 20, 15, 1, 0],
			[100, 16, 20, 0, 0],
			[100, 18, 25, 0, 0]
		])
		expect(get(fastestHondo)).toBe(16)
	})

	it('returns null when no hondos exist', () => {
		gameHistory.set([[50, 20, 5, 1, 0]])
		expect(get(fastestHondo)).toBeNull()
	})

	it('returns null for empty history', () => {
		expect(get(fastestHondo)).toBeNull()
	})
})

describe('totalBonusPointsScored', () => {
	it('sums index [2] correctly', () => {
		gameHistory.set([
			[50, 20, 5, 1, 0],
			[75, 25, 10, 2, 1]
		])
		expect(get(totalBonusPointsScored)).toBe(15)
	})
})

describe('totalShufflesUsed', () => {
	it('sums index [3] correctly', () => {
		gameHistory.set([
			[50, 20, 5, 1, 0],
			[75, 25, 10, 2, 1]
		])
		expect(get(totalShufflesUsed)).toBe(3)
	})
})

describe('totalSkipsUsed', () => {
	it('sums index [4] correctly', () => {
		gameHistory.set([
			[50, 20, 5, 1, 0],
			[75, 25, 10, 2, 1]
		])
		expect(get(totalSkipsUsed)).toBe(1)
	})
})

describe('empty history defaults', () => {
	it('returns sensible defaults for all stores', () => {
		expect(get(totalGamesPlayed)).toBe(0)
		expect(get(totalPointsScored)).toBe(0)
		expect(get(totalGuessesUsed)).toBe(0)
		expect(get(totalHondos)).toBe(0)
		expect(get(perfectHondos)).toBe(0)
		expect(get(fastestHondo)).toBeNull()
		expect(get(totalBonusPointsScored)).toBe(0)
		expect(get(totalShufflesUsed)).toBe(0)
		expect(get(totalSkipsUsed)).toBe(0)
	})
})
