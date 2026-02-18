import { legalGuesses } from './legalGuesses';

export const alphabetAsString = 'abcdefghijklmnopqrstuvwxyz';
export const alphabetAsArray: string[] = [...alphabetAsString];

export const isSingleLetter = (str: string): boolean => {
	return alphabetAsArray.includes(str.toLowerCase());
};

export const stringContainsLetter = (str: string): boolean => {
	str = str.toLowerCase();
	return Boolean(str.match(/[abcdefghijklmnopqrstuvwxyz]/));
};

export const saveToLocalStorage = (key: string, data: any): void => {
	localStorage.setItem(key, JSON.stringify(data));
};

export const loadFromLocalStorage = (key: string): any => {
	const item = localStorage.getItem(key);
	if (item) {
		return JSON.parse(item);
	}
	return null;
};

export const isValidGuess = (guess: string): boolean => {
	return guess.length === 5 && legalGuesses.includes(guess.toLowerCase());
};

export const randomIntegerInRange = (min: number, max: number): number => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const floatFormatter = new Intl.NumberFormat('en-US', {
	minimumFractionDigits: 0,
	maximumFractionDigits: 2
});

export const getHighlightArray = (guess: string, codeWord: string): string[] => {
	const remaining = [...codeWord];
	return [...guess]
		.map((letter, i) => {
			if ([...codeWord][i] === letter) {
				remaining.splice(
					remaining.findIndex((l) => l === letter),
					1
				);
				return 'exact';
			}
			return letter;
		})
		.map((letter) => {
			if (letter === 'exact') {
				return letter;
			} else if (remaining.includes(letter) && letter) {
				remaining.splice(
					remaining.findIndex((l) => l === letter),
					1
				);
				return 'partial';
			}
			return '';
		});
};
