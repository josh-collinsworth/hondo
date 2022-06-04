<script lang="ts">
import { runningScore } from '$lib/js/state'
import { fly } from 'svelte/transition'

import DirectionsModal from './DirectionsModal.svelte'
import PowerBar from './PowerBar.svelte'

let isShowingDirections = false
const toggleIsShowingDirections = (): void => {
  isShowingDirections = !isShowingDirections
}

$: scoreDigits = String($runningScore).padStart(3).split('')
</script>


<div class="info-bar">
  <div class="info-button score">
    <div class="score-container" >
      {#each scoreDigits as digit, i}
        {#key digit}
          <div
            class="score-digit digit-{i + 1}"
            out:fly={{ y: -40, duration: 360, opacity: 1 }}
            in:fly={{ y: 40, duration: 360, opacity: 1 }}
          >
            {digit}
          </div>
        {/key}
      {/each}
    </div>
  </div>
  <PowerBar />
  <button class="info-button instructions" on:click={toggleIsShowingDirections}>
    ?
  </button>
</div>

<!-- For debugging -->
<!-- <button on:click={() => runningScore.set($runningScore + 1)}>+1</button> -->

{#if isShowingDirections}
  <DirectionsModal close={toggleIsShowingDirections} />
{/if}

<style lang="scss">
  .info-bar {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    justify-items: center;
    gap: 10px;
    margin-bottom: 1rem;
    position: relative;
    z-index: 2;
  }

  .info-button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid var(--darkBlue);
    color: var(--darkBlue);
    border-radius: 2.5rem;
    width: 2.5rem;
    height: 2.5rem;
    line-height: 2;
    font-size: 1.2rem;
    font-weight: bold;
    font-family: 'Ridley Grotesk', sans-serif;
    background: var(--paper);
    position: relative;
    z-index: 4;
    padding-top: 0.05ch;
  }

  .score {
    overflow: hidden;

    .score-container {
      display: grid;
      grid-template-columns: repeat(3, auto);
      justify-content: center;
      position: relative;
      z-index: 2;        
      width: min-content;
      padding: 1ch;
      text-align: center;
    }

    .score-digit {
      display: block;
      flex: 1 1 auto;
      text-align: center;
      grid-row: 1 / 2;
      
      &.digit-1 {
        grid-column: 1 / 2;
      }
      
      &.digit-2 {
        grid-column: 2 / 3;
      }
      
      &.digit-3 {
        min-width: 1ch;
        grid-column: 3 / 4;
      }
    }
  }
</style>