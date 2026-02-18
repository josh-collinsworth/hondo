import { describe, expect, it } from 'vitest';
import { getHighlightArray, isSingleLetter, isValidGuess, stringContainsLetter } from './helpers';

describe('isValidGuess', () => {
	it('returns true for a valid 5-letter word in the dictionary', () => {
		expect(isValidGuess('crane')).toBe(true);
		expect(isValidGuess('kayak')).toBe(true);
	});

	it('returns false for a word not in the dictionary', () => {
		expect(isValidGuess('sltkn')).toBe(false);
	});

	it('returns false for wrong length (too short)', () => {
		expect(isValidGuess('bark')).toBe(false);
		expect(isValidGuess('dog')).toBe(false);
		expect(isValidGuess('hi')).toBe(false);
		expect(isValidGuess('a')).toBe(false);
		expect(isValidGuess('')).toBe(false);
	});

	it('returns false for wrong length (too long)', () => {
		expect(isValidGuess('toolong')).toBe(false);
	});

	it('is case insensitive', () => {
		expect(isValidGuess('CRANE')).toBe(true);
		expect(isValidGuess('Crane')).toBe(true);
	});
});

describe('isSingleLetter', () => {
	it('returns true for lowercase letters', () => {
		expect(isSingleLetter('a')).toBe(true);
		expect(isSingleLetter('z')).toBe(true);
		expect(isSingleLetter('m')).toBe(true);
	});

	it('returns true for uppercase letters', () => {
		expect(isSingleLetter('A')).toBe(true);
		expect(isSingleLetter('Z')).toBe(true);
	});

	it('returns false for digits', () => {
		expect(isSingleLetter('1')).toBe(false);
		expect(isSingleLetter('0')).toBe(false);
	});

	it('returns false for multi-char strings', () => {
		expect(isSingleLetter('ab')).toBe(false);
	});

	it('returns false for empty string', () => {
		expect(isSingleLetter('')).toBe(false);
	});

	it('returns false for special characters', () => {
		expect(isSingleLetter('!')).toBe(false);
		expect(isSingleLetter('@')).toBe(false);
		expect(isSingleLetter(' ')).toBe(false);
	});
});

describe('stringContainsLetter', () => {
	it('returns true for strings containing at least one letter', () => {
		expect(stringContainsLetter('hello')).toBe(true);
		expect(stringContainsLetter('123a')).toBe(true);
		expect(stringContainsLetter('!@#b')).toBe(true);
	});

	it('returns false for pure numbers', () => {
		expect(stringContainsLetter('12345')).toBe(false);
	});

	it('returns false for empty string', () => {
		expect(stringContainsLetter('')).toBe(false);
	});

	it('returns false for special chars only', () => {
		expect(stringContainsLetter('!@#$%')).toBe(false);
		expect(stringContainsLetter('   ')).toBe(false);
	});
});

describe('getHighlightArray', () => {
	it('returns all exact for a perfect match', () => {
		expect(getHighlightArray('crane', 'crane')).toEqual([
			'exact',
			'exact',
			'exact',
			'exact',
			'exact'
		]);
	});

	it('returns all empty for no matches', () => {
		expect(getHighlightArray('xxxxx', 'crane')).toEqual(['', '', '', '', '']);
	});

	it('handles a mix of exact and partial matches', () => {
		// guess "trace" vs code "crane"
		// t: not in crane -> ''
		// r: exact match at index 1 -> 'exact'
		// a: exact match at index 2 -> 'exact'
		// c: in crane but not at index 3 -> 'partial'
		// e: exact match at index 4 -> 'exact'
		expect(getHighlightArray('trace', 'crane')).toEqual(['', 'exact', 'exact', 'partial', 'exact']);
	});

	it('handles duplicate letter in guess, single in code word — only first highlighted', () => {
		// guess "llama" vs code "plane" (p,l,a,n,e)
		// Pass 1 (exact): l≠p, l=l exact, a=a exact, m≠n, a≠e
		// Pass 2 (partial): l not in remaining [p,n,e], m not in remaining, a not in remaining
		expect(getHighlightArray('llama', 'plane')).toEqual(['', 'exact', 'exact', '', '']);
	});

	it('handles duplicate letter in code word, single in guess', () => {
		// guess "flask" vs code "llama" (l,l,a,m,a)
		// Pass 1 (exact): f≠l, l=l exact, a=a exact, s≠m, k≠a
		// Pass 2 (partial): f/s/k not in remaining [l,m,a]
		expect(getHighlightArray('flask', 'llama')).toEqual(['', 'exact', 'exact', '', '']);
	});

	it('exact match takes priority over partial for duplicate letters', () => {
		// guess "geese" vs code "creep" (c,r,e,e,p)
		// Pass 1 (exact): g≠c, e≠r, e=e exact, s≠e, e≠p
		// Pass 2 (partial): e at index 1 matches remaining e -> partial; third e has no remaining match
		expect(getHighlightArray('geese', 'creep')).toEqual(['', 'partial', 'exact', '', '']);
	});

	it('handles double e case: speed vs creep', () => {
		// guess "speed" vs code "creep" (c,r,e,e,p)
		// Pass 1 (exact): s≠c, p≠r, e=e exact, e=e exact, d≠p
		// Pass 2 (partial): p matches remaining p -> partial; s/d no match
		expect(getHighlightArray('speed', 'creep')).toEqual(['', 'partial', 'exact', 'exact', '']);
	});

	it('handles all partial matches', () => {
		// guess "nrcea" vs code "crane" (c,r,a,n,e)
		// Pass 1 (exact): n≠c, r=r exact, c≠a, e≠n, a≠e
		// Pass 2 (partial): n/c/e/a all found in remaining [c,a,n,e]
		expect(getHighlightArray('nrcea', 'crane')).toEqual([
			'partial',
			'exact',
			'partial',
			'partial',
			'partial'
		]);
	});
});
