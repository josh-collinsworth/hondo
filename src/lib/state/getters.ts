import { GAME_HISTORY_STORAGE_KEY } from '$lib/js/constants'
import { loadFromLocalStorage } from '$lib/js/helpers'
import { gameHistory } from './game'
import { derived } from 'svelte/store'

import type { PlayedGame } from '$lib/js/types'

export const retrieveGameHistory = (): PlayedGame[] => {
  return loadFromLocalStorage(GAME_HISTORY_STORAGE_KEY)
}

export const totalGamesPlayed = derived(
  gameHistory,
  $gameHistory => $gameHistory.length
)

export const totalPointsScored = derived(
  gameHistory,
  $gameHistory => $gameHistory.reduce((total, current) => total + current[0], 0)
)

export const totalGuessesUsed = derived(
  gameHistory,
  $gameHistory => $gameHistory.reduce((total, current) => total + current[1], 0)
)

export const highScore = derived(
  gameHistory,
  $gameHistory => Math.max(...$gameHistory.map(game => game[0]))
)

export const hondos = derived(
  gameHistory,
  $gameHistory => $gameHistory.filter(game => game[0] === 100)
)

export const totalHondos = derived(
  hondos,
  $hondos => $hondos.length
)

export const fastestHondo = derived(
  hondos,
  $hondos => Math.min(...$hondos.map((score: number[]) => score[1]))
)