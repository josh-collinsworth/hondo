<script context="module" lang="ts">
export const load = ({ url }): LoadOutput => {
  const skipTutorial = url.searchParams.get('skip_tutorial') !== null
  return {
    status: 200,
    props: {
      skipTutorial
    }
  }
}
</script>

<script lang="ts">
import {
  currentGuesses,
  currentGuess,
  gameIsOver,
  remainingAttempts,
  codeWord,
  runningScore,
  maxRemainingAttempts,
  usedAttempts,
  streak,
  previousGuesses,
  bonusPointsScored,
  shufflesUsed,
  skipsUsed,
} from '$lib/state/game'
import { shownModal, isLoading, hasViewedTutorial } from '$lib/state/global'
import { GAME_DATA_STORAGE_KEY, STARTING_GUESSES, POWERUPS_STORAGE_KEY } from '$lib/js/constants';
import { loadFromLocalStorage, saveToLocalStorage, stringContainsLetter } from '$lib/js/helpers'
import { setDefaultGameState } from '$lib/state/mutations'

import GuessContent from '$lib/components/game/GuessContent.svelte'
import Keyboard from '$lib/components/game/Keyboard.svelte'
import InfoBar from '$lib/components/game/InfoBar.svelte'
import Loader from '$lib/components/game/Loader.svelte'
import AccessibleStatus from '$lib/components/game/AccessibleStatus.svelte'
import TutorialIntro from '$lib/components/modals/TutorialIntro.svelte'
import PWAPrompt from '$lib/components/PWAPrompt.svelte'

import { dev } from '$app/env'
import { onMount } from 'svelte'
import { is_client } from 'svelte/internal'
import { selectedPowerupKey } from '$lib/state/powerups'
import type { LoadOutput } from '@sveltejs/kit'

export let skipTutorial: boolean

const speakLetters = (enteredGuess: string): string => {
  let remainingLetters = $codeWord
  let exactLetters = 0
  let partialLetters = 0

  enteredGuess.split('').forEach((letter, i) => {
    if (letter === $codeWord[i]) {
      remainingLetters = remainingLetters.replace(letter, '')
      exactLetters++
    }
  })
  enteredGuess.split('').forEach((letter) => {
    if (remainingLetters.includes(letter)) {
      remainingLetters = remainingLetters.replace(letter, '')
      partialLetters++
    }
  })
  return `: ${exactLetters} in position, ${partialLetters} out of position`
}

onMount(() => {
  try {
    const gameData = loadFromLocalStorage(GAME_DATA_STORAGE_KEY)
    const powerups = loadFromLocalStorage(POWERUPS_STORAGE_KEY)

    if (powerups && powerups.static) {
      $selectedPowerupKey = powerups.static
    }
      
    if (gameData) {
      // Avoids a loading error with states that didn't save this. Can be removed later.
      if (!gameData.currentGuesses || !gameData.previousGuesses) {
        alert(`Sorry, your in-progress game data is outdated and will need to be cleared. Proceeding now.`)
        saveToLocalStorage(GAME_DATA_STORAGE_KEY, null)
        return
      }
      let attemptsCap = gameData.maxRemainingAttempts ? gameData.maxRemainingAttempts : STARTING_GUESSES
      let loadedStreak = gameData.streak || 0
      
      $codeWord = window.atob(gameData.codeWord)
      $maxRemainingAttempts = attemptsCap
      $currentGuesses = gameData.currentGuesses
      $previousGuesses = gameData.previousGuesses
      $remainingAttempts = gameData.remainingAttempts
      $runningScore = gameData.runningScore
      $gameIsOver = gameData.gameIsOver
      $usedAttempts = gameData.usedAttempts
      $streak = loadedStreak
      $bonusPointsScored = gameData.bonusPointsScored || 0
      $shufflesUsed = gameData.shufflesUsed || 0
      $skipsUsed = gameData.skipsUsed || 0
    } else {
      setDefaultGameState(is_client && dev)
    }
  } 
  catch(e) {
    alert(`Sorry, something went wrong loading your previous game data. Please refresh. If that doesn't help, you can reset your data from the stats page.`)
  } 
  finally {
    $isLoading = false

    const hasPlayed = loadFromLocalStorage('skipTutorial')
    if (!hasPlayed && !$hasViewedTutorial && !skipTutorial) {
      $shownModal = TutorialIntro
    }
  }
})
</script>


<div class="game-container">
  <PWAPrompt />
  <InfoBar />
  {#if $isLoading}
    <Loader />
  {:else}
    <ul id="game-board" class="guess-container" tabindex="-1">
      {#each $currentGuesses as guess, row (guess)}
        <li
          class="guess"
          aria-label={guess + speakLetters(guess)}
          aria-hidden={!stringContainsLetter(guess)}
        >
          <GuessContent guess={guess} previousGuess={$previousGuesses[row]}/>
        </li>
      {/each}
      <li 
        class="guess current-guess"
      >
        {#each {length: 5} as _, col (col)}
          <div class="current-guess-box">
            {#key $previousGuesses}
              {#if $currentGuess[col]}
                <div class="current-guess-letter">
                  {$currentGuess[col]}
                </div>
              {/if}
              <div class="previous-guess-letter" aria-hidden="true">
                {#if $currentGuesses[$currentGuesses.length - 1] && $currentGuesses[$currentGuesses.length - 1][col]}
                  {$currentGuesses[$currentGuesses.length - 1][col]}
                {/if}
              </div>
            {/key}
          </div>
        {/each}
      </li>
    </ul>
  {/if}

  <AccessibleStatus />

  <div class="bottom-container">
    <Keyboard />
  </div>
</div>
