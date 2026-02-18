import { describe, it, expect } from 'vitest'
import { codeWords } from './codeWords'
import { legalGuesses } from './legalGuesses'

describe('word list integrity', () => {
	it('all code words are exactly 5 characters', () => {
		for (const word of codeWords) {
			expect(word).toHaveLength(5)
		}
	})

	it('all legal guesses are exactly 5 characters', () => {
		for (const word of legalGuesses) {
			expect(word).toHaveLength(5)
		}
	})

	it('no duplicate code words', () => {
		const unique = new Set(codeWords)
		expect(unique.size).toBe(codeWords.length)
	})

	it('no duplicate legal guesses', () => {
		const unique = new Set(legalGuesses)
		expect(unique.size).toBe(legalGuesses.length)
	})

	it('every code word is also in the legal guesses list', () => {
		for (const word of codeWords) {
			expect(legalGuesses).toContain(word)
		}
	})

	it('code words list is non-empty', () => {
		expect(codeWords.length).toBeGreaterThan(0)
	})

	it('legal guesses list is non-empty and larger than code words', () => {
		expect(legalGuesses.length).toBeGreaterThan(0)
		expect(legalGuesses.length).toBeGreaterThan(codeWords.length)
	})
})
