<script lang="ts">
import { closeModal } from '$lib/state/mutations'
import { fly, fade } from 'svelte/transition'
import { cubicIn, cubicOut, } from 'svelte/easing'
import { onMount } from 'svelte'

const duration = 320
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
    in:fly={{y: 36, duration, easing: cubicOut}}
    out:fly={{y: -36, duration, easing: cubicIn}}
  >
    <slot />
  </div>
</div>