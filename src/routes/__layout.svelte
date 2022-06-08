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

  export let path: string
</script>


<main>
  {#key path}
    <div in:fade={{ delay: 350, duration: 300 }} out:fade={{ duration: 300 }}>
      <slot />
    </div>
  {/key}
</main>