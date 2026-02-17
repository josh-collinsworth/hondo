<script lang="ts">
import { SHUFFLE_COST } from '$lib/js/constants'
import { shuffleGuesses, closeModal } from '$lib/state/mutations'
import { remainingAttempts } from '$lib/state/game'

import ShuffleIcon from '../icon/ShuffleIcon.svelte'

let cancelButton: HTMLButtonElement

const listenForEnter = (e: KeyboardEvent): void => {
	if (e.key === 'Enter' && e.target != cancelButton && $remainingAttempts > SHUFFLE_COST) {
		shuffleAndClose()
	}
}

const shuffleAndClose = (): void => {
	shuffleGuesses()
	closeModal()
}
</script>


<svelte:window onkeydown={listenForEnter} />


<h2 class="display-flex align-center">
	Shuffle
	<span class="info-button shuffle-button" aria-hidden="true">
		<ShuffleIcon />
	</span>
</h2>

<p>Replaces all words on the board with new, random words.</p>
<p>
	<b>Cost</b>:
	<span class="sr">{SHUFFLE_COST}</span>
	<span class="energy-bar" aria-hidden="true">
		<span class="energy-cell"></span><span class="energy-cell"></span>
	</span>
</p>

<div class="button-bar">
	<button onclick={closeModal} bind:this={cancelButton}>
		Cancel
	</button>
	<button class="confirm" onclick={shuffleAndClose} disabled={SHUFFLE_COST >= $remainingAttempts}>
		Shuffle now
	</button>
</div>


<style lang="scss">
h2 {
	justify-content: space-between;
	font-size: 1.375rem;
}

b {
	font-weight: var(--fontWeightSemiBold);
}

.energy-cell {
	width: 2em;
	height: 0.5em;
	background: var(--red);
	display: inline-block;
	margin: 0 1px;

	&:first-of-type {
		margin-left: 8px;
	}
}
</style>
