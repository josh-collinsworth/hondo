<script lang="ts">
import { codeWord, currentGuess, maxRemainingAttempts, runningScore, darkMode } from '$lib/js/state'

import { handleNewGuess, load, save } from '$lib/js/helpers'

import PowerBar from './PowerBar.svelte'
import Lifeline from '../icon/Lifeline.svelte'

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
    confirmation = confirm(`Permanently reduces life gauge to solve the current code word. Use a lifeline?\n\n(This warning won't show again once used.)`)

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

</script>


<div class="info-bar">
  <button class="info-button lifeline" on:click={useLifeline} disabled={$maxRemainingAttempts <= 1}>
    <Lifeline />
    <span class="sr">Use a lifeline</span>
  </button>
  
  <PowerBar />
  <!-- <button class="info-button dark-mode-toggle" on:click={toggleDarkMode}>
    <div class="crescent inner"></div>
    <div class="crescent outer"></div>
  </button> -->
  <a href="how-to-play" class="info-button instructions">
    ?
  </a>
  <!-- <button class="info-button instructions" on:click={toggleIsShowingDirections}>
    ?
  </button> -->
</div>

<!-- For debugging -->
<!-- <button on:click={() => runningScore.set($runningScore + 1)}>+1</button> -->

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

  .instructions {
    font-size: 1.5rem;
    text-decoration: none;
  }

  // .dark-mode-toggle {
  //   padding: 4px;

  //   .crescent {
  //     width: 100%;
  //     height: 100%;
  //     border-radius: 3rem;
  //     background: var(--darkBlue);

  //     &.inner {
  //       position: absolute;
  //       background: var(--paper);
  //       width: 1.4em;
  //       height: 1.4em;
  //       left: 0.1em;
  //       top: 0.2em;
  //       z-index: 2;
  //     }
  //   }
  // }


</style>