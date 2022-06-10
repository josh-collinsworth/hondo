import {
  codeWord,
  previousGuesses,
  currentGuess,
  gameIsOver,
  runningScore,
  remainingAttempts,
  usedAttempts,
  maxRemainingAttempts,
  discoveredCodeWord,
  remainingLifelineCooldowns,
  message,
  isLoadingNewWord
} from './state'
import { PREVIOUS_HIGH_SCORES_STORAGE_KEY, GAME_DATA_STORAGE_KEY } from './constants'
import { isValidGuess, load, save } from './helpers'
import { codeWords } from './codeWords'

import { dev } from '$app/env'
import { tick } from 'svelte'
import { get } from 'svelte/store'

export const chooseRandomCodeWord = (log = false): void => {
  const newWord = codeWords[Math.floor(Math.random() * codeWords.length)]
  if (newWord !== get(codeWord) && !get(previousGuesses).includes(newWord)) {
    codeWord.set(newWord)
    if (log) {
      // eslint-disable-next-line no-console
      console.log(newWord)
    }
    return
  }
  chooseRandomCodeWord(log)
}

export const handleNewGuess = (): void => {
  if (isValidGuess(get(currentGuess))) {
    if (!get(previousGuesses).includes(get(currentGuess))) {
      previousGuesses.set([...get(previousGuesses), get(currentGuess)])

      setNewScores()
      if (!get(gameIsOver)) {
        saveGameData()
      }
    } else {
      setToastMessage('Already guessed that word')
    }
    //Prevents some buggy stuff from happening when loading the game
    if (get(previousGuesses).length > 5) {
      previousGuesses.set([...get(previousGuesses)].slice(1, get(previousGuesses).length))
    }
  } else if (get(currentGuess).length === 5) {
    setToastMessage('Sorry, not in word list')
  }
}

export const setNewScores = (): void => {
  // Update the lifelines and see if we need to restore max attempts
  if (get(remainingLifelineCooldowns).length) {
    const previousCooldowns = get(remainingLifelineCooldowns)
    previousCooldowns[0] -= 1

    if (previousCooldowns[0] === 0) {
      previousCooldowns.shift()     
      maxRemainingAttempts.set(get(maxRemainingAttempts) + 1)
    }
    remainingLifelineCooldowns.set(previousCooldowns)
  }

  // We do the above before this so score can be added if a new max attempt was just unlocked
  if (get(currentGuess) === get(codeWord)) {
    runningScore.set(get(runningScore) + 1)
    remainingAttempts.set(Math.min(get(maxRemainingAttempts), get(remainingAttempts) + 1))
    handleCorrectGuess()
  } else {
    remainingAttempts.set(Math.min(get(remainingAttempts) - 1, get(maxRemainingAttempts)))
  }
  // Update the count of total used guesses
  usedAttempts.set(get(usedAttempts) + 1)

  // Clear the current guess
  currentGuess.set('')

  // Check for game over state
  if (get(remainingAttempts) <= 0 || get(runningScore) >= 100) {
    gameIsOver.set(true)
    registerHighScore()
    localStorage.removeItem(GAME_DATA_STORAGE_KEY)
  }
}

export const registerHighScore = (): void => {
  let previousHighScores = load(PREVIOUS_HIGH_SCORES_STORAGE_KEY) || []

  // Just some cleanup from prerelease data saving. Can be removed later.
  previousHighScores = previousHighScores.filter(item => typeof item !== 'number')

  save(
    PREVIOUS_HIGH_SCORES_STORAGE_KEY, 
    [...previousHighScores, [get(runningScore), get(usedAttempts)]]
  )
}

export const handleCorrectGuess = (): void => {
  discoveredCodeWord.set(get(codeWord))
  setTimeout(async () => {
    isLoadingNewWord.set(true)
    chooseRandomCodeWord(dev)
    await tick()
    isLoadingNewWord.set(false)
    saveGameData()
  }, 1000)
}

export const saveGameData = (): void => {
  // This prevents saving more guesses than it should, since there's a slight delay between entry of the word and updating of the game board
  const guessesToSave = get(previousGuesses)
  if (guessesToSave.length > 5) guessesToSave.slice(1, 6)

  save(GAME_DATA_STORAGE_KEY, {
    codeWord: window.btoa(get(codeWord)),
    previousGuesses: guessesToSave,
    remainingAttempts: get(remainingAttempts),
    runningScore: get(runningScore),
    gameIsOver: get(gameIsOver),
    maxRemainingAttempts: get(maxRemainingAttempts),
    usedAttempts: get(usedAttempts),
    remainingLifelineCooldowns: get(remainingLifelineCooldowns),
  })
}

export const setToastMessage = async (msg: string): Promise<void> => {
  message.set('')
  await tick()
  message.set(msg)
}
