<script lang="ts">
  import { shuffleGuesses, closeModal } from '$lib/js/mutations'
  import { maxRemainingAttempts } from '$lib/js/state'

  import ShuffleIcon from '../icon/ShuffleIcon.svelte'

  let cancelButton: HTMLButtonElement

  const listenForEnter = (e: KeyboardEvent): void => {
    if (e.key === 'Enter' && e.target != cancelButton && $maxRemainingAttempts > 1) {
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

{#if $maxRemainingAttempts > 1}
  <p>Randomly replaces all guesses on the board, at the cost of <strong>permanently reducing your maximum life</strong>.</p>

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
  <p>Sorry, you can't afford to shuffle.</p>
  
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
