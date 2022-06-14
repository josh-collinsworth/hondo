<script lang="ts">
import { showModal } from '$lib/js/mutations'
import ShuffleIcon from '../icon/Shuffle.svelte'
import ShuffleConfirmationModal from '../modals/ShuffleConfirmationModal.svelte'

const confirmShuffle = (): void => {
  showModal(ShuffleConfirmationModal)
}
</script>

<button on:click={confirmShuffle} class="info-button shuffle-button">
  <ShuffleIcon />
  <div class="sr">Shuffle board</div>
</button>
