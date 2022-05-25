<script lang="ts">
  import { quintOut } from 'svelte/easing'
  import { fly } from 'svelte/transition'
  import { flip } from 'svelte/animate'
  import { onMount } from 'svelte'

  import { chooseRandomCodeWord } from '$lib/js/helpers'
  import { codeWord, previousGuesses, currentGuess, gameIsOver } from '$lib/js/state'
  
  import GuessContent from '$lib/components/game/GuessContent.svelte'
  import FlashModal from '$lib/components/game/FlashModal.svelte'
  import Keyboard from '$lib/components/game/Keyboard.svelte'
  import PowerBar from '$lib/components/game/PowerBar.svelte'
  import GameOverModal from '$lib/components/game/GameOverModal.svelte'


  const defaultTransition = { duration: 500, easing: quintOut, y: -80 }

  onMount(() => {
    chooseRandomCodeWord()
  })
</script>


<main>
  <input type="text" bind:value={$codeWord} />
  <div class="container">

    <!-- TODO: should this be moved? It's just for fireworks -->
    <FlashModal />

    <PowerBar />

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

    {#if $gameIsOver}
      <GameOverModal />
    {:else}
      <Keyboard />
    {/if}
  </div>
</main>


<style lang="scss" global>
*, *::before, *::after {
  box-sizing: border-box;
  font-family: sans-serif;
}

body {
  margin: 0;
}

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

.power-bar {
  width: 100%;
  border: 1px solid;
  border-radius: 2rem;
  height: 1.5rem;
  display: flex;
  align-content: stretch;
  overflow: hidden;
  position: relative;

  .power-bar__fill {
    transform-origin: left;
    background: orange;
    width: 100%;
    transition: transform .3s cubic-bezier(0.23, 1, 0.320, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    height: inherit;
  }
  .power-bar__score {
    position: absolute;
    height: 100%;
    width: 100%;
    text-align: center;
    left: 0;
    top: 0;
    line-height: 1.5rem;
  }
}

.guess-container {
  display: grid;
  gap: 0.5rem 0;
  list-style-type: none;
  padding: 0;
  grid-template-rows: repeat(6, auto);

  .guess {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: .5rem;
    height: 1.6em;

    @media (min-width: 32rem) {
      height: 5.6em;
    }
  }
}
</style>