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

  export let path: string

  $: if ($gameIsOver) {
    setTimeout(() => {
      shownModal.set(GameOverModal)
    }, 1200)
  }
</script>


<SkipToContentLink />

{#if $shownModal}
  <Modal>
    <svelte:component this={$shownModal} />
  </Modal>
{/if}

<main inert={$shownModal} id="#main" tabindex="-1">
  {#key path}
    <div in:fade={{ delay: 700, duration: 350 }} out:fade={{ duration: 350 }}>
      <slot />
    </div>
  {/key}
</main>