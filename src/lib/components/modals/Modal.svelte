<script lang="ts">
  import { closeModal } from '$lib/js/mutations'
  import { fly, fade } from 'svelte/transition'
  import { quadIn, quadOut, } from 'svelte/easing'
  import { onMount } from 'svelte'

  const duration = 240
  let modalCard: HTMLDivElement

  const listenForClose = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
      closeModal()
    }
  }

  onMount(() => {
    modalCard.focus()
  })
</script>


<svelte:window on:keyup={listenForClose} />


<div id="modal-background" transition:fade={{ duration }} on:click|self={closeModal}>
  <div
    id=modal-card
    tabindex="-1"
    bind:this={modalCard}
    in:fly={{y: 36, duration, easing: quadOut}}
    out:fly={{y: -36, duration, easing: quadIn}}
  >
    <slot />
  </div>
</div>