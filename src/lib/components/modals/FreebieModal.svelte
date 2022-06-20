<script lang="ts">
  import { save } from '$lib/js/helpers'
  import { closeModal } from '$lib/js/mutations'

  let noShowButton: HTMLButtonElement

  const listenForEnter = (e: KeyboardEvent): void => {
    if (e.key === 'Enter' && e.target != noShowButton) {
      closeModal()
    }
  }

  const setNoShow = (): void => {
    save('never-show-freebie-modal', true)
    closeModal()
  }
</script>


<svelte:window on:keydown={listenForEnter} />

<h2 class="display-flex align-center">
  Freebies
</h2>

<p>Sometimes, if your guess is <em>exactly</em> one letter off, you get a freebie.</p>

<p>This means your guess doesn't count or go on the board, and you get another try for free. <em>However</em>, you won't know <em>which</em> letter was off.</p>

<div class="button-bar">
  <button on:click={setNoShow} bind:this={noShowButton}>
    Don't show again
  </button>
  <button class="confirm" on:click={closeModal}>
    Got it
  </button>
</div>
