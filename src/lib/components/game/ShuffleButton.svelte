<script lang="ts">
import { shownModal } from '$lib/state/global'
import { maxRemainingAttempts } from '$lib/state/game'
import ShuffleConfirmationModal from '../modals/ShuffleConfirmationModal.svelte'
import LightningBolt from '../icon/LightningBolt.svelte';

const confirmShuffle = (): void => {
  $shownModal = ShuffleConfirmationModal
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
