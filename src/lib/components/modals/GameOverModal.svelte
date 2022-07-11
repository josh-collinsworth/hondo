<script lang="ts">
import { runningScore, codeWord, usedAttempts, bonusPointsScored } from '$lib/state/game'
import { shownModal } from '$lib/state/global'
import { closeModal, startNewGame } from '$lib/state/mutations'

const handleStartNewGame = (): void => {
  startNewGame()
  $shownModal = null
}
</script>


<div class="game-over-modal">
  <h2>Final score: {$runningScore}</h2>

  <ul>
    {#if $runningScore < 100}
      <li>You lost on <b>{$codeWord.toUpperCase()}</b></li>
    {:else}
      <li><strong>Congrats!</strong> You scored a Hondo!</li>
    {/if}
    
    <li>You used <b>{$usedAttempts} turns</b> total.</li>
    <li><b>{$bonusPointsScored}</b> of your <b>{$runningScore}</b> points were bonus points.</li>
  </ul>

  <div class="button-bar">
    <a href="/stats" class="button" on:click={closeModal}>
      Stats
    </a>
    <button on:click={handleStartNewGame} class="button confirm">
      Play again!
    </button>
  </div>
    
  <footer>
    <a href="https://ko-fi.com/collinsworth">Buy me a coffee if you're enjoying this game</a>
  </footer>
</div>


<style lang="scss">
.game-over-modal {

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
}
</style>