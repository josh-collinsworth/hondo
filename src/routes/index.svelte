<script lang="ts" context="module">
  import { load } from '$lib/js/helpers'
  import { chooseRandomCodeWord } from '$lib/js/mutations'
  import { dev } from '$app/env'

  chooseRandomCodeWord(dev)
</script>

<script lang="ts">
  import { quintOut } from 'svelte/easing'
  import { fly } from 'svelte/transition'
  import { flip } from 'svelte/animate'
  import { onMount } from 'svelte'

  import { previousGuesses, currentGuess, gameIsOver, remainingAttempts, codeWord, runningScore, maxRemainingAttempts, usedAttempts, remainingLifelineCooldowns } from '$lib/js/state'
  import { GAME_DATA_STORAGE_KEY, STARTING_GUESSES } from '$lib/js/constants';

  import GuessContent from '$lib/components/game/GuessContent.svelte'
  import Confetti from '$lib/components/game/Confetti.svelte'
  import Keyboard from '$lib/components/game/Keyboard.svelte'
  import InfoBar from '$lib/components/game/InfoBar.svelte'
  import GameOverModal from '$lib/components/game/GameOverModal.svelte'
  import Loader from '$lib/components/game/Loader.svelte'
  import Toast from '$lib/components/game/Toast.svelte'
  import AccessibleStatus from '$lib/components/game/AccessibleStatus.svelte'

  let isLoading = true
  const defaultTransition = { duration: 600, easing: quintOut, y: -80 }

  onMount(() => {
    try {
      const gameData = load(GAME_DATA_STORAGE_KEY)
        
      if (gameData) {
        //Prevents weird bugs where more than five guesses come back ¯\_(ツ)_/¯
        let previousGuessesToSet = gameData.previousGuesses
        if (previousGuessesToSet.length > 5) {
          previousGuessesToSet = previousGuessesToSet.slice(1, 6)
        }

        // Avoids a loading error with states that didn't save this. Can be removed later.
        let attemptsCap = gameData.maxRemainingAttempts ? gameData.maxRemainingAttempts : STARTING_GUESSES
        let remainingCooldown = gameData.remainingLifelineCooldowns ? gameData.remainingLifelineCooldowns : []
        
        maxRemainingAttempts.set(attemptsCap)
        previousGuesses.set(previousGuessesToSet)
        remainingLifelineCooldowns.set(remainingCooldown)

        codeWord.set(window.atob(gameData.codeWord))
        remainingAttempts.set(gameData.remainingAttempts)
        runningScore.set(gameData.runningScore)
        gameIsOver.set(gameData.gameIsOver)
        usedAttempts.set(gameData.usedAttempts)
      }
    } 
    catch(e) {
      alert(`Sorry, something went wrong loading your previous game data. Please try again, or clear your browser's local storage. If possible, finishing your current game may also resolve the issue.`)
    } 
    finally {
      isLoading = false
    }
  })
</script>


<main>
  <!-- For debugging -->
  <!-- <input type="text" bind:value={$codeWord} /> -->
  <div class="game-container">
    
    <InfoBar />
    
    <!-- TODO: should this be moved? It's just for fireworks -->
    <Confetti />

    {#if isLoading}
      <Loader />
    {:else}
      <ul class="guess-container">
        {#each $previousGuesses as guess, row (guess)}
          <li
            class="guess"
            out:fly|local="{defaultTransition}"
            in:fly|local="{{  ...defaultTransition, y: 80 }}"
            animate:flip|local={{ duration: 400 }}
            aria-label={guess}
          >
            <GuessContent {guess} {row} />
          </li>
        {/each}
        <li 
          class="guess current-guess"
          out:fly|local="{defaultTransition}"
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
      <Toast />
      {#if $gameIsOver}
        <GameOverModal />
      {:else}
        <Keyboard />
      {/if}
    </div>
  </div>
</main>
