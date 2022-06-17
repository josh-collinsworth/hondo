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
  import { fade } from 'svelte/transition'
  import { gameIsOver, shownModal } from '$lib/js/state'
  import Modal from '$lib/components/modals/Modal.svelte'
  import SkipToContentLink from '$lib/components/SkipToContentLink.svelte'
  import GameOverModal from '$lib/components/modals/GameOverModal.svelte'
  import Menu from '$lib/components/Menu.svelte'

  export let path: string

  $: isInert = Boolean($shownModal) ? true : null

  $: if ($gameIsOver) {
    setTimeout(() => {
      shownModal.set(GameOverModal)
    }, 1200)
  }
</script>


<div class="layout">
  <SkipToContentLink />
  
  {#if $shownModal}
    <Modal>
      <svelte:component this={$shownModal} />
    </Modal>
  {/if}
  
  <main inert={isInert} id="#main" tabindex="-1">
    {#key path}
    <div in:fade={{ delay: 600, duration: 400 }} out:fade={{ duration: 400 }}>
      <slot />
    </div>
    {/key}
  </main>

  <Menu />
</div>