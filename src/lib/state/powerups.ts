import { GUESS_COST, GUESS_BENEFIT, SCORE_PER_CODE_WORD, SHUFFLE_COST } from '$lib/js/constants'
import type { SvelteComponent } from 'svelte'
import { derived, readable, writable, get } from 'svelte/store'
import 'svelte'

export type PowerupEffects = {
  guessCost?: number
  guessBenefit?: number
  score?: number
  streak?: boolean
  shuffleCost?: number
}

export type PowerupUnlock = {
  getter: string
  threshold: number
  description?: string
}

export type Powerup = {
  slug: string
  title: string
  description: string
  effects: PowerupEffects
  unlock: PowerupUnlock
  icon?: SvelteComponent
  emoji: string
}

export const selectedPowerupKey = writable<string>('none')

const defaultEffects: PowerupEffects = {
  guessCost: GUESS_COST,
  guessBenefit: GUESS_BENEFIT,
  score: 0,
  streak: true,
  shuffleCost: SHUFFLE_COST,
}

export const powerups = readable<Powerup[]>([
  {
    slug: 'none',
    title: 'None',
    description: 'Play with no charm',
    effects: defaultEffects,
    unlock: {
      getter: 'totalGamesPlayed',
      threshold: 0,
    },
    emoji: '❌',
  },
  {
    slug: 'educatedGuesses',
    title: 'Educated Guesses',
    description: 'Guesses cost 10% less energy',
    effects: {
      ...defaultEffects,
      guessCost: GUESS_COST * 0.9,
    },
    unlock: {
      getter: 'totalGamesPlayed',
      threshold: 1,
      description: 'Play your first game of Hondo',
    },
    emoji: '🔎'
  },
  {
    slug: 'sweeterSuccess',
    title: 'Sweeter success',
    description: 'Correct guesses restore 20% more energy',
    effects: {
      ...defaultEffects,
      guessBenefit: GUESS_BENEFIT * 1.2
    },
    unlock: {
      getter: 'totalGamesPlayed',
      threshold: 1,
      description: 'Play your first game of Hondo',
    },
    emoji: '🧁'
  },
  {
    slug: 'chaos',
    title: 'Chaos',
    description: 'Shuffles cost 20% less',
    effects: {
      ...defaultEffects,
      shuffleCost: SHUFFLE_COST * 0.8
    },
    unlock: {
      getter: 'totalPointsScored',
      threshold: 100,
      description: `Score 100 total points`,
    },
    emoji: '🎲'
  },
  {
    slug: 'safeStreak',
    title: 'Safe Streak',
    description: `Correct guesses are worth 2 points, but you don't get bonus points for streaks.`,
    effects: {
      ...defaultEffects,
      score: 1,
      streak: false,
    },
    unlock: {
      getter: 'totalGamesPlayed',
      threshold: 10,
      description: 'Play 10 total games to unlock',
    },
    emoji: '🧷'
  },
])

export const getCurrentPowerup = (key: string): Powerup => {
  return get(powerups).find(powerup => powerup.slug === key) || get(powerups)[0]
}

export const adjustedGuessCost = derived(
  selectedPowerupKey,
  $selectedPowerupKey => {
    return getCurrentPowerup($selectedPowerupKey).effects.guessCost
  }
)

export const adjustedGuessBenefit = derived(
  selectedPowerupKey,
  $selectedPowerupKey => {
    return getCurrentPowerup($selectedPowerupKey).effects.guessBenefit
  }
)

export const adjustedScorePerCodeWord = derived(
  selectedPowerupKey,
  $selectedPowerupKey => {
    return SCORE_PER_CODE_WORD + getCurrentPowerup($selectedPowerupKey).effects.score
  }
)

export const isStreakAllowed = derived(
  selectedPowerupKey,
  $selectedPowerupKey => getCurrentPowerup($selectedPowerupKey).effects.streak
)

export const adjustedShuffleCost = derived(
  selectedPowerupKey,
  $selectedPowerupKey => getCurrentPowerup($selectedPowerupKey).effects.shuffleCost
)
