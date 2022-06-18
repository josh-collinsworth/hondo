<script lang="ts">
  import { isMenuOpen } from '$lib/js/state'

  const toggleMenuOpen = (): void => {
    $isMenuOpen = !$isMenuOpen
  }
</script>

<button class="info-button menu-button" on:click={toggleMenuOpen}>
  <div class="hamburger display-flex align-center">
    <div class="hamburger__bar"></div>
    <div class="hamburger__bar"></div>
    <div class="hamburger__bar"></div>
  </div>
</button>


<style lang="scss">
  .menu-button {
    padding: 0;
  }

  .hamburger {
    width: 1.25rem;
    height: 1rem;
    flex-wrap: wrap;

    .hamburger__bar {
      content: '';
      width: 100%;
      height: 0px;
      border-bottom: 2px solid var(--darkBlue);
      display: block;

      .dark & {
        border-color: var(--lightBlue);
      }
    }
  }
</style>