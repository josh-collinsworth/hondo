<script lang="ts">
import { STARTING_GUESSES } from '$lib/js/constants'
import { runningScore } from '$lib/js/state'

import DirectionsModal from './DirectionsModal.svelte'
import PowerBar from './PowerBar.svelte'

let isShowingDirections = false
const toggleIsShowingDirections = (): void => {
  isShowingDirections = !isShowingDirections
}

const quartOutCSS = `cubic-bezier(0.165, 0.84, 0.44, 1)`
const quintInOutCSS = `cubic-bezier(0.86, 0, 0.07, 1)`

const CIRCLE_LENGTH = 119.3970

$: piePercentage = $runningScore % 10
</script>


<div class="info-bar" >
  <div class="info-button score">
    <svg class="ring" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="20"
        cy="20"
        r="19"
        style="
          stroke-dasharray: {CIRCLE_LENGTH};
          stroke-dashoffset: {CIRCLE_LENGTH / STARTING_GUESSES * piePercentage};
          transition-timing-function: {piePercentage ? quartOutCSS : quintInOutCSS};
          transition-duration: {piePercentage ? '1s' : '2s'};
        " />
    </svg>
    
    <span class="score__counter">{$runningScore}</span>
  </div>
  <PowerBar />
  <button class="info-button instructions" on:click={toggleIsShowingDirections}>
    ?
  </button>
</div>

{#if isShowingDirections}
  <DirectionsModal close={toggleIsShowingDirections} />
{/if}

<style lang="scss">
  .info-bar {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 10px;
  }

  .info-button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid var(--darkGray);
    color: var(--darkGray);
    border-radius: 2.5rem;
    width: 2.5rem;
    height: 2.5rem;
    line-height: 2;
    font-size: 1.2rem;
    font-weight: bold;
    font-family: 'Rubik', sans-serif;
    background: transparent;
    position: relative;

    &.score {
      border-color: var(--lighterGray);

      .score__counter {
        position: relative;
        z-index: 2;
      }

      .ring {
        position: absolute;
        fill: transparent;
        stroke: var(--darkGray);
        stroke-width: 2px;
        width: calc(100% + 4px);
        height: calc(100% + 4px);
        top: -2px;
        left: -2px;
        transform: rotate(270deg) rotateX(180deg);
        
        circle {
          transition-property: stroke-dashoffset;
        }
      }
    }
  }
</style>