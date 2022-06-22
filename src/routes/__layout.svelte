<script context="module" lang="ts">
import type { LoadOutput } from '@sveltejs/kit'

export const load = async ({ url }): Promise<LoadOutput> => {
  const path: string = url.pathname

  return {
    props: {
      path
    }
  }
}
</script>


<script lang="ts">
import '$lib/scss/global.scss'
import { fly } from 'svelte/transition'
import { gameIsOver, runningScore } from '$lib/state/game'
import { isMenuOpen, shownModal } from '$lib/state/global'
import Modal from '$lib/components/modals/Modal.svelte'
import SkipToContentLink from '$lib/components/SkipToContentLink.svelte'
import Menu from '$lib/components/Menu.svelte'
import Logo from '$lib/components/icon/Logo.svelte'
import { goto } from '$app/navigation';
import { setToast } from '$lib/state/mutations';

export let path: string

$: isInert = $shownModal || $isMenuOpen || null

$: if ($gameIsOver) {
  if ($runningScore >= 100) {
    setToast({ message: 'Congratulations!', type: 'success' })
  } else (
    setToast({ message: 'Too bad!', type: 'warning' })
  )
  setTimeout(() => {
    goto('/game-over')
  }, 1500)
}
</script>


<div class="layout">
  {#if path === '/game'}
    <SkipToContentLink />
  {/if}
  
  {#if $shownModal}
    <Modal>
      <svelte:component this={$shownModal} />
    </Modal>
  {/if}
  
  <main inert={isInert} class:blurry={isInert} id="#main" tabindex="-1">
    {#key path}
      <div in:fly={{ delay: 420, duration: 360, y: 8 }} out:fly={{ duration: 360, y: -8 }}>
        <slot />
      </div>
    {/key}
  </main>

  <Menu currentPage={path} />
</div>

<div class="logo-preloader sr" style="position:absolute;left:-100vw;"><Logo /></div>