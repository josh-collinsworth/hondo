<script lang="ts">
import { GAME_HISTORY_STORAGE_KEY, LONGEST_STREAK_STORAGE_KEY } from '$lib/js/constants'
import { totalGamesPlayed, totalPointsScored, highScore, fastestHondo, totalGuessesUsed, totalBonusPointsScored, totalHondos, totalShufflesUsed, totalSkipsUsed, perfectHondos } from '$lib/state/getters'
import { loadFromLocalStorage, floatFormatter } from '$lib/js/helpers'
import Loader from '$lib/components/game/Loader.svelte'
import MenuButton from '$lib/components/MenuButton.svelte'
import { onMount } from 'svelte'

let localIsLoading = true
let longestStreak: number

$: averageScore = floatFormatter.format($totalPointsScored / $totalGamesPlayed)
$: averageGuesses = floatFormatter.format($totalGuessesUsed / $totalGamesPlayed)
$: bonusPointPercentage = floatFormatter.format(100 / $totalPointsScored * $totalBonusPointsScored)

const clearData = (): void => {
  const confirmation = confirm(`This will permanently delete all your Hondo game history.\n\nAre you sure?`)

  if (!confirmation) return
  localStorage.removeItem(GAME_HISTORY_STORAGE_KEY)
  window.location.reload()
}

onMount(() => {
  const loadedLongestStreak = loadFromLocalStorage(LONGEST_STREAK_STORAGE_KEY)
  longestStreak = loadedLongestStreak || 0

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
        <b>Games played</b>
        {$totalGamesPlayed}
      </li>
      <li>
        <b>Highest score</b>
        {$highScore}
      </li>
      <li>
        <b>Total points scored</b>
        {floatFormatter.format($totalPointsScored)}
      </li>
      <li>
        <b>Longest streak</b>
        {longestStreak}
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
        {averageScore}
      </li>
      <li>
        <b>Average game length</b>
        {averageGuesses} turns
      </li>
      <li>
        <b>Shuffles used</b>
        {$totalShufflesUsed}
      </li>
      <li>
        <b>Skips used</b>
        {$totalSkipsUsed}
      </li>
      <li>
        <b>Total Hondos</b>
        {#if $totalHondos}
          {$totalHondos}
        {:else}
          NA
        {/if}
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
        <b>Hondo percentage</b>
        {#if $totalHondos}
        {floatFormatter.format(100 / $totalGamesPlayed * $totalHondos)}%
        {:else}
        NA
        {/if}
      </li>
      <li>
        <b>Perfect games</b>
        {$perfectHondos || 0}
      </li>
    </ul>
  {:else}
    <b>You don't have any stats yet.</b>

    Finish at least one game of Hondo, then check back.
  {/if}

  <div class="button-bar">
    <button on:click={clearData} class="warning">
      Erase all my game data
    </button>
    
    <a href="/" class="button">Back to game</a>
  </div>
</div>


<style lang="scss">
.stats {
  padding: 24px;
  width: 100%;
  max-width: 36rem;
  margin: 0 auto;

  h1 {
    text-align: left;
    margin-top: 0;
    font-weight: var(--fontWeightNormal);
    text-transform: uppercase;
  }

  h1,
  ul {
    width: 100%;
  }

  li {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 1rem 0;
    border-bottom: 1px solid var(--lightAccent);
    margin: 0;
    font-weight: var(--fontWeightNormal);

    b {
      font-weight: var(--fontWeightSemiBold);
    }
  }

  .button-bar {
    margin-top: 4rem;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: space-between;
    width: 100%;
  }
}
</style>