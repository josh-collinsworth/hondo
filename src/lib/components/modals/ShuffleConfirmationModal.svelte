<script lang="ts">
  import { shuffleGuesses, closeModal } from '$lib/js/mutations'
  import { maxRemainingAttempts, remainingAttempts } from '$lib/js/state'

  import ShuffleIcon from '../icon/Shuffle.svelte'

  let cancelButton: HTMLButtonElement

  const listenForEnter = (e: KeyboardEvent): void => {
    if (e.key === 'Enter' && e.target != cancelButton && shuffleCost < $maxRemainingAttempts) {
      shuffleAndClose()
    }
  }

  const shuffleAndClose = (): void => {
    shuffleGuesses()
    closeModal()
  }

  const shuffleCost = 2
</script>


<svelte:window on:keydown={listenForEnter} />

<h2 class="display-flex align-center">
  Shuffle
  <span class="info-button shuffle-button" aria-hidden="true">
    <ShuffleIcon />
  </span>
</h2>

{#if shuffleCost < $remainingAttempts}
  <p>Replaces all guesses on the board with random words.</p>

  <p>Pay <strong>{shuffleCost}</strong> life to shuffle?</p>

  <div class="button-bar">
    <button on:click={closeModal} bind:this={cancelButton}>
      Cancel
    </button>
    <button class="confirm" on:click={shuffleAndClose}>
      OK
    </button>
  </div>
{:else}
  <p>Sorry, shuffling costs two bars from your life gauge.</p>
  
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
