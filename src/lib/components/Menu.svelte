<script lang="ts">
  import { isMenuOpen } from '$lib/js/state'
  import { startNewGame, toggleMenuOpen } from '$lib/js/mutations'

  import DarkModeToggle from './DarkModeToggle.svelte'
  import CloseMenuButton from './CloseMenuButton.svelte'
  import QuestionBlock from './icon/QuestionBlock.svelte'
  import StatsBlock from './icon/StatsBlock.svelte'
  import BackBlock from './icon/BackBlock.svelte'
  import ExclamationBlock from './icon/ExclamationBlock.svelte'
  import Logo from './icon/Logo.svelte'

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

  const listenForClose = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
      toggleMenuOpen()
    }
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


<svelte:window on:keyup={listenForClose} />


{#if $isMenuOpen}
  <div
    class="menu-background"
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
      <ul class="menu__links" aria-labelledby="menu-heading">
        <li>
          <a href="how-to-play" on:click={toggleMenuOpen}>
            <span aria-hidden="true">
              <QuestionBlock />
            </span>
            How to play
          </a>
        </li>
        <li>
          <a href="/stats" on:click={toggleMenuOpen}>
            <span aria-hidden="true">
              <StatsBlock />
            </span>
            Stats
          </a>
        </li>
        <li>
          <a href="/" on:click|preventDefault={handleReturnToGame}>
            <span aria-hidden="true">
              <BackBlock />
            </span>
            Return to game
          </a>
        </li>
        <li>
          <a href="/" on:click|preventDefault={abandonGame}>
            <span aria-hidden="true">
              <ExclamationBlock />
            </span>
            Start new game
          </a>
        </li>
      </ul>
    </nav>
    <div class="display-flex button-bar">
      <div class="button-bar__logo display-flex center-content">
        <a href="/" on:click|preventDefault={handleReturnToGame} class="display-flex center-content">
          <Logo />
        </a>
      </div>
      <div class="button-bar__buttons display-flex center-content">
        <DarkModeToggle />
        <CloseMenuButton />
      </div>
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
    background: rgba(var(--paperRGB), 0.9);
    z-index: 10;
  }

  .menu {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    max-width: 28rem;
    min-height: 100vh;
    padding: 24px;
    transition: transform 0.3s cubic-bezier(0.23, 1, 0.320, 1);
    background: transparent;
    color: var(--ink);
    z-index: 10;

    :global(*:focus-within) {
      outline-color: var(--lightBlue);
    }

    .button-bar {
      position: absolute;
      top: 24px;
      right: 24px;
      gap: 1rem;
      justify-content: space-between;
      width: calc(100% - 48px);

      .button-bar__logo {
        width: 12rem;
      }

      .button-bar__buttons {
        gap: 0.5rem;
      }
    }

    .menu__links {
      margin-top: 6rem;
      padding-left: 0;
      list-style-type: none;

      li {
        animation: zoom_in_left 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
        opacity: 0;

        @for $i from 1 through 5 {
          &:nth-of-type(#{$i}) {
            animation-delay: $i * 0.07s;
          }
        } 

        a {
          text-decoration: none;
          display: flex;
          align-items: center;

          span {
            width: 1.5em;
            margin-right: 0.75em;
            height: 100%;
            line-height: 1;
          }
        }
      }
    }

    li {
      margin-bottom: 1.5em;
    }

    a {
      color: inherit;
      font-size: 1.2rem;
    }
  }
</style>