<script lang="ts" context="module">
  import { chooseRandomCodeWord, load } from '$lib/js/helpers'

  chooseRandomCodeWord()
</script>

<script lang="ts">
  import { quintOut } from 'svelte/easing'
  import { fly } from 'svelte/transition'
  import { flip } from 'svelte/animate'
  import { onMount } from 'svelte'

  import { previousGuesses, currentGuess, gameIsOver, remainingAttempts, codeWord, runningScore, maxRemainingAttempts } from '$lib/js/state'
  import { GAME_DATA_STORAGE_KEY } from '$lib/js/constants';

  import GuessContent from '$lib/components/game/GuessContent.svelte'
  import Confetti from '$lib/components/game/Confetti.svelte'
  import Keyboard from '$lib/components/game/Keyboard.svelte'
  import InfoBar from '$lib/components/game/InfoBar.svelte'
  import GameOverModal from '$lib/components/game/GameOverModal.svelte'
  import Loader from '$lib/components/game/Loader.svelte'

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
        
        previousGuesses.set(previousGuessesToSet)
        codeWord.set(gameData.codeWord)
        remainingAttempts.set(gameData.remainingAttempts)
        runningScore.set(gameData.runningScore)
        gameIsOver.set(gameData.gameIsOver)
        maxRemainingAttempts.set(gameData.maxRemainingAttempts)
      }
    } 
    catch(e) {
      alert(`Sorry, something went wrong loading your previous game data. Please try again, or clear your browser's local storage.`)
    } 
    finally {
      isLoading = false
    }
  })
</script>


<main>
  <!-- <input type="text" bind:value={$codeWord} /> -->
  <div class="container">
    
    <InfoBar />

    <!-- TODO: should this be moved? It's just for fireworks -->
    <Confetti />

    {#if isLoading}
      <Loader />
    {:else}
      <ul class="guess-container" style="padding: 0; margin: 0;">
        {#each $previousGuesses as guess, row (guess)}
          <li 
            class="guess"
            out:fly|local="{defaultTransition}"
            in:fly|local="{{  ...defaultTransition, y: 80 }}"
            animate:flip|local={{ duration: 400 }}
          >
            <GuessContent {guess} {row} />
          </li>
        {/each}
        <li 
        class="guess"
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

    {#if $gameIsOver}
      <GameOverModal />
    {:else}
      <Keyboard />
    {/if}
  </div>
</main>


<style lang="scss" global>
.container {
  width: 100%;
  max-width: 32rem;
  margin: 0 auto;
  padding: 1rem 1rem 3px;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-content: space-between;
  align-items: space-between;
  justify-content: space-between;
  font-size: 10vw;

  @media (min-width: 32rem) {
    font-size: 1rem;
  }
}

.guess-container {
  display: grid;
  gap: 0.25rem 0;
  list-style-type: none;
  padding: 0;
  grid-template-rows: repeat(6, auto);

  .guess {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0.25rem;
    height: 1.7em;

    @media (min-width: 32rem) {
      min-height: 5.8rem;
    }
  }
}
</style>