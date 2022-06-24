<script lang="ts">
import Loader from '$lib/components/game/Loader.svelte'
import MenuButton from '$lib/components/MenuButton.svelte'
import { LONGEST_STREAK_STORAGE_KEY } from '$lib/js/constants'
import { gameHistory, totalGamesPlayed, totalPointsScored, highScore, totalHondos, hondos } from '$lib/state/getters'
import { loadFromLocalStorage, floatFormatter } from '$lib/js/helpers'
import { onMount } from 'svelte'
import type { PlayedGame } from '$lib/js/types'

let localIsLoading = true

let stats = {
  played: 0,
  highScore: 0,
  totalScore: 0,
  averageScore: <number|string> 0,
  averageGuesses: <number|string> 0,
  longestStreak: 0,
  totalGamesPlayed: 0,
  fastestHondo: <number|null> null,
  medianScore: 0,
  medianGuesses: 0,
}

onMount(() => {
  const playedGames: PlayedGame[] = gameHistory()
  const loadedLongestStreak = loadFromLocalStorage(LONGEST_STREAK_STORAGE_KEY)

  console.log(playedGames)
  
  stats.longestStreak = loadedLongestStreak || 0

  if (playedGames.length) {
    stats.played = playedGames.length
}
  stats.highScore = highScore()
  stats.totalScore = totalPointsScored()
  stats.totalGamesPlayed = totalGamesPlayed()
  stats.averageScore = floatFormatter.format(stats.totalScore / stats.totalGamesPlayed)
  stats.averageGuesses = floatFormatter.format(
    stats.totalScore / stats.totalGamesPlayed
  )
  const playedHondos = hondos()
  if (playedHondos.length) {
    stats.fastestHondo = Math.min(...playedHondos.map((score: number[]) => score[1]))
  }
  let medianScoreTally = playedGames.map(score => score[0]).sort((a, b) => a - b)
  let medianGuessesTally = playedGames.map(score => score[1]).sort((a, b) => a - b)
  
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
  stats.medianScore = medianScoreTally[0]
  stats.medianGuesses= medianGuessesTally[0]

  localIsLoading = false
})
</script>


<div class="stats display-flex center-content">
  <MenuButton />
  <h1>Game stats</h1>

  {#if localIsLoading}
    <Loader />
  {:else if stats.played}
    <ul class="no-bullets">
      <li>
        <h2>Highest score</h2>
        <p>{stats.highScore}</p>
      </li>
      <li>
        <h2>Fastest Hondo</h2>
          {#if stats.fastestHondo}
        <p>{stats.fastestHondo} attempts</p>
        {:else}
          <p>You haven't scored a Hondo yet. Keep trying!</p>
        {/if}
      </li>
      <li>
        <h2>Longest streak</h2>
        <p>{stats.longestStreak}</p>
      </li>
      <li>
        <h2>Total points scored</h2>
        <p>{stats.totalScore}</p>
      </li>
      <li>
        <h2>Average score</h2>
        <p>{stats.averageScore} in {stats.averageGuesses} guesses</p>
      </li>
      <li>
        <h2>Median score</h2>
        <p>{stats.medianScore} in {stats.medianGuesses} guesses</p>
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
    margin: 3rem 0 0;
  }

  :global(.menu-button) {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
}
</style>