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


<svelte:head>
  <title>Hondo</title>
  <meta name="description" content="Hondo - guess 100 words">
  <meta name="author" content="Josh Collinsworth">
  <link rel="manifest" href="manifest.json" />
</svelte:head>


<SkipToContentLink />

{#if $shownModal}
  <Modal>
    <svelte:component this={$shownModal} />
  </Modal>
{/if}

<main inert={$shownModal} id="#main" tabindex="-1">
  {#key path}
    <div in:fade={{ delay: 600, duration: 200 }} out:fade={{ duration: 200 }}>
      <slot />
    </div>
  {/key}
</main>