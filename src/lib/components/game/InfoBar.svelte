<script lang="ts">
  import { remainingAttempts, runningScore } from '$lib/js/state'

  import DirectionsModal from './DirectionsModal.svelte'
  import PowerBar from './PowerBar.svelte'

  let isShowingDirections = false
  const toggleIsShowingDirections = (): void => {
    isShowingDirections = !isShowingDirections
  }
</script>


<div class="info-bar" >
  <div class="info-button">
    {$runningScore}
  </div>
  <PowerBar />
  <button class="info-button" on:click={toggleIsShowingDirections}>
    ?
  </button>
</div>

{#if isShowingDirections}
  <DirectionsModal close={toggleIsShowingDirections} />
{/if}


<style>
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
    border: 2px solid var(--lightGray);
    color: var(--lightGray);
    border-radius: 2.5rem;
    width: 2.5rem;
    height: 2.5rem;
    line-height: 2;
    font-size: 1.2rem;
    font-weight: bold;
    font-family: 'Rubik', sans-serif;
    background: transparent;
  }
</style>