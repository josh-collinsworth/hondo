<script lang="ts">
  import { useLifeline, closeModal } from '$lib/js/mutations'
  import { remainingLifelineCooldowns } from '$lib/js/state'
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

  $: lifelineCost = 1 + $remainingLifelineCooldowns.length
</script>


<svelte:window on:keydown={listenForEnter} />

{$remainingLifelineCooldowns}
<h2 class="display-flex align-center">
  Use a lifeline?
  <span class="info-button lifeline" aria-hidden="true">
    <Lifeline />
  </span>
</h2>

<p>Solves the current code word, but temporarily reduces your max life.</p>

<p>The cost to use a lifeline now is <strong>{lifelineCost} bar{lifelineCost > 1 ? 's' : ''}</strong>.</p>

<p>Pay to use a lifeline?</p>

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