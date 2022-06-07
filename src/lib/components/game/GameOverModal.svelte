<script lang="ts">
  import { GAME_DATA_STORAGE_KEY, PREVIOUS_HIGH_SCORES_STORAGE_KEY } from '$lib/js/constants';

  import { save, load, numberFormatter } from '$lib/js/helpers'
  import { runningScore, codeWord, usedAttempts } from '$lib/js/state'
  
  import { fly } from 'svelte/transition'
  import { onMount } from 'svelte'

  const startNewGame = (): void => {
    save(GAME_DATA_STORAGE_KEY, null)
    window.location.reload()
  }

  const endgameMessages: string[] = [
    `Good try!`,
    `Solid run!`,
    `Nice attempt!`,
    `Great game!`,
    `Impressive score!`,
    `WOW! Great playing!`,
    `EXCELLENT job!`,
    `AWESOME score!`,
    `OUTSTANDING! That was elite!`,
    `SO CLOSE! Keep trying!`,
    `AMAZING! You scored a HONDO!`,
  ]

  let endgameMessage: string
  $: endgameMessage = endgameMessages[Math.floor($runningScore / 10)]

  let highScore: number
  let fastestScore: number
  let averageScore: number|string

  onMount(() => {
    const previousHighScores = load(PREVIOUS_HIGH_SCORES_STORAGE_KEY) || [[0, 0]]

    highScore = Math.max(...previousHighScores.map(score => score[0]))
    fastestScore = Math.min(...previousHighScores.filter(score => score[0] === highScore).map(score => score[1]))
    averageScore = numberFormatter.format(
      previousHighScores.map(score => score[0]).reduce((p, c) => p + c, 0) / previousHighScores.length
    )
  })
</script>


<div class="modal" in:fly={{ delay: 1500, duration: 1000 }}>
  <h2>Final score: <span class="sr">{$runningScore}</span></h2>

  <div aria-hidden="true" class="final-score display-flex center-content">
    {$runningScore}
  </div>

  <p>{endgameMessage}</p>
  
  <h3>Stats:</h3>
  <ul>
    {#if $runningScore < 100}
      <li>You lost on <b>{$codeWord.toUpperCase()}</b></li>
    {/if}
    
    <li>You used <b>{$usedAttempts} attempts</b></li>
    <li class="space-above"><b>Best score:</b> {highScore} in {fastestScore} attempts.</li>
    <li><b>Average score:</b> {averageScore}</li>
  </ul>

  <button on:click={startNewGame}>
    Play again!
  </button>

  <footer>
    <a href="https://ko-fi.com/collinsworth">Buy me a coffee if you're enjoying this game</a>
  </footer>
</div>


<style lang="scss">
  .modal {
    font-size: 1.2rem;
    position: fixed;
    width: calc(100vw - 2rem);
    height: calc(100vh - 2rem);
    height: calc(100dvh - 2rem);
    top: 1rem;
    left: 1rem;
    border: 1px solid currentColor;
    background: lighten(#7ba7bc, 15%);
    display: flex;
    justify-content: center;
    align-content: center;
    text-align: center;
    flex-wrap: wrap;
    z-index: 10;
    overflow: auto;

    > * {
      width: 100%;
    }

    .final-score {
      font-size: 3rem;
      font-weight: bold;
      width: 2em;
      height: 2em;
      line-height: 2em;
      border: .1em solid currentColor;
      border-radius: 2em;
      background: var(--secondary);
    }

    button {
      font: inherit;
      padding: 0.5em 1em;
      width: max-content;
      border: 2px solid var(--darkAccent);
      border-radius: 0.25rem;
      margin: 2rem 0;
    }

    h3 {
      margin-bottom: 1rem;
    }

    ul {
      margin-top: 0;
      list-style-type: none;
      padding: 0;
    }

    .space-above {
      margin-top: 1rem;
    }

    footer {
      font-size: 0.9rem;

      a {
        color: var(--darkBlue);
      }
    }
  }
</style>