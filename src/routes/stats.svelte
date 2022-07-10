<script lang="ts">
import { LONGEST_STREAK_STORAGE_KEY } from '$lib/js/constants'
import { totalGamesPlayed, totalPointsScored, highScore, fastestHondo, totalGuessesUsed, totalBonusPointsScored } from '$lib/state/getters'
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
$: bonusPointPercentage = floatFormatter.format(100 / $totalPointsScored * $totalBonusPointsScored)

onMount(() => {
  const loadedLongestStreak = loadFromLocalStorage(LONGEST_STREAK_STORAGE_KEY)
  longestStreak = loadedLongestStreak || 0

  let medianScoreTally = $gameHistory.map(score => score[0]).sort((a, b) => a - b)
  let medianGuessesTally = $gameHistory.map(score => score[1]).sort((a, b) => a - b)
  
  while (medianScoreTally.length > 1) {
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
  <MenuButton floating={true} />
  <h1>Game stats</h1>

  {#if localIsLoading}
    <Loader />
  {:else if $totalGamesPlayed}
    <ul class="no-bullets">
      <li>
        <b>Highest score</b>
        {$highScore}
      </li>
      <li>
        <b>Fastest Hondo</b>
          {#if $fastestHondo}
        {$fastestHondo} turns
        {:else}
          NA
        {/if}
      </li>
      <li>
        <b>Longest streak</b>
        {longestStreak}
      </li>
      <li>
        <b>Total points scored</b>
        {floatFormatter.format($totalPointsScored)}
      </li>
      <li>
        <b>Bonus points scored</b>
        {floatFormatter.format($totalBonusPointsScored)}
      </li>
      <li>
        <b>Bonus point percentage</b>
        {bonusPointPercentage}%
      </li>
      <li>
        <b>Average score</b>
        {averageScore} in {averageGuesses} turns
      </li>
      <li>
        <b>Median score</b>
        {#if medianScore && medianGuesses}
          {medianScore} in {medianGuesses} turns
        {:else}
          Not enough data yet
        {/if}
      </li>
    </ul>
  {:else}
    <b>You don't have any stats yet.</b>

    Finish at least one game of Hondo, then check back.
  {/if}
</div>


<style lang="scss">
.stats {
  padding: 24px;

  > * {
    width: 100%;
  }

  h1 {
    text-align: left;
    margin-top: 0;
  }

  p {
    margin: 0;
  }

  li {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 1rem 0;
    border-bottom: 1px solid var(--lightAccent);
    margin: 0;

    b {
      font-weight: var(--fontWeightSemiBold);
    }
  }
}
</style>