<script lang="ts">
import type { LayoutData } from './$types'
import '$lib/scss/global.scss'
import { gameHistory, gameIsOver, runningScore } from '$lib/state/game'
import { isMenuOpen, isScoring, shownModal } from '$lib/state/global'
import { isDarkMode } from '$lib/state/user'
import { setToast } from '$lib/state/mutations'
import SkipToContentLink from '$lib/components/SkipToContentLink.svelte'
import Modal from '$lib/components/modals/Modal.svelte'
import Menu from '$lib/components/Menu.svelte'
import Logo from '$lib/components/icon/Logo.svelte'
import { fly } from 'svelte/transition'
import { onMount } from 'svelte'
import { retrieveGameHistory } from '$lib/state/getters'
import GameOverModal from '$lib/components/modals/GameOverModal.svelte'
import type { Snippet } from 'svelte'

let { data, children }: { data: LayoutData, children: Snippet } = $props()
let path = $derived(data.path)

let isInert = $derived(!!$shownModal || $isMenuOpen || null)

$effect(() => {
	if ($gameIsOver) {
		if ($runningScore >= 100) {
			setToast({ message: 'Congratulations!', type: 'success' })
		} else {
			setToast({ message: 'Too bad!', type: 'warning' })
		}
		setTimeout(() => {
			$shownModal = GameOverModal
		}, 1500)
	}
})

const handleInterruptedScoring = (e: BeforeUnloadEvent) => {
	if ($isScoring) {
		e.returnValue = `Warning! Leaving the page now may corrupt your data. Please try again.`
	}
}

onMount(() => {
	$gameHistory = retrieveGameHistory() || []
})
</script>


<svelte:window onbeforeunload={handleInterruptedScoring} />
<svelte:head>
	<meta name="theme-color" content={$isDarkMode ? '#160d27' : '#fefff6'} >
</svelte:head>

<div class="layout">
	{#if path === '/'}
		<SkipToContentLink />
	{/if}

	{#if $shownModal}
		{@const ModalContent = $shownModal}
		<Modal>
			<ModalContent />
		</Modal>
	{/if}

	<main inert={isInert} class:blurry={isInert} id="#main" tabindex="-1">
		{#key path}
			<div class="transition" in:fly={{ delay: 420, duration: 360, y: 8 }} out:fly={{ duration: 360, y: -8 }}>
				{@render children()}
			</div>
		{/key}
	</main>

	<Menu currentPage={path} />
</div>

<div class="logo-preloader sr" style="position:absolute;left:-100vw;"><Logo /></div>
