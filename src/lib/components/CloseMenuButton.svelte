<script lang="ts">
import XIcon from './icon/XIcon.svelte'
import { toggleMenuOpen } from '$lib/state/mutations'
</script>


<button on:click={toggleMenuOpen} class="info-button">
  <XIcon />
  <span class="sr">Close menu</span>
</button>


<style lang="scss">
.info-button {
  padding: 0;
}
</style>