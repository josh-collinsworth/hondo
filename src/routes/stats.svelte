<script lang="ts">
import { LONGEST_STREAK_STORAGE_KEY } from '$lib/js/constants'
import { totalGamesPlayed, totalPointsScored, highScore, fastestHondo, totalGuessesUsed } from '$lib/state/getters'
import { gameHistory } from '$lib/state/game'
import { loadFromLocalStorage, floatFormatter } from '$lib/js/helpers'
import Loader from '$lib/components/game/Loader.svelte'
import MenuButton from '$lib/components/MenuButton.svelte'
import { onMount } from 'svelte'

let localIsLoading = true
let medianScore: number
let medianGuesses: number
let longestStreak: number

$: averageScore = floatFormatter.format($totalPointsScored / $totalGamesPlayed)
$: averageGuesses = floatFormatter.format($totalGuessesUsed / $totalGamesPlayed)
 

onMount(() => {
  const loadedLongestStreak = loadFromLocalStorage(LONGEST_STREAK_STORAGE_KEY)
  longestStreak = loadedLongestStreak || 0

  let medianScoreTally = $gameHistory.map(score => score[0]).sort((a, b) => a - b)
  let medianGuessesTally = $gameHistory.map(score => score[1]).sort((a, b) => a - b)
  
  while (medianScoreTally.length > 1) {
    console.log(medianScoreTally)
    if (medianScoreTally.length === 2) {
      medianScoreTally.pop()
    }
    else {
      medianScoreTally.pop()
      medianScoreTally.shift()
    }
  }
  while (medianGuessesTally.length > 1) {
    if (medianGuessesTally.length === 2) {
      medianGuessesTally.pop()
    }
    else {
      medianGuessesTally.pop()
      medianGuessesTally.shift()
    }
  }
  medianScore = medianScoreTally[0]
  medianGuesses= medianGuessesTally[0]

  localIsLoading = false
})
</script>


<div class="stats display-flex center-content">
  <MenuButton />
  <h1>Game stats</h1>

  {#if localIsLoading}
    <Loader />
  {:else if $totalGamesPlayed}
    <ul class="no-bullets">
      <li>
        <h2>Highest score</h2>
        <p>{$highScore}</p>
      </li>
      <li>
        <h2>Fastest Hondo</h2>
          {#if $fastestHondo}
        <p>{$fastestHondo} attempts</p>
        {:else}
          <p>You haven't scored a Hondo yet. Keep&nbsp;trying!</p>
        {/if}
      </li>
      <li>
        <h2>Longest streak</h2>
        <p>{longestStreak}</p>
      </li>
      <li>
        <h2>Total points scored</h2>
        <p>{$totalPointsScored}</p>
      </li>
      <li>
        <h2>Average score</h2>
        <p>{averageScore} in {averageGuesses} guesses</p>
      </li>
      <li>
        <h2>Median score</h2>
        {#if medianScore && medianGuesses}
          <p>{medianScore} in {medianGuesses} guesses</p>
        {:else}
          <p>Not enough data yet</p>
        {/if}
      </li>
    </ul>
  {:else}
    <h2>You don't have any stats yet.</h2>

    <p>Finish at least one game of Hondo, then check back.</p>
  {/if}
</div>


<style lang="scss">
.stats {
  padding: 2rem;

  > * {
    width: 100%;
  }

  h1 {
    margin-top: 0;
  }

  h2 {
    margin: 3rem auto 0;
    font-size: 1rem;
    border-bottom: 1px solid currentColor;
    max-width: max-content;
    text-align: center;
  }

  :global(.menu-button) {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
}
</style>