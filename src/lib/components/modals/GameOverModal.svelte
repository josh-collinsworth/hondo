<script lang="ts">
import { runningScore, codeWord, usedAttempts, bonusPointsScored } from '$lib/state/game'
import { shownModal } from '$lib/state/global'
import { closeModal, startNewGame } from '$lib/state/mutations'

const lostWord = $codeWord.toUpperCase()

const handleStartNewGame = (): void => {
  startNewGame()
  $shownModal = null
}
</script>


<div class="game-over-modal">
  <h2>Final score: {$runningScore}</h2>

  <ul>
    {#if $runningScore < 100}
      <li>You lost on <b>{lostWord}</b></li>
    {:else if $usedAttempts === 14}
      <li><strong>AMAZING!</strong> A PERFECT GAME! <span aria-hidden="true">🎉💯🎉</span></li>
    {:else if $usedAttempts < 14}
      <li><strong>Ok, you clearly cheated.</strong></li>
    {:else}
      <li><strong>Congrats!</strong> You scored a Hondo! <span aria-hidden="true">💯</span></li>
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
    <a href="https://ko-fi.com/collinsworth">
      <img src="/ko-fi.png" alt="">
      <span class="">
        Support me on Ko-Fi
      </span>
    </a>
  </footer>
</div>


<style lang="scss">
.game-over-modal {
  h2 {
    margin-bottom: 3rem;
  }

  ul {
    margin: 0 0 3rem;
    list-style-type: none;
    padding: 0;

    li + li {
      margin-top: 0.5rem;
    }
  }

  footer {
    margin-top: 2rem;
    margin-bottom: -1rem;
    font-size: 0.875rem;

    a {
      display: flex;
      align-items: center;
    }

    img {
      max-width: 2rem;
      margin-right: 0.5em;
      margin-left: -0.375em;
    }
  }
}
</style>