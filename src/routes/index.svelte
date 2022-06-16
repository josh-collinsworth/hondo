<script lang="ts" context="module">
  import { load } from '$lib/js/helpers'
  import { setNewRandomCodeWord, startNewGame } from '$lib/js/mutations'
  import { dev } from '$app/env'

  setNewRandomCodeWord(dev)
</script>

<script lang="ts">
  import { previousGuesses, currentGuess, gameIsOver, remainingAttempts, codeWord, runningScore, maxRemainingAttempts, usedAttempts, shownModal, bonusWindow, streak, isLoading } from '$lib/js/state'
  import { GAME_DATA_STORAGE_KEY, STARTING_GUESSES } from '$lib/js/constants';
  import { stringContainsLetter } from '$lib/js/helpers'
  
  import { quintOut } from 'svelte/easing'
  import { fly } from 'svelte/transition'
  import { flip } from 'svelte/animate'
  import { onMount } from 'svelte'
  
  import GuessContent from '$lib/components/game/GuessContent.svelte'
  import Keyboard from '$lib/components/game/Keyboard.svelte'
  import InfoBar from '$lib/components/game/InfoBar.svelte'
  import Loader from '$lib/components/game/Loader.svelte'
  import AccessibleStatus from '$lib/components/game/AccessibleStatus.svelte'

  const defaultTransition = { duration: 600, easing: quintOut, y: -80 }

  onMount(() => {
    try {
      const gameData = load(GAME_DATA_STORAGE_KEY)
        
      if (gameData) {
        let previousGuessesToSet = gameData.previousGuesses

        // Avoids a loading error with states that didn't save this. Can be removed later.
        let attemptsCap = gameData.maxRemainingAttempts ? gameData.maxRemainingAttempts : STARTING_GUESSES
        let loadedBonus = gameData.bonusWindow || 0
        let loadedStreak = gameData.streak || 0
        
        maxRemainingAttempts.set(attemptsCap)
        previousGuesses.set(previousGuessesToSet)

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
        {#each $previousGuesses as guess, row (guess)}
          <li
            class="guess"
            out:fly|local="{{ ...defaultTransition }}"
            in:fly|local="{{  ...defaultTransition, y: 80 }}"
            animate:flip|local={{ duration: 400 }}
            aria-label={guess}
            aria-hidden={!stringContainsLetter(guess)}
          >
            <GuessContent {guess} {row} />
          </li>
        {/each}
        <li 
          class="guess current-guess"
          out:fly|local="{{ ...defaultTransition }}"
          in:fly|local="{{ ...defaultTransition, y: 80 }}"
        >
          {#each {length: 5} as _, col}
            <div class="current-guess-box">
              {$currentGuess[col]
                ? $currentGuess[col]
                : ''}
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
