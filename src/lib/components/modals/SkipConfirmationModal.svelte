<script lang="ts">
import { SKIP_COST } from '$lib/js/constants'
import { skipCodeWord, closeModal } from '$lib/state/mutations'
import { remainingAttempts } from '$lib/state/game'

import SkipIcon from '../icon/SkipIcon.svelte'

let cancelButton: HTMLButtonElement

const listenForEnter = (e: KeyboardEvent): void => {
	if (e.key === 'Enter' && e.target != cancelButton && $remainingAttempts > SKIP_COST) {
		skipAndClose()
	}
}

const skipAndClose = (): void => {
	skipCodeWord()
	closeModal()
}
</script>


<svelte:window on:keydown={listenForEnter} />


<h2 class="display-flex align-center">
	Skip
	<span class="info-button skip-button" aria-hidden="true">
		<SkipIcon />
	</span>
</h2>

<p>Skips the current code word and randomly selects a new one.</p>
<p>
	<b>Cost</b>: 
	<span class="sr">{SKIP_COST}</span>
	<span class="energy-bar" aria-hidden="true">
		<span class="energy-cell" />
	</span>
</p>

<div class="button-bar">
	<button on:click={closeModal} bind:this={cancelButton}>
		Cancel
	</button>
	<button class="confirm" on:click={skipAndClose} disabled={SKIP_COST >= $remainingAttempts}>
		Skip now
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
