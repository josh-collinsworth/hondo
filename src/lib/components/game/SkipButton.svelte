<script lang="ts">
import { shownModal } from '$lib/state/global'
import { maxRemainingAttempts } from '$lib/state/game'
import SkipConfirmationModal from '../modals/SkipConfirmationModal.svelte'
import SkipIcon from '../icon/SkipIcon.svelte'

const confirmSkip = (): void => {
  $shownModal = SkipConfirmationModal
}
</script>

<button
  on:click={confirmSkip}
  disabled={$maxRemainingAttempts <= 1}
  class="info-button skip-button"
>
  <!-- <LightningBolt /> -->
  <SkipIcon />
  <div class="sr">Shuffle board</div>
</button>
