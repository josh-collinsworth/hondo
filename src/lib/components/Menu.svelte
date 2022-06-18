<script lang="ts">
  import { isMenuOpen } from '$lib/js/state'
  import { startNewGame, toggleMenuOpen } from '$lib/js/mutations'

  import DarkModeToggle from './DarkModeToggle.svelte'
  import CloseMenuButton from './CloseMenuButton.svelte'

  import { tick } from 'svelte'
  import { fly, fade } from 'svelte/transition'
  import { quintIn, quintOut } from 'svelte/easing'
  import { goto } from '$app/navigation'

  export let currentPage: string

  let navMenu: HTMLElement

  const handleReturnToGame = (): void => {
    console.log(currentPage, currentPage === '/')
    if (currentPage !== '/') {
      goto('/')
    }
    toggleMenuOpen()
  }

  const abandonGame = (): void => {
    const confirmation = confirm('Start a new game? This will delete any game currently in progress.')
    if (!confirmation)  return
    startNewGame()
    toggleMenuOpen()
  }

  isMenuOpen.subscribe(async (isOpen) => {
    if (isOpen) {
      await tick()
      navMenu.focus()
    }
  })
</script>


{#if $isMenuOpen}
  <div class="menu-background"
    on:click={toggleMenuOpen}
    in:fade={{ duration: 240, easing: quintOut }}
    out:fade={{ duration: 240, easing: quintIn }}
  />
  <aside
    class="menu"
    class:open={$isMenuOpen}
    in:fly={{ x: 120, duration: 240, easing: quintOut }}
    out:fly={{ x: 120, duration: 240, easing: quintIn }}
  >
    <nav tabindex="-1" bind:this={navMenu}>
      <ul class="menu__links">
        <li>
          <a href="how-to-play" on:click={toggleMenuOpen}>
            How to play
          </a>
        </li>
        <li>
          <a href="/stats" on:click={toggleMenuOpen}>
            Stats
          </a>
        </li>
        <li>
          <a href="/" on:click|preventDefault={handleReturnToGame}>
            Return to game
          </a>
        </li>
        <li>
          <a href="/" on:click|preventDefault={abandonGame}>
            Start new game
          </a>
        </li>
      </ul>
    </nav>
    <div class="display-flex button-bar">
      <DarkModeToggle />
      <CloseMenuButton />
    </div>
  </aside>
{/if}



<style lang="scss">
  .menu-background {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(var(--paperRGB), 0.8);
    z-index: 10;
  }

  .menu {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    max-width: 28rem;
    min-height: 100vh;
    padding: 1rem;
    transition: transform 0.3s cubic-bezier(0.23, 1, 0.320, 1);
    background: var(--darkBlue);
    color: var(--white);
    z-index: 10;

    :global(*:focus) {
      outline-color: var(--lightBlue);
    }

    .button-bar {
      position: absolute;
      top: 1rem;
      right: 1rem;
      gap: 1rem;
      justify-content: right;
    }

    .menu__links {
      margin-top: 4rem;

      li {
        animation: zoom_in_left 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
        opacity: 0;

        @for $i from 1 through 5 {
          &:nth-of-type(#{$i}) {
            animation-delay: $i * 0.07s;
          }
        } 
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