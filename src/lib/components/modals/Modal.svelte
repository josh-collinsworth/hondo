<script lang="ts">
import type { Snippet } from 'svelte'
import { closeModal } from '$lib/state/mutations'
import { fly, fade } from 'svelte/transition'
import { quadIn, quadOut, } from 'svelte/easing'
import { onMount } from 'svelte'

let { children }: { children: Snippet } = $props()

const duration = 240
let modalCard: HTMLDivElement

const listenForClose = (e: KeyboardEvent): void => {
	if (e.key === 'Escape') {
		closeModal()
	}
}

const handleBackgroundClick = (e: MouseEvent): void => {
	if (e.target === e.currentTarget) {
		closeModal()
	}
}

onMount(() => {
	modalCard.focus()
})
</script>


<svelte:window onkeyup={listenForClose} />


<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
<div id="modal-background" transition:fade={{ duration }} onclick={handleBackgroundClick}>
	<div
		id="modal-card"
		tabindex="-1"
		bind:this={modalCard}
		in:fly={{y: 36, duration, easing: quadOut}}
		out:fly={{y: -36, duration, easing: quadIn}}
	>
		{@render children()}
	</div>
</div>
