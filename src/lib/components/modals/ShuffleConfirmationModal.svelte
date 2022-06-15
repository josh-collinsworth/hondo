<script lang="ts">
  import { shuffleGuesses, closeModal } from '$lib/js/mutations'
  import { shuffleCooldown } from '$lib/js/state'

  import ShuffleIcon from '../icon/ShuffleIcon.svelte'

  let cancelButton: HTMLButtonElement

  const listenForEnter = (e: KeyboardEvent): void => {
    if (e.key === 'Enter' && e.target != cancelButton && !$shuffleCooldown) {
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

{#if !$shuffleCooldown}
  <p>Replaces all guesses on the board with random words. Shuffle now?</p>

  <div class="button-bar">
    <button on:click={closeModal} bind:this={cancelButton}>
      Cancel
    </button>
    <button class="confirm" on:click={shuffleAndClose}>
      OK
    </button>
  </div>
{:else}
  <p>Sorry, you can't use shuffle yet. (Guess more words first.)</p>
  
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
