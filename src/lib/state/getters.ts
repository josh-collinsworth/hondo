import { GAME_HISTORY_STORAGE_KEY } from '$lib/js/constants'
import { loadFromLocalStorage } from '$lib/js/helpers'

import type { PlayedGame } from '/js/types'

export const gameHistory = (): PlayedGame[] => {
  return loadFromLocalStorage(GAME_HISTORY_STORAGE_KEY) || []
}

export const totalGamesPlayed = (): number => {
  return gameHistory().length
}

export const totalPointsScored = (): number => {
  return gameHistory().reduce((total, current) => total + current[0], 0)
}

export const highScore = (): number => {
  return Math.max(...gameHistory().map(game => game[0]))
}

export const hondos = (): PlayedGame[] => {
  return gameHistory().filter(game => game[0] === 100)
}
export const totalHondos = (): number => {
  return hondos().length
}