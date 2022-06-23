<script lang="ts">
import { showModal } from '$lib/state/mutations'
import { maxRemainingAttempts } from '$lib/state/game';
import LightningBolt from '../icon/LightningBolt.svelte'
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
  <LightningBolt />
  <div class="sr">Shuffle board</div>
</button>
