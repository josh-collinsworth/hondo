import { GUESS_COST, GUESS_BENEFIT, STATIC_POWERUP_EFFECTS } from '$lib/js/constants'
import { derived, writable } from 'svelte/store'

export type StaticPowerup = 'educatedGuesses'|'sweeterSuccess'|'wordserk'|'none'

export const staticPowerup = writable<StaticPowerup>('none')

export const adjustedGuessCost = derived(
  staticPowerup,
  $staticPowerup => {
    return GUESS_COST + STATIC_POWERUP_EFFECTS[$staticPowerup].effects.guessCost
  }
)

export const adjustedGuessBenefit = derived(
  staticPowerup,
  $staticPowerup => {
    return GUESS_BENEFIT + STATIC_POWERUP_EFFECTS[$staticPowerup].effects.guessBenefit
  }
)