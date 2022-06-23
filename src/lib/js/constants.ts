export const GAME_HISTORY_STORAGE_KEY = 'previousHighScores'
export const GAME_DATA_STORAGE_KEY = 'gameData'
export const LONGEST_STREAK_STORAGE_KEY = 'longestStreak'
export const POWERUPS_STORAGE_KEY = 'powerups'
export const DEFAULT_SHUFFLE_COOLDOWN = 15 // Unused
export const SCORE_TICK_DURATION = 220

export const STARTING_GUESSES = 100
export const SHUFFLE_COST = 30
export const GUESS_COST = 10
export const GUESS_BENEFIT = 10
export const TOTAL_TUTORIAL_PAGES = 4

export const STATIC_POWERUP_EFFECTS = {
  'none': {
    title: 'None',
    description: 'Play with no static powerup.',
    effects: {
      guessCost: 0,
      guessBenefit: 0
    }
  },
  'educatedGuesses': {
    title: 'Educated Guesses',
    description: 'Guesses cost 10% less than normal.',
    effects: {
      guessCost: -1,
      guessBenefit: 0
    }
  },
  'sweeterSuccess': {
    title: 'Sweeter success',
    description: 'Correct guesses refill your meter by 20% more.',
    effects: {
      guessCost: 0,
      guessBenefit: 2
    }
  },
  'wordserk': {
    title: 'Wordserk',
    description: 'New guesses will replace one of the least accurate guesses on the board, instead of the most recent. However, guesses cost 10% more.',
    effects: {
      guessCost: 1,
      guessBenefit: 0
    }
  }
}