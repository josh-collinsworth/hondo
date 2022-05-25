<script lang="ts" context="module">
  import { chooseRandomCodeWord } from '$lib/js/helpers'

  chooseRandomCodeWord()
</script>

<script lang="ts">
  import { quintOut } from 'svelte/easing'
  import { fly } from 'svelte/transition'
  import { flip } from 'svelte/animate'

  import { previousGuesses, currentGuess, gameIsOver } from '$lib/js/state'
  
  import GuessContent from '$lib/components/game/GuessContent.svelte'
  import FlashModal from '$lib/components/game/FlashModal.svelte'
  import Keyboard from '$lib/components/game/Keyboard.svelte'
  import PowerBar from '$lib/components/game/PowerBar.svelte'
  import GameOverModal from '$lib/components/game/GameOverModal.svelte'

  const defaultTransition = { duration: 600, easing: quintOut, y: -80 }
</script>


<main>
  <!-- <input type="text" bind:value={$codeWord} /> -->
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