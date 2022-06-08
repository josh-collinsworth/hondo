<script lang="ts">
import { codeWord, currentGuess, maxRemainingAttempts, runningScore, darkMode } from '$lib/js/state'
import { fly } from 'svelte/transition'

import { handleNewGuess, load, save } from '$lib/js/helpers'

import DirectionsModal from './DirectionsModal.svelte'
import PowerBar from './PowerBar.svelte'
import Lifeline from '../icon/Lifeline.svelte'

let isShowingDirections = false
const toggleIsShowingDirections = (): void => {
  isShowingDirections = !isShowingDirections
}

// const toggleDarkMode = (): void => {
//   darkMode.set(!$darkMode)

//   if ($darkMode) {
//     document.querySelector('html').classList.add('dark')
//   } else {
//     document.querySelector('html').classList.remove('dark')
//   }
// }

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
  <div class="display-flex align-center score-container">
    <div class="score-ring"></div>
    <div
      class="info-button score"
      role="status"
      aria-live="polite"
      aria-label={`Score: ` + $runningScore}
      style="overflow: {$runningScore < 100 ? 'hidden' : 'visible'};"
    >
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
    <PowerBar />
  </div>
  <button class="info-button lifeline" on:click={useLifeline} disabled={$maxRemainingAttempts <= 1}>
    <Lifeline />
    <span class="sr">Use a lifeline</span>
  </button>
  <!-- <button class="info-button dark-mode-toggle" on:click={toggleDarkMode}>
    <div class="crescent inner"></div>
    <div class="crescent outer"></div>
  </button> -->
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
    grid-template-columns: repeat(3, auto);
    align-items: center;
    justify-items: center;
    gap: 10px;
    margin-bottom: 1rem;
    position: relative;
    z-index: 2;
  }

  .instructions {
    font-size: 1.5rem;
  }

  .dark-mode-toggle {
    padding: 4px;

    .crescent {
      width: 100%;
      height: 100%;
      border-radius: 3rem;
      background: var(--darkBlue);

      &.inner {
        position: absolute;
        background: var(--paper);
        width: 1.4em;
        height: 1.4em;
        left: 0.1em;
        top: 0.2em;
        z-index: 2;
      }
    }
  }

  .score-container {
    --buttonSize: 2.5rem;
    position: relative;
  }

  .score-ring {
    width: calc(var(--buttonSize) + 12px);
    height: calc(var(--buttonSize) + 12px);
    border: 4px solid var(--darkBlue);
    position: absolute;
    left: -6px;
    top: -6px;
    border-radius: 3rem;
  }

  .score {
    overflow: hidden;
    font-size: 1.4rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 0 2px var(--paper);
    margin-right: -6px;
    overflow: hidden;
    border: 0;

    .score-container {
      display: grid;
      grid-template-columns: repeat(3, auto);
      justify-content: center;
      position: relative;
      z-index: 2;        
      width: min-content;
      padding: 0;
      text-align: center;
    }

    .score-digit {
      display: block;
      flex: 1 1 auto;
      text-align: center;
      grid-row: 1 / 2;
      height: 100%;
    
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