<script lang="ts">
  import { runningScore, codeWord } from "$lib/js/state"
  import { fly } from 'svelte/transition'
</script>


<div class="modal" in:fly={{ delay: 1500, duration: 1000 }}>
  <h2>Game Over</h2>

  <p>
    <strong>You guessed { $runningScore } word{$runningScore === 1 ? '' : 's'}!</strong>
  </p>

  <p>You lost on {$codeWord.toUpperCase()}</p>

  <p>Play again?</p>

  <button on:click={() => window.location.reload()}>
    Play!
  </button>
</div>


<style lang="scss">
  .modal {
    font-size: 1.5rem;
    position: fixed;
    width: calc(100vw - 2rem);
    height: calc(100vh - 2rem);
    height: calc(100dvh - 2rem);
    top: 1rem;
    left: 1rem;
    border: 1px solid currentColor;
    background: var(--lightBlue);
    display: flex;
    justify-content: center;
    align-content: center;
    text-align: center;
    flex-wrap: wrap;
    z-index: 10;

    > * {
      width: 100%;
    }

    button {
      font: inherit;
      padding: 0.5em 1em;
      width: max-content;
    }
  }
</style>