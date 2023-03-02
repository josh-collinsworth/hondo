<script lang="ts">
import { onMount } from 'svelte'
import { fly } from 'svelte/transition'

let isShown = false
let installEvent: Event

onMount(() => {
	window.addEventListener('beforeinstallprompt', (e) => {
		e.preventDefault()
		installEvent = e
		isShown = true
	})
})

const dismissPrompt = () => {
	isShown = false
}

const installPWA = () => {
	installEvent.prompt()
	installEvent.userChoice.then((choice) => {
		dismissPrompt() // Hide the prompt once the user's clicked
		if (choice.outcome === 'accepted') {
			// Do something additional if the user chose to install
		} else {
			// Do something additional if the user declined
		}
	})
}

</script>


{#if isShown}
	<div class="pwa-prompt" transition:fly={{ y: -100 }}>
		<p>Add Hondo to your home screen?</p>

		<div class="button-bar">
			<button on:click={dismissPrompt}>
				Nah
			</button>
			
			<button class="confirm" on:click={installPWA}>
				Install!
			</button>
		</div>
	</div>
{/if}


<style lang="scss">
.pwa-prompt {
	position: fixed;
	left: 0;
	top: 0;
	padding: 1.5rem 1rem;
	width: 100vw;
	background: var(--paper);
	border-bottom: 2px solid var(--darkBlue);
	font-size: 1rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	z-index: 8;

	.button-bar {
		margin: 0;
		gap: 1rem;
	}
}
</style>