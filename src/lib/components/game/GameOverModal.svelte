<script lang="ts">
  import { runningScore } from "$lib/js/state"
  import { fly } from 'svelte/transition'
</script>


<div
  class="modal"
  in:fly={{ delay: 600, duration: 800 }}
>
  <h2>Game Over</h2>

  <p>Your score was { $runningScore }!</p>

  <p>Play again?</p>

  <button on:click={() => window.location.reload()}>
    Play!
  </button>
</div>


<style lang="scss">
  .modal {
    position: fixed;
    width: calc(100vw - 2rem);
    height: calc(100vh - 2rem);
    height: calc(100dvh - 2rem);
    top: 1rem;
    left: 1rem;
    border: 1px solid currentColor;
    background: #eee;
    display: flex;
    justify-content: center;
    align-content: center;
    text-align: center;
    flex-wrap: wrap;

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