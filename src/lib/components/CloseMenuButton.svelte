<script lang="ts">
  import XIcon from './icon/Xicon.svelte'
  import { toggleMenuOpen } from '$lib/js/mutations'
</script>


<button on:click={toggleMenuOpen} class="info-button">
  <XIcon />
  <span class="sr">Close menu</span>
</button>


<style lang="scss">
  .info-button {
    padding: 0;
    color: var(--white);
    border-color: currentColor;
    background: var(--darkBlue);
  }
</style>