<script lang="ts">
import Logo from '$lib/components/icon/Logo.svelte'
import { GAME_DATA_STORAGE_KEY } from '$lib/js/constants'
import { loadFromLocalStorage } from '$lib/js/helpers'
import Loader from '$lib/components/game/Loader.svelte'
import { onMount } from 'svelte'
import MenuButton from '$lib/components/MenuButton.svelte'
import { startNewGame } from '$lib/state/mutations'
import { goto } from '$app/navigation'

let localIsLoading = true
let savedGame = false

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
      <MenuButton />
    </div>

    <div class="logo">
      <Logo />
    </div>

    <nav class="menu-buttons">
      <ul class="no-bullets">
        <li>
          <a href="/game" class="button confirm">
            {buttonText}
          </a>
        </li>
        
        {#if savedGame}
          <li>
            <a class="button" href="/game" on:click|preventDefault={abandonGame}>
              Start a new game
            </a>
          </li>
        {/if}

        <li>
          <a href="/tutorial/1" class="button">
            How to play
          </a>
        </li>
      </ul>
    </nav>
  {/if}
</div>


<style lang="scss">
.container {
  padding: 24px;
  max-width: 28rem;
  width: 100%;
  margin: auto;
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
    height: 2.5rem;
    margin-bottom: 4rem;
    max-width: max-content;
  }

  .menu-buttons {
    li + li {
      margin-top: 1rem;
    }

    .button {
      max-width: max-content;
    }
  }
}
</style>