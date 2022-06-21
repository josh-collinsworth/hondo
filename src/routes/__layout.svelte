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
  import { blur } from 'svelte/transition'
  import { gameIsOver } from '$lib/state/game'
  import { isMenuOpen, shownModal } from '$lib/state/global'
  import Modal from '$lib/components/modals/Modal.svelte'
  import SkipToContentLink from '$lib/components/SkipToContentLink.svelte'
  import GameOverModal from '$lib/components/modals/GameOverModal.svelte'
  import Menu from '$lib/components/Menu.svelte'
  import Logo from '$lib/components/icon/Logo.svelte'

  export let path: string

  $: isInert = $shownModal || $isMenuOpen || null

  $: if ($gameIsOver) {
    setTimeout(() => {
      $shownModal = GameOverModal
    }, 1200)
  }
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
      <div in:blur={{ delay: 420, duration: 360 }} out:blur={{ duration: 360}}>
        <slot />
      </div>
    {/key}
  </main>

  <Menu currentPage={path} />
</div>

<div class="logo-preloader sr" style="position:absolute;left:-100vw;"><Logo /></div>