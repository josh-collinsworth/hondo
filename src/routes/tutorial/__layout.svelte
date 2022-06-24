<script lang="ts" context="module">
import type { LoadOutput } from '@sveltejs/kit'

export const load = async ({ url }): Promise<LoadOutput> => {
  const path: string = url.pathname.replace('/tutorial/', '')

  return {
    props: {
      path
    }
  }
}
</script>


<script lang="ts">
import { TOTAL_TUTORIAL_PAGES } from '$lib/js/constants'
import { onMount } from 'svelte';
import { hasViewedTutorial } from '$lib/state/global'

export let path: string

$: next = Number(path) < TOTAL_TUTORIAL_PAGES ? `/tutorial/${Number(path) + 1}` : '/game'
$: previous = Number(path) - 1 || null

onMount(() => $hasViewedTutorial = true)
</script>


<div class="tutorial">
  <div class="tutorial-container">
    <slot />

    <div class="button-bar">
      {#if previous}
        <a href="/tutorial/{previous}" class="button">Back</a>
      {:else}
        <a href="/game" class="button">Skip tutorial</a>
      {/if}
      <a href={next} class="button confirm">Next</a>
    </div>
  </div>
</div>


<style lang="scss" global>
.tutorial {
  .tutorial-container {
    width: 32rem;
    max-width: 100%;
    padding: 24px;
    margin: 0 auto;
  }

  .example-diagram {
    display: grid;
    width: 100%;
    max-width: 100%;
    grid-template-columns: 100%;
    gap: 0.75rem;
    margin-top: 1rem;
    padding: 2rem 1.5rem;
    border: 2px solid var(--lighterAccent);
    border-radius: 0.5rem;
  }

  .example-score {
    position: absolute;
    right: -2em;
    font-size: 1.5rem;
    font-weight: var(--fontWeightBold);
  }

  .small-print {
    margin: 0.5rem 0 0;
    text-align: center;
  }

  .button-bar {
    margin: 2rem 0;
    display: flex;
    justify-content: space-between;

    a {
      @extend button !optional;
    }
  }

  h2 {
    font-size: 1.6rem;
    font-weight: var(--fontWeightNormal);
  }
}
</style>