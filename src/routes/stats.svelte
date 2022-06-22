<script lang="ts">
import Loader from '$lib/components/game/Loader.svelte'
import MenuButton from '$lib/components/MenuButton.svelte'
import { GAME_HISTORY_STORAGE_KEY, LONGEST_STREAK_STORAGE_KEY } from '$lib/js/constants'
import { loadFromLocalStorage, floatFormatter } from '$lib/js/helpers'
import { onMount } from 'svelte'

let stats = []
let isLoading = true
let highScore: number
let averageScore: number|string
let averageGuesses: number|string
let medianScore: number
let medianGuesses: number
let fastestHondo: number
let longestStreak: number
let totalScore: number

onMount(() => {
  const loadedStats = loadFromLocalStorage(GAME_HISTORY_STORAGE_KEY)
  const loadedLongestStreak = loadFromLocalStorage(LONGEST_STREAK_STORAGE_KEY) || 0
  
  longestStreak = loadedLongestStreak

  if (loadedStats) {
    stats = loadedStats
    highScore = Math.max(...stats.map((score: number[]) => score[0]))
    const scoresOnly = stats.map((score: number[]) => score[0])
    totalScore = scoresOnly.reduce((p: number, c: number) => p + c, 0)
    averageScore = floatFormatter.format(totalScore / stats.length)
    averageGuesses = floatFormatter.format(
      stats.map((score: number[]) => score[1]).reduce((p: number, c: number) => p + c, 0) / stats.length
    )
    const hondos = stats.filter((score: number[]) => score[0] === 100)
    if (hondos.length) {
      fastestHondo = Math.min(...hondos.map((score: number[]) => score[1]))
    }
    let medianScoreTally = stats.map(score => score[0]).sort((a, b) => a > b)
    let medianGuessesTally = stats.map(score => score[1]).sort((a, b) => a > b)
    
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
  }
  isLoading = false
})
</script>


<div class="stats display-flex center-content">
  <MenuButton />
  <h1>Game stats</h1>

  {#if isLoading}
    <Loader />
  {:else if stats.length}
    <ul class="no-bullets">
      <li>
        <h2>Highest score</h2>
        <p>{highScore}</p>
      </li>
      <li>
        <h2>Fastest Hondo</h2>
        {#if fastestHondo}
        <p>{fastestHondo} attempts</p>
        {:else}
        <p>You haven't scored a Hondo yet. Keep trying!</p>
        {/if}
      </li>
      <li>
        <h2>Longest streak</h2>
        <p>{longestStreak}</p>
      </li>
      <li>
        <h2>Total points scored</h2>
        <p>{totalScore}</p>
      </li>
      <li>
        <h2>Average score</h2>
        <p>{averageScore} in {averageGuesses} guesses</p>
      </li>
      <li>
        <h2>Median score</h2>
        <p>{medianScore} in {medianGuesses} guesses</p>
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