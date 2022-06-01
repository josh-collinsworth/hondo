<script lang="ts">
  import { message } from '$lib/js/state'
  import { cubicOut } from 'svelte/easing'
  import { fly } from 'svelte/transition'

  const defaultTransition = { y: 16, easing: cubicOut, duration: 300 }

  $: if ($message) {
    setTimeout(() => {
      message.set('')
    }, 2000)
  }
</script>


{#if $message}
  <div class="toast center-content display-flex" transition:fly={defaultTransition}>
    <div class="toast-message sss">
      {$message}
    </div>
  </div>
{/if}


<style lang="scss">
  .toast {
    position: absolute;
    font-size: 1rem;
    text-align: center;
    padding: 0.5rem 1rem;
    background: var(--red);
    z-index: 3;
    color: var(--paper);
    border-radius: 0.2rem;
    top: -3.5rem;
    left: 1rem;
    width: calc(100% - 2rem);
  }
</style>