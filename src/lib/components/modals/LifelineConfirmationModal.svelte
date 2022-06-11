<script lang="ts">
  import { LIFELINE_DURATION } from '$lib/js/constants'
  import { useLifeline, closeModal } from '$lib/js/mutations'
  import { maxRemainingAttempts, remainingAttempts, remainingLifelineCooldowns } from '$lib/js/state'
  import { floatFormatter } from '$lib/js/helpers'

  import Lifeline from '../icon/Lifeline.svelte'

  let cancelButton: HTMLButtonElement

  const useLifelineAndClose = (): void => {
    useLifeline()
    closeModal()
  }

  const listenForEnter = (e: KeyboardEvent): void => {
    if (e.key === 'Enter' && e.target != cancelButton && lifelineCost < $maxRemainingAttempts) {
      useLifelineAndClose()
    }
  }

  $: lifelineCost = 1 + $remainingLifelineCooldowns.length
</script>


<svelte:window on:keydown={listenForEnter} />

<h2 class="display-flex align-center">
  Use a lifeline?
  <span class="info-button lifeline" aria-hidden="true">
    <Lifeline />
  </span>
</h2>

{#if lifelineCost < $maxRemainingAttempts}
  <p>Solves the current code word, but temporarily reduces your max life.</p>

  <p>Pay <strong>{lifelineCost} bar{lifelineCost === 1 ? '' : 's'}</strong> to use a lifeline?</p>

  <div class="button-bar">
    <button on:click={closeModal} bind:this={cancelButton}>
      Cancel
    </button>
    <button class="confirm" on:click={useLifelineAndClose}>
      OK
    </button>
  </div>
{:else}
  <p>Sorry, you can't afford another lifeline right now.</p>
  
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
