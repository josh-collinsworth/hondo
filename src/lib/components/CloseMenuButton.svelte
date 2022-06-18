<script lang="ts">
  import Arrow from './icon/Arrow.svelte'
  import { toggleMenuOpen } from '$lib/js/mutations'
</script>


<button on:click={toggleMenuOpen} class="info-button">
  <Arrow direction="right" />
  <span class="sr">Close menu</span>
</button>


<style lang="scss">
  .info-button {
    padding: 0;
    border-color: var(--white);
    background: var(--darkBlue);

    :global(svg) {
      stroke: var(--white);
    }
  }
</style>