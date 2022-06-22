<script lang="ts">
import { isMenuOpen } from '$lib/state/global'

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
  height: auto;
  flex-wrap: wrap;

  .hamburger__bar {
    content: '';
    width: 100%;
    height: 0;
    border-bottom: 2px solid var(--darkBlue);
    display: block;

    + .hamburger__bar {
      margin-top: 3px;
    }

    .dark & {
      border-color: var(--lightBlue);
    }
  }
}
</style>