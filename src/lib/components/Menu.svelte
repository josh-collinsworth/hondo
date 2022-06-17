<script lang="ts">
  import { GAME_DATA_STORAGE_KEY } from '$lib/js/constants';
  import { isMenuOpen } from '$lib/js/state'
  import Arrow from './icon/Arrow.svelte'
  import { save } from '$lib/js/helpers';

  const closeMenu = () => $isMenuOpen = !$isMenuOpen
  
  const toggleDarkMode = () => {
    const root = document.documentElement
    if (root.classList.contains('dark')) {
      root.classList.remove('dark')
    } else {
      root.classList.add('dark')
    }
    closeMenu()
  }

  const abandonGame = (): void => {
    const confirmation = confirm('Delete this game and start a new one?')
    if (confirmation) {
      save(GAME_DATA_STORAGE_KEY, null)
      window.location.reload()
    }
  }

  $: tabindex = $isMenuOpen ? 0 : -1
</script>


<aside id="menu" {tabindex} class:open={$isMenuOpen}>
  <div class="display-flex button-bar">
    <button on:click={toggleDarkMode} class="info-button">
      🌙
    </button>
    <button on:click={closeMenu} class="info-button">
      <Arrow direction="right" />
      <span class="sr">Close menu</span>
    </button>
  </div>
  <nav>
    <ul>
      <li>
        <a href="how-to-play" on:click={closeMenu}>
          How to play
        </a>
      </li>
      <li>
        <a href="/stats" on:click={closeMenu}>
          Stats
        </a>
      </li>
      <li>
        <a href="/" on:click|preventDefault={abandonGame}>
          Abandon game
        </a>
      </li>
    </ul>
  </nav>
</aside>



<style lang="scss">
  #menu {
    position: absolute;
    top: 0;
    right: -100%;
    width: 100%;
    max-width: 24rem;
    min-height: 100vh;
    padding: 1rem;
    transform: translateX(0);
    transition: transform 0.3s cubic-bezier(0.23, 1, 0.320, 1);
    background: var(--darkBlue);
    color: var(--white);
    z-index: 10;

    &.open {
      transform: translateX(-100%);
    }

    @media (min-width: 24rem) {
      right: -24rem;
      
      .open {
        transform: translateX(-24rem);
      }
    }

    .button-bar {
      margin-bottom: 2rem;
      gap: 1rem;
      justify-content: right;
    }

    .info-button {
      padding: 0;
      border-color: var(--white);
      background: var(--darkBlue);

      :global(svg) {
        stroke: var(--white);
      }
    }

    li {
      margin-bottom: 1.5em;
    }

    a {
      color: var(--white);
      font-size: 1.2rem;
    }
  }
</style>