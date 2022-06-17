<script lang="ts" context="module">
  import { load, save } from '$lib/js/helpers'
  import { setNewRandomCodeWord, startNewGame } from '$lib/js/mutations'
  import { dev } from '$app/env'
  import { is_client } from 'svelte/internal'
  import { fly } from 'svelte/transition'

  setNewRandomCodeWord(is_client && dev)
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
    shownModal,
    streak,
    isLoading, 
    previousGuesses,
} from '$lib/js/state'
  import { GAME_DATA_STORAGE_KEY, STARTING_GUESSES } from '$lib/js/constants';
  import { stringContainsLetter } from '$lib/js/helpers'
  
  import { onMount } from 'svelte'
  
  import GuessContent from '$lib/components/game/GuessContent.svelte'
  import Keyboard from '$lib/components/game/Keyboard.svelte'
  import InfoBar from '$lib/components/game/InfoBar.svelte'
  import Loader from '$lib/components/game/Loader.svelte'
  import AccessibleStatus from '$lib/components/game/AccessibleStatus.svelte'
import { backIn, backOut } from 'svelte/easing';

  onMount(() => {
    try {
      const gameData = load(GAME_DATA_STORAGE_KEY)
        
      if (gameData) {
        // Avoids a loading error with states that didn't save this. Can be removed later.
        if (!gameData.currentGuesses) {
          alert(`Sorry, your in-progress game data is outdated and will need to be cleared. Proceeding now.`)
          save(GAME_DATA_STORAGE_KEY, null)
          return
        }
        let attemptsCap = gameData.maxRemainingAttempts ? gameData.maxRemainingAttempts : STARTING_GUESSES
        let loadedStreak = gameData.streak || 0
        let loadedPreviousGuesses = gameData.previousGuesses ? gameData.previousGuesses : []
        let currentGuesses = gameData.currentGuesses ? gameData.currentGuesses : []
        
        maxRemainingAttempts.set(attemptsCap)
        currentGuesses.set(currentGuessesToSet)
        previousGuesses.set(loadedPreviousGuesses)

        codeWord.set(window.atob(gameData.codeWord))
        remainingAttempts.set(gameData.remainingAttempts)
        runningScore.set(gameData.runningScore)
        gameIsOver.set(gameData.gameIsOver)
        usedAttempts.set(gameData.usedAttempts)
        streak.set(loadedStreak)
      }
    } 
    catch(e) {
      alert(`Sorry, something went wrong loading your previous game data. Please try again, or clear your browser's local storage. If possible, finishing your current game may also resolve the issue.`)
    } 
    finally {
      isLoading.set(false)
    }
  })
</script>


<main>
  <!-- For debugging -->
  <!-- <input type="text" bind:value={$codeWord} /> -->
  <div class="game-container">
    <InfoBar />

    {#if $isLoading}
      <Loader />
    {:else}
      <ul class="guess-container">
        {#each $currentGuesses as guess, row (guess)}
          <li
            class="guess"
            aria-label={guess}
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
                <div
                  out:fly={{ duration: 420, y: -80, opacity: 1, easing: backIn, delay: col * 30 }}
                >
                  {$currentGuess[col] || ''}
                </div>
              {/key}
            </div>
          {/each}
        </li>
      </ul>
    {/if}

    <AccessibleStatus />

    <div class="bottom-container">
      {#if !$gameIsOver}
        <Keyboard />
      {:else if !$shownModal}
        <div class="postgame-summary">
          <h2>You scored {$runningScore}</h2>
          <button on:click={startNewGame}>
            Play again
          </button>
        </div>
      {/if}
    </div>
  </div>
</main>
