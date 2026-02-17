<script lang="ts">
import { shownModal } from '$lib/state/global'
import { maxRemainingAttempts } from '$lib/state/game'
import ShuffleConfirmationModal from '../modals/ShuffleConfirmationModal.svelte'
import ShuffleIcon from '../icon/ShuffleIcon.svelte'

const confirmShuffle = (): void => {
	$shownModal = ShuffleConfirmationModal
}
</script>

<button
	onclick={confirmShuffle}
	disabled={$maxRemainingAttempts <= 1}
	class="info-button shuffle-button"
>
	<ShuffleIcon />
	<div class="sr">Shuffle board</div>
</button>
