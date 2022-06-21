<script lang="ts">
  import { PREVIOUS_HIGH_SCORES_STORAGE_KEY } from '$lib/js/constants'

  import { load, floatFormatter } from '$lib/js/helpers'
  import { runningScore, codeWord, usedAttempts } from '$lib/state/game'
  import { shownModal } from '$lib/state/global'
  import { startNewGame } from '$lib/state/mutations'
  
  import { onMount } from 'svelte'

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

  const handleStartNewGame = (): void => {
    startNewGame()
    $shownModal = null
  }

  onMount(() => {
    const previousHighScores = load(PREVIOUS_HIGH_SCORES_STORAGE_KEY) || [[0, 0]]

    highScore = Math.max(...previousHighScores.map(score => score[0]))
    fastestScore = Math.min(...previousHighScores.filter(score => score[0] === highScore).map(score => score[1]))
    averageScore = floatFormatter.format(
      previousHighScores.map(score => score[0]).reduce((p, c) => p + c, 0) / previousHighScores.length
    )
  })
</script>


<h2>Final score: {$runningScore}</h2>

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

<button on:click={handleStartNewGame} class="confirm">
  Play again!
</button>

<footer>
  <a href="https://ko-fi.com/collinsworth">Buy me a coffee if you're enjoying this game</a>
</footer>


<style lang="scss">
  h2 {
    margin-bottom: 0;

    + p {
      margin: 0 0 3rem;
    }
  }

  h3 {
    margin-bottom: 1rem;
  }

  ul {
    margin-top: 0;
    list-style-type: none;
    padding: 0;
  }
  
  button {
    margin-top: 1rem;
  }

  footer {
    font-size: 0.9rem;
    margin-top: 2rem;

    a {
      color: var(--darkBlue);
    }
  }
</style>