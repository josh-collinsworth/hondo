<script lang="ts">
  import { isMenuOpen } from '$lib/js/state'

  const toggleIsMenuOpen = (): void => {
    $isMenuOpen = !$isMenuOpen
  }
</script>

<button class="info-button menu" on:click={toggleIsMenuOpen}>
  <div class="hamburger display-flex align-center">
    <div class="hamburger__bar"></div>
    <div class="hamburger__bar"></div>
    <div class="hamburger__bar"></div>
  </div>
</button>


<style lang="scss">
  .menu {
    padding: 0;
  }

  .hamburger {
    width: 1.25rem;
    height: 1rem;
    flex-wrap: wrap;

    .hamburger__bar {
      content: '';
      width: 100%;
      height: 2px;
      background: var(--darkBlue);
      display: block;
    }
  }
</style>