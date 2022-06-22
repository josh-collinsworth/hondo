<script lang="ts">
import { SHUFFLE_COST } from '$lib/js/constants';
import { shuffleGuesses, closeModal } from '$lib/state/mutations'
import { remainingAttempts } from '$lib/state/game'

import ShuffleIcon from '../icon/ShuffleIcon.svelte'

let cancelButton: HTMLButtonElement

const listenForEnter = (e: KeyboardEvent): void => {
  if (e.key === 'Enter' && e.target != cancelButton && $remainingAttempts > SHUFFLE_COST) {
    shuffleAndClose()
  }
}

const shuffleAndClose = (): void => {
  shuffleGuesses()
  closeModal()
}
</script>


<svelte:window on:keydown={listenForEnter} />

<h2 class="display-flex align-center">
  Shuffle
  <span class="info-button shuffle-button" aria-hidden="true">
    <ShuffleIcon />
  </span>
</h2>

{#if $remainingAttempts > SHUFFLE_COST}
  <p>Replaces the board with new random words, but drains your gauge by 20%.</p>

  <p>Shuffle now?</p>

  <div class="button-bar">
    <button on:click={closeModal} bind:this={cancelButton}>
      Cancel
    </button>
    <button class="confirm" on:click={shuffleAndClose}>
      OK
    </button>
  </div>
{:else}
  <p>Sorry, you can't afford to shuffle right now.</p>
  
  <div class="button-bar">
    <button on:click={closeModal}>
      OK
    </button>
  </div>
{/if}


<style lang="scss">
h2 {
  justify-content: space-between;
}
</style>
