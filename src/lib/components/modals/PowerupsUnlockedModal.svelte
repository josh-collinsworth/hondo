<script lang="ts">
import { closeModal } from '$lib/state/mutations'

let cancelButton: HTMLButtonElement

const listenForEnter = (e: KeyboardEvent): void => {
  if (e.key === 'Enter' && e.target != cancelButton) {
    closeModal()
  }
}
</script>

<svelte:window on:keydown={listenForEnter} />


<h2 class="display-flex align-center">
  Powerups unlocked!
</h2>

<p>Powerups help you by altering the game in new and interesting ways!</p>

<p>Start a new game to choose from your available powerups. Play more to unlock even more types!</p>

<div class="button-bar">
  <button on:click={closeModal} bind:this={cancelButton}>
    Close
  </button>
  <button class="confirm" on:click={closeModal}>
    Got it!
  </button>
</div>


<style lang="scss">
h2 {
  justify-content: space-between;
}
</style>
