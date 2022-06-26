import { GUESS_COST, GUESS_BENEFIT, SCORE_PER_CODE_WORD } from '$lib/js/constants'
import { derived, readable, writable, get } from 'svelte/store'
import * as getters from './getters'

export type StaticPowerupType = 'educatedGuesses'|'sweeterSuccess'|'safeStreak'|'none'

export type StaticPowerupEffects = {
  guessCost?: number
  guessBenefit?: number
  score?: number
  streak?: boolean
}

export type PowerupUnlock = {
  getter: string
  threshold: number
}

export type StaticPowerup = {
  title: string,
  description: string,
  effects: StaticPowerupEffects,
  unlock: PowerupUnlock,
}

export const selectedStaticPowerup = writable<StaticPowerupType>('none')

const defaultEffects: StaticPowerupEffects = {
  guessCost: 0,
  guessBenefit: 0,
  score: 0,
  streak: true,
}

export const staticPowerups = readable({
  'none': <StaticPowerup>{
    title: 'None',
    description: 'Play with no static powerup.',
    effects: defaultEffects,
    unlock: {
      getter: 'totalGamesPlayed',
      threshold: 0,
    },
  },
  'educatedGuesses': <StaticPowerup>{
    title: 'Educated Guesses',
    description: 'Guesses cost 10% less than normal.',
    effects: {
      ...defaultEffects,
      guessCost: -1,
    },
    unlock: {
      getter: 'totalGamesPlayed',
      threshold: 1,
    },
  },
  'sweeterSuccess': <StaticPowerup>{
    title: 'Sweeter success',
    description: 'Correct guesses refill your meter by 20% more.',
    effects: {
      ...defaultEffects,
      guessBenefit: 2
    },
    unlock: {
      getter: 'totalGamesPlayed',
      threshold: 1,
    },
  },
  'safeStreak': <StaticPowerup>{
    title: 'Safe Streak',
    description: 'Correct guesses are worth an extra point, but you do not get bonus points for streaks.',
    effects: {
      ...defaultEffects,
      score: 1,
      streak: false,
    },
    unlock: {
      getter: 'totalGamesPlayed',
      threshold: 1,
    },
  }
})

export const adjustedGuessCost = derived(
  selectedStaticPowerup,
  $selectedStaticPowerup => {
    return GUESS_COST + get(staticPowerups)[$selectedStaticPowerup].effects.guessCost
  }
)

export const adjustedGuessBenefit = derived(
  selectedStaticPowerup,
  $selectedStaticPowerup => {
    return GUESS_BENEFIT + get(staticPowerups)[$selectedStaticPowerup].effects.guessBenefit
  }
)

export const adjustedScorePerCodeWord = derived(
  selectedStaticPowerup,
  $selectedStaticPowerup => {
    return SCORE_PER_CODE_WORD + get(staticPowerups)[$selectedStaticPowerup].effects.score
  }
)

export const isStreakAllowed = derived(
  selectedStaticPowerup,
  $selectedStaticPowerup => get(staticPowerups)[$selectedStaticPowerup].effects.streak
)