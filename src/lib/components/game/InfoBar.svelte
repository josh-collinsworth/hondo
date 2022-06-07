<script lang="ts">
import { codeWord, currentGuess, maxRemainingAttempts, runningScore } from '$lib/js/state'
import { fly } from 'svelte/transition'

import { handleNewGuess, load, save } from '$lib/js/helpers'

import DirectionsModal from './DirectionsModal.svelte'
import PowerBar from './PowerBar.svelte'
import Lifeline from '../icon/Lifeline.svelte'

let isShowingDirections = false
const toggleIsShowingDirections = (): void => {
  isShowingDirections = !isShowingDirections
}

const useLifeline = (): void => {
  const hasAcknowledgedLifeline = load('acknowledgedLifeline')
  let confirmation = false

  if (!hasAcknowledgedLifeline) {
    confirmation = confirm(`Permanently reduces your maximum attempts to solve the current code word. Use a lifeline?\n\n(This warning won't show again once used.)`)

    if (confirmation) {
      save('acknowledgedLifeline', true)
    }
  }

  if (hasAcknowledgedLifeline || confirmation) {
    currentGuess.set($codeWord)
    maxRemainingAttempts.set($maxRemainingAttempts - 1)
    handleNewGuess()
  }
}

$: scoreDigits = String($runningScore).padStart(3).split('')
</script>


<div class="info-bar">
  <div class="info-button score" role="status" aria-live="polite" aria-label={`Score: ` + scoreDigits}>
    <div class="score-container" aria-hidden="true">
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
  <button class="info-button lifeline" on:click={useLifeline}>
    <Lifeline />
    <span class="sr">Use a lifeline</span>
  </button>
  <PowerBar />
  <div></div>
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
    grid-template-columns: auto auto 1fr  2.5rem auto;
    align-items: center;
    justify-items: center;
    gap: 10px;
    margin-bottom: 1rem;
    position: relative;
    z-index: 2;
  }

  .info-button {
    --buttonSize: 2.5rem;

    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid var(--darkBlue);
    color: var(--darkBlue);
    border-radius: var(--buttonSize);
    width: var(--buttonSize);
    height: var(--buttonSize);
    line-height: 2;
    font-weight: bold;
    font-family: 'Ridley Grotesk', sans-serif;
    background: var(--paper);
    position: relative;
    z-index: 4;
    padding-top: 0.05ch;
    font-size: 1rem;
  }

  .lifeline {
    border: 0;
    padding: 0;
    fill: var(--red);
    overflow: hidden;
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