<script lang="ts">
import { GAME_DATA_STORAGE_KEY } from '$lib/js/constants'
import { loadFromLocalStorage } from '$lib/js/helpers'
import { startNewGame } from '$lib/state/mutations'
import { totalGamesPlayed } from '$lib/state/getters'
import { onMount } from 'svelte'
import { goto } from '$app/navigation'
import Logo from '$lib/components/icon/Logo.svelte'
import Loader from '$lib/components/game/Loader.svelte'
import PlayBlock from '$lib/components/icon/blocks/PlayBlock.svelte'
import StatsBlock from '$lib/components/icon/blocks/StatsBlock.svelte'
import ExclamationBlock from '$lib/components/icon/blocks/ExclamationBlock.svelte'
import HBlock from '$lib/components/icon/blocks/HBlock.svelte'
import QuestionBlock from '$lib/components/icon/blocks/QuestionBlock.svelte'
import DarkModeToggle from '$lib/components/DarkModeToggle.svelte'
import Padlock from '$lib/components/icon/Padlock.svelte'

let localIsLoading = true
let savedGame = false
let gameLocation = (savedGame || !$totalGamesPlayed) ? '/game' : '/powerups'

$: buttonText = savedGame ? 'Continue playing' : 'New game'

const abandonGame = (): void => {
  const confirmation = confirm('Start a new game? This will delete any game currently in progress.')
  if (!confirmation)  return
  startNewGame()
  goto('/game')
}

onMount(() => {
  const savedGameData = loadFromLocalStorage(GAME_DATA_STORAGE_KEY)

  if (savedGameData) {
    savedGame = true
  }

  localIsLoading = false
})
</script>

<div class="container">
  {#if localIsLoading}
    <Loader />
  {:else}
    <div class="menu-button">
      <DarkModeToggle />
    </div>

    <div class="logo">
      <Logo />
    </div>
    <p class="small-print">A game in 100 words or fewer.</p>


    <nav>
      <ul class="main-nav__links" aria-labelledby="menu-heading">
        <li>
          <a href="{gameLocation}">
            <span class="link__icon" aria-hidden="true">
              <PlayBlock />
            </span>
            {buttonText}
          </a>
        </li>
        <li>
          <a href="/tutorial/1">
            <span class="link__icon" aria-hidden="true">
              <HBlock />
            </span>
            How to play
          </a>
        </li>
        <!-- {#if $totalGamesPlayed}
          <li>
            <a href="/powerups">
              <span class="link__icon" aria-hidden="true">
                <ExclamationBlock  />
              </span>
              Powerups
            </a>
          </li>
        {:else}
          <li class="disabled">
            <span class="link__icon" aria-hidden="true">
              <Padlock />
            </span>
            Powerups
          </li>
        {/if} -->
        <li>
          <a href="/stats">
            <span class="link__icon" aria-hidden="true">
              <StatsBlock />
            </span>
            Stats
          </a>
        </li>
        <li>
          <a href="/faq">
            <span class="link__icon" aria-hidden="true">
              <QuestionBlock />
            </span>
            FAQ
          </a>
        </li>
      </ul>
    </nav>
  {/if}
</div>


<style lang="scss">
.container {
  min-height: 100vh;
  justify-content: start;

  .menu-button {
    position: fixed;
    top: 24px;
    right: 24px;
    width: max-content;
    background: var(--paper);
  }

  .logo {
    display: flex;
    height: 2.75rem;
    max-width: max-content;
  }
}

.main-nav__links {
  margin-top: 4rem;
  padding-left: 0;
  list-style-type: none;

  li {
    margin-bottom: 1em;
    height: 1.75em;
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    width: max-content;

    &.disabled {
      color: var(--lighterGray);
    }

    .link__icon {
      width: 1.5em;
      margin-right: 0.75em;
      height: inherit;
      line-height: 1;
    }

    a {
      text-decoration: none;
      display: flex;
      align-items: center;
      color: inherit;
      height: inherit;
    }
  }
}
</style>