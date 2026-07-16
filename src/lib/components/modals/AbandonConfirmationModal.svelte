<script lang="ts">
	import { SKIP_COST } from '$lib/js/constants';
	import { skipCodeWord, closeModal, handleEndgame } from '$lib/state/mutations';
	import { remainingAttempts } from '$lib/state/game';

	import ExclamationPoint from '../icon/blocks/ExclamationPoint.svelte';

	let cancelButton: HTMLButtonElement;

	const listenForEnter = (e: KeyboardEvent): void => {
		if (e.key === 'Enter' && e.target != cancelButton && $remainingAttempts > SKIP_COST) {
			skipAndClose();
		}
	};

	const skipAndClose = (): void => {
		skipCodeWord();
		closeModal();
	};

	const abandonGame = (): void => {
		/* TODO: there are stats that may need to be handled when a game is abandoned. e.g., should average game length include skipped games? */
		handleEndgame();
		closeModal();
	};
</script>

<svelte:window onkeydown={listenForEnter} />

<h2 class="display-flex align-center">
	Abandon
	<span class="info-button skip-button" aria-hidden="true">
		<ExclamationPoint />
	</span>
</h2>

<p><b>Are you sure you want to end the current game?</b> This will count as a loss.</p>

<div class="button-bar">
	<button onclick={closeModal} bind:this={cancelButton}> Cancel </button>
	<button class="warning" onclick={abandonGame}> Abandon game! </button>
</div>

<style lang="scss">
	h2 {
		justify-content: space-between;
		font-size: 1.375rem;
	}

	b {
		font-weight: var(--fontWeightSemiBold);
	}
</style>
