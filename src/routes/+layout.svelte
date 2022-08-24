<script lang="ts">
import type { PageData } from '@sveltejs/kit/types/internal'
import '$lib/scss/global.scss'
import { gameHistory, gameIsOver, runningScore } from '$lib/state/game'
import { isMenuOpen, shownModal } from '$lib/state/global'
import { setToast } from '$lib/state/mutations'
import SkipToContentLink from '$lib/components/SkipToContentLink.svelte'
import Modal from '$lib/components/modals/Modal.svelte'
import Menu from '$lib/components/Menu.svelte'
import Logo from '$lib/components/icon/Logo.svelte'
import { fly } from 'svelte/transition'
import { onMount } from 'svelte'
import { retrieveGameHistory } from '$lib/state/getters'
import GameOverModal from '$lib/components/modals/GameOverModal.svelte'

export let data: PageData
$: ({ path } = data)

$: isInert = $shownModal || $isMenuOpen || null

$: if ($gameIsOver) {
  if ($runningScore >= 100) {
    setToast({ message: 'Congratulations!', type: 'success' })
  } else (
    setToast({ message: 'Too bad!', type: 'warning' })
  )
  setTimeout(() => {
    $shownModal = GameOverModal
  }, 1500)
}

onMount(() => {
  $gameHistory = retrieveGameHistory() || []
})
</script>


<div class="layout">
  {#if path === '/'}
    <SkipToContentLink />
  {/if}
  
  {#if $shownModal}
    <Modal>
      <svelte:component this={$shownModal} />
    </Modal>
  {/if}
  
  <main inert={isInert} class:blurry={isInert} id="#main" tabindex="-1">
    {#key path}
      <div class="transition" in:fly={{ delay: 420, duration: 360, y: 8 }} out:fly={{ duration: 360, y: -8 }}>
        <slot />
      </div>
    {/key}
  </main>

  <Menu currentPage={path} />
</div>

<div class="logo-preloader sr" style="position:absolute;left:-100vw;"><Logo /></div>