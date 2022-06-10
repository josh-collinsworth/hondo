<script lang="ts">
  import { useLifeline, closeModal } from '$lib/js/mutations'
  import Lifeline from '../icon/Lifeline.svelte'

  let cancelButton: HTMLButtonElement

  const useLifelineAndClose = (): void => {
    useLifeline()
    closeModal()
  }

  const listenForEnter = (e: KeyboardEvent): void => {
    if (e.key === 'Enter' && e.target != cancelButton) {
      useLifelineAndClose()
    }
  }
</script>


<svelte:window on:keydown={listenForEnter} />


<h2 class="display-flex align-center">
  Use a lifeline?
  <span class="info-button lifeline" aria-hidden="true">
    <Lifeline />
  </span>
</h2>

<p>This will solve the current code word, but temporarily reduce your maximum life gauge.</p>

<div class="button-bar">
  <button on:click={closeModal} bind:this={cancelButton}>
    Cancel
  </button>
  <button class="confirm" on:click={useLifelineAndClose}>
    OK
  </button>
</div>


<style lang="scss">
  h2 {
    justify-content: space-between;
  }
</style>