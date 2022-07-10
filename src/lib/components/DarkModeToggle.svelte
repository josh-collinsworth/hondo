<script lang="ts">
import { isDarkMode } from '$lib/state/user'
import { toggleDarkMode } from '$lib/state/mutations'
import LightDarkIcon from './icon/LightDarkIcon.svelte'
import { onMount } from 'svelte'

onMount(() => {
  if (document.documentElement.classList.contains('dark')) {
    $isDarkMode = true
  }
})
</script>

<button on:click={toggleDarkMode} class="info-button" aria-pressed={$isDarkMode}>
  <div class="light-dark-icon" aria-hidden="true">
    <LightDarkIcon />
  </div>
  <span class="sr">Toggle dark mode</span>
</button>


<style lang="scss">
.info-button {
  padding: 0;
  overflow: hidden;
  align-items: flex-start;

  :global(svg) {
    stroke: currentColor;
    stroke-width: 0.65em;
  }

  .light-dark-icon {
    transform: translateY(0);
    width: 100%;
    height: 200%;
    transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  &[aria-pressed=true] .light-dark-icon {
    transform: translateY(-50%);
  }
}
</style>