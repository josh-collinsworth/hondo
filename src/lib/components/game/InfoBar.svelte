<script lang="ts">
  import { runningScore, usedAttempts } from '$lib/js/state'

  import DirectionsModal from './DirectionsModal.svelte'
  import PowerBar from './PowerBar.svelte'

  let isShowingDirections = false
  const toggleIsShowingDirections = (): void => {
    isShowingDirections = !isShowingDirections
  }

  $: piePercentage = $usedAttempts % 10 * 10
  $: getConicGradient = `background: conic-gradient(var(--lighterGray), var(--lighterGray) ${piePercentage}%, var(--darkGray) ${piePercentage}%, var(--darkGray));`
</script>


<div class="info-bar" >
  <div class="info-button score" style={getConicGradient} data-used={$usedAttempts}>
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
      border: 0;

      .score__counter {
        position: relative;
        z-index: 2;
      }

      &::after {
        content: '';
        background: var(--paper);
        width: calc(2.5rem - 4px);
        height: calc(2.5rem - 4px);
        border-radius: 2.5rem;
        left: 2px;
        top: 2px;
        z-index: 0;
        position: absolute;
      }
    }
  }
</style>