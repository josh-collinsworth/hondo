import EducatedGuesses from '$lib/components/icon/powerups/EducatedGuesses.svelte'
import SweeterSuccess from '$lib/components/icon/powerups/SweeterSuccess.svelte'
import SafeStreak from '$lib/components/icon/powerups/SafeStreak.svelte'
import XIcon from '$lib/components/icon/XIcon.svelte'
import { GUESS_COST, GUESS_BENEFIT, SCORE_PER_CODE_WORD } from '$lib/js/constants'
import type { SvelteComponent } from 'svelte'
import { derived, readable, writable, get } from 'svelte/store'
import 'svelte'

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
  slug: string,
  title: string,
  description: string,
  effects: StaticPowerupEffects,
  unlock: PowerupUnlock,
  icon: SvelteComponent
}

export const selectedStaticPowerupKey = writable<StaticPowerupType>('none')

const defaultEffects: StaticPowerupEffects = {
  guessCost: 0,
  guessBenefit: 0,
  score: 0,
  streak: true,
}

export const staticPowerups = readable<StaticPowerup[]>([
  {
    slug: 'educatedGuesses',
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
    icon: EducatedGuesses,
  },
  {
    slug: 'sweeterSuccess',
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
    icon: SweeterSuccess,
  },
  {
    slug: 'safeStreak',
    title: 'Safe Streak',
    description: 'Correct guesses are worth an extra point, but you do not get bonus points for streaks.',
    effects: {
      ...defaultEffects,
      score: 1,
      streak: false,
    },
    unlock: {
      getter: 'totalGamesPlayed',
      threshold: 10,
    },
    icon: SafeStreak,
  },
  {
    slug: 'none',
    title: 'None',
    description: 'Play with no static powerup.',
    effects: defaultEffects,
    unlock: {
      getter: 'totalGamesPlayed',
      threshold: 0,
    },
    icon: XIcon,
  },
])

export const getCurrentStaticPowerup = (key: string): StaticPowerup|undefined => get(staticPowerups).find(powerup => powerup.slug === key)

export const adjustedGuessCost = derived(
  selectedStaticPowerupKey,
  $selectedStaticPowerupKey => {
    return GUESS_COST + getCurrentStaticPowerup($selectedStaticPowerupKey).effects.guessCost
  }
)

export const adjustedGuessBenefit = derived(
  selectedStaticPowerupKey,
  $selectedStaticPowerupKey => {
    return GUESS_BENEFIT + getCurrentStaticPowerup($selectedStaticPowerupKey).effects.guessBenefit
  }
)

export const adjustedScorePerCodeWord = derived(
  selectedStaticPowerupKey,
  $selectedStaticPowerupKey => {
    return SCORE_PER_CODE_WORD + getCurrentStaticPowerup($selectedStaticPowerupKey).effects.score
  }
)

export const isStreakAllowed = derived(
  selectedStaticPowerupKey,
  $selectedStaticPowerupKey => getCurrentStaticPowerup($selectedStaticPowerupKey).effects.streak
)