import type { ToastMessage } from '../js/types'
import {
	codeWord,
	currentGuesses,
	currentGuess,
	gameIsOver,
	runningScore,
	remainingAttempts,
	usedAttempts,
	maxRemainingAttempts,
	discoveredCodeWord,
	streak,
	pointsScoredForLastGuess,
	previousGuesses,
	gameHistory,
	bonusPointsScored,
	shufflesUsed,
	skipsUsed,
} from './game'
import { shownModal, toast, isMenuOpen, isScoring } from './global'
import { isDarkMode } from './user'
import {
	GAME_HISTORY_STORAGE_KEY,
	GAME_DATA_STORAGE_KEY,
	LONGEST_STREAK_STORAGE_KEY,
	SCORE_TICK_DURATION,
	STARTING_GUESSES,
	SHUFFLE_COST,
	SKIP_COST,
	GUESS_COST,
	GUESS_BENEFIT,
} from '../js/constants'

import { isValidGuess, loadFromLocalStorage, saveToLocalStorage } from '../js/helpers'
import { codeWords } from '../js/codeWords'

import { dev } from '$app/environment'
import { goto } from '$app/navigation'
import { tick } from 'svelte'
import { get } from 'svelte/store'

export const startNewGame = (): void => {
	saveToLocalStorage(GAME_DATA_STORAGE_KEY, null)
	setDefaultGameState(dev)
	goto('/')
}

export const getRandomCodeWord = (): string => {
	return codeWords[Math.floor(Math.random() * codeWords.length)]
}

export const setNewRandomCodeWord = (log = false): void => {
	const newWord: string = getRandomCodeWord()
	if (newWord !== get(codeWord) && !get(currentGuesses).includes(newWord)) {
		codeWord.set(newWord)
		if (log) {
			console.log(newWord) // eslint-disable-line no-console
		}
		return
	}
	setNewRandomCodeWord(log)
}

export const handleNewGuess = (): void => {
	if (isValidGuess(get(currentGuess))) {
		if (!get(currentGuesses).includes(get(currentGuess))) {
			previousGuesses.set([...get(currentGuesses)])
			currentGuesses.set([...get(currentGuesses).slice(1, 5), get(currentGuess)])

			setNewScores()
			if (!get(gameIsOver)) {
				saveGameData()
			}
			
		} else if (get(currentGuesses).includes(get(currentGuess)) && get(currentGuess) === get(codeWord)){
			// This whole condition is here just to handle weird error states. Hopefully isn't needed in prod.
			setToast({ message: 'Bad state detected. Reshuffling…', type: 'warning'})
			setTimeout(async () => {
				currentGuess.set('')
				discoveredCodeWord.set('')
				setNewRandomCodeWord(dev)
				saveGameData()
			}, 1200)
		} else {
			setToast({ message: 'Already guessed that word', type: 'warning'})
		}
	} else if (get(currentGuess).length === 5) {
		setToast({ message: 'Sorry, not in word list', type: 'warning'})
	}
}

export const incrementRemainingAttempts = (adjustment: number): void => {
	const adjustedRemainingAttempts = get(remainingAttempts) + adjustment
	if (adjustedRemainingAttempts > get(maxRemainingAttempts)) {
		remainingAttempts.set(get(maxRemainingAttempts))
		return
	}
	remainingAttempts.set(adjustedRemainingAttempts)
}

export const incrementRunningScore = (adjustment: number): void => {
	isScoring.set(true)
	const adjustedRunningScore = get(runningScore) + adjustment
	const scoreDifferential = Math.abs(adjustedRunningScore - get(runningScore))
	let timer = 0

	//TODO: I really need a better way to do all this than setTimouts
	for (let i = 0; i < scoreDifferential; i++) {
		timer += SCORE_TICK_DURATION
		setTimeout(() => {
			// Don't trigger any of this unless we aren't at 100 points yet
			if (get(runningScore) < 100) {
				runningScore.set(Math.min(get(runningScore) + 1, 100))
				if (i > 0) {
					bonusPointsScored.set(get(bonusPointsScored) + 1)
					saveGameData()
				}
				if (get(runningScore) === 100) {
					handleEndgame()
					return
				}
			}
		}, timer)
	}
	setTimeout(() => {
		isScoring.set(false)
	}, (SCORE_TICK_DURATION * scoreDifferential) + 1500) // Extra time helps make sure the new word is selected
}

export const incrementStreak = (adjustment: number): void => {
	streak.set(get(streak) + adjustment)
}

export const setStreak = (value: number): void => {
	streak.set(value)
}

export const setNewScores = (): void => {
	if (get(currentGuess) === get(codeWord)) {
		handleCorrectGuess()
	} else {
		incrementRemainingAttempts(-GUESS_COST)
		setStreak(0)
	}
	// Update the count of total used guesses
	usedAttempts.set(get(usedAttempts) + 1)

	// Clear the current guess
	currentGuess.set('')

	// Alert the player if this is their last guess
	warnIfFinalGuess()

	// Check for game over state
	if (get(remainingAttempts) <= 0 || get(runningScore) >= 100) {
		handleEndgame()
	}
}

export const warnIfFinalGuess = (): void => {
	if (get(remainingAttempts) && get(remainingAttempts) <= GUESS_COST) {
		setToast({
			message: 'Last guess!',
			type: 'warning',
		})
	}
}

export const handleEndgame = (): void => {
	gameIsOver.set(true)
	registerHighScore()
	localStorage.removeItem(GAME_DATA_STORAGE_KEY)
}

export const closeModal = (): void => {
	shownModal.set(null)
}

export const registerHighScore = (): void => {
	let previousHighScores = loadFromLocalStorage(GAME_HISTORY_STORAGE_KEY) || []

	// Just some cleanup from prerelease data saving. Can be removed later.
	previousHighScores = previousHighScores.filter(item => typeof item !== 'number')

	const dataToSave = [
		...previousHighScores, [get(runningScore), get(usedAttempts), get(bonusPointsScored), get(shufflesUsed), get(skipsUsed)]
	]

	saveToLocalStorage(GAME_HISTORY_STORAGE_KEY, dataToSave)
	gameHistory.set(dataToSave)
}

export const handleCorrectGuess = (): void => {
	const streakPoints = get(streak)
	const tally = 1 + streakPoints
	incrementRunningScore(tally)
	pointsScoredForLastGuess.set(tally)
	incrementRemainingAttempts(GUESS_BENEFIT)
	incrementStreak(1)
	discoveredCodeWord.set(get(codeWord))
	saveGameData()
	setTimeout(async () => {
		discoveredCodeWord.set('')
		setNewRandomCodeWord(dev)
		saveGameData()
	}, 1200)
}

export const saveGameData = (): void => {
	saveToLocalStorage(GAME_DATA_STORAGE_KEY, {
		codeWord: window.btoa(get(codeWord)),
		currentGuesses: get(currentGuesses),
		previousGuesses: get(previousGuesses),
		remainingAttempts: get(remainingAttempts),
		runningScore: get(runningScore),
		gameIsOver: get(gameIsOver),
		maxRemainingAttempts: get(maxRemainingAttempts),
		usedAttempts: get(usedAttempts),
		streak: get(streak),
		bonusPointsScored: get(bonusPointsScored),
		shufflesUsed: get(shufflesUsed),
		skipsUsed: get(skipsUsed),
	})
	const longestStreak = loadFromLocalStorage(LONGEST_STREAK_STORAGE_KEY) || 0
	if (get(pointsScoredForLastGuess) > longestStreak) {
		saveToLocalStorage(LONGEST_STREAK_STORAGE_KEY, get(pointsScoredForLastGuess))
	}
}

export const setToast = async (msg: ToastMessage = { message: '', type: 'warning' }): Promise<void> => {
	const { message, type } = msg
	toast.set({ message: '', type })
	await tick()
	toast.set({ message, type })
}

export const shuffleGuesses = (): void => {
	let newGuesses: string[] = []

	while (newGuesses.length < 5) {
		const wordToAdd = getRandomCodeWord()
		if (wordToAdd !== get(codeWord) && !newGuesses.includes(wordToAdd)) {
			newGuesses = [...newGuesses, wordToAdd]
		}
	}

	previousGuesses.set(get(currentGuesses))
	currentGuesses.set(newGuesses)
	remainingAttempts.set(get(remainingAttempts) - SHUFFLE_COST)
	shufflesUsed.set(get(shufflesUsed) + 1)
	warnIfFinalGuess()
	saveGameData()
}

export const skipCodeWord = (): void => {
	setToast({
		message: `Skipped: ${get(codeWord).toUpperCase()}`,
		type: 'success',
	})
	setNewRandomCodeWord()
	remainingAttempts.set(get(remainingAttempts) - SKIP_COST)
	skipsUsed.set(get(skipsUsed) + 1)

	let timeout = 0
	if (get(remainingAttempts) && get(remainingAttempts) <= GUESS_COST) {
		timeout = 3500
	}
	setTimeout(() => {
		warnIfFinalGuess()
	}, timeout)
	saveGameData()
}

export const toggleMenuOpen = (): void => {
	isMenuOpen.set(!get(isMenuOpen))
}

export const toggleDarkMode = (): void => {
	isDarkMode.set(!get(isDarkMode))
	if (get(isDarkMode)) {
		document.documentElement.classList.add('dark')
	} else {
		document.documentElement.classList.remove('dark')
	}
	saveToLocalStorage('theme', get(isDarkMode) ? 'dark' : 'light')
}

export const setDefaultGameState = (isDev: boolean): void => {
	setNewRandomCodeWord(isDev)
	currentGuess.set('')
	currentGuesses.set(['',' ','	','	 ','		'])
	previousGuesses.set(['','','','','',])
	remainingAttempts.set(STARTING_GUESSES)
	discoveredCodeWord.set('')
	runningScore.set(0)
	usedAttempts.set(0)
	gameIsOver.set(false)
	maxRemainingAttempts.set(STARTING_GUESSES)
	streak.set(0)
	pointsScoredForLastGuess.set(0)
	bonusPointsScored.set(0)
	shufflesUsed.set(0)
	skipsUsed.set(0)
}
