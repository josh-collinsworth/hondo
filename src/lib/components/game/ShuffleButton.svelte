<script lang="ts">
import { showModal } from '$lib/js/mutations'
import { runningScore, shuffleCooldown } from '$lib/js/state';
import ShuffleIcon from '../icon/ShuffleIcon.svelte'
import ShuffleConfirmationModal from '../modals/ShuffleConfirmationModal.svelte'

const confirmShuffle = (): void => {
  showModal(ShuffleConfirmationModal)
}

$: isCoolingDown = !!$shuffleCooldown
</script>

<button
  on:click={confirmShuffle}
  class="info-button shuffle-button"
>
  <ShuffleIcon />
  <div class="sr">Shuffle board</div>
  {#if !isCoolingDown && $runningScore}
    <div class="shuffle-button__burst" />
  {/if}
</button>


<style lang="scss">
  .shuffle-button__burst {
    border: 2px solid var(--darkBlue);
    background: var(--lighterGray);
    width: 100%;
    height: 100%;
    border-radius: 2rem;
    animation: burst 1.5s cubic-bezier(0.86, 0, 0.07, 1) forwards;
    position: relative;
    z-index: -1;
  }

  @keyframes burst {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
</style>