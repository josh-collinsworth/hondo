<script lang="ts">
import { GAME_HISTORY_STORAGE_KEY } from '$lib/js/constants'
import { loadFromLocalStorage } from '$lib/js/helpers'
import { runningScore, codeWord, usedAttempts, gameIsOver } from '$lib/state/game'
import { shownModal } from '$lib/state/global'
import { startNewGame } from '$lib/state/mutations'
import { onMount } from 'svelte'

const handleStartNewGame = (): void => {
  startNewGame()
  $shownModal = null
}

onMount(() => {
  const gameHistory = loadFromLocalStorage(GAME_HISTORY_STORAGE_KEY)
})
</script>


<div class="page">
  {#if $gameIsOver}
    <h2>Final score: {$runningScore}</h2>

    <ul>
      {#if $runningScore < 100}
        <li>You lost on <b>{$codeWord.toUpperCase()}</b></li>
      {/if}
      
      <li>You used <b>{$usedAttempts} attempts</b></li>
    </ul>

    <div class="button-bar">
      <button on:click={handleStartNewGame} class="button confirm">
        Play again!
      </button>
    </div>
      
    <footer>
      <a href="https://ko-fi.com/collinsworth">Buy me a coffee if you're enjoying this game</a>
    </footer>
  {:else}
    <h2>Whoops, you seem a little lost.</h2>

    <div>
      <a href="/" class="button">Back to game</a>
    </div>
  {/if}
</div>


<style lang="scss">
.page {
  width: 100%;
  max-width: 32rem;
  padding: 24px;

  ul {
    margin-top: 0;
    list-style-type: none;
    padding: 0;
  }

  footer {
    font-size: 0.9rem;
    margin-top: 2rem;

    a {
      color: var(--darkBlue);
    }
  }

  .unlock {
    padding: 1rem;
    background: var(--primary);
    border-radius: 0.25rem;
  }
}
</style>