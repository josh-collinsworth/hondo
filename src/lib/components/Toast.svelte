<script lang="ts">
import { toast } from '$lib/state/global'
import { cubicOut } from 'svelte/easing'
import { fly } from 'svelte/transition'

const defaultTransition = { y: 16, easing: cubicOut, duration: 300 }

$: if ($toast.message) {
  setTimeout(() => {
    $toast = { ...$toast, message: '' }
  }, 3000)
}
</script>


{#if $toast.message}
  <div
    class="toast center-content display-flex {$toast.type}"
    in:fly={{ ...defaultTransition }}
    out:fly={{ ...defaultTransition, y: -16}}
  >
    <div class="toast-message">
      {$toast.message}
    </div>
  </div>
{/if}


<style lang="scss">
.toast {
  position: absolute;
  font-size: 1rem;
  text-align: center;
  padding: 0.5rem 1rem;
  z-index: 6;
  color: var(--white);
  border-radius: 0.5rem;
  top: 5.75rem;
  left: 0;
  width: 100%;

  &.warning {
    background: var(--red);
  }

  &.notice {
    background: var(--primary);
  }

  &.success {
    color: var(--primary);
    background: var(--paper);
    border: 2px solid var(--primary);
  }
}
</style>