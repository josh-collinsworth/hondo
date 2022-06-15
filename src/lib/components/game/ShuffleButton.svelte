<script lang="ts">
import { showModal } from '$lib/js/mutations'
import { maxRemainingAttempts, runningScore, shuffleCooldown } from '$lib/js/state';
import ShuffleIcon from '../icon/ShuffleIcon.svelte'
import ShuffleConfirmationModal from '../modals/ShuffleConfirmationModal.svelte'

const confirmShuffle = (): void => {
  showModal(ShuffleConfirmationModal)
}
</script>

<button
  on:click={confirmShuffle}
  disabled={$maxRemainingAttempts <= 1}
  class="info-button shuffle-button"
>
  <ShuffleIcon />
  <div class="sr">Shuffle board</div>
</button>
