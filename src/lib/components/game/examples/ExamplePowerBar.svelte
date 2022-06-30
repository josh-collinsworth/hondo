<script lang="ts">
import { STARTING_GUESSES } from '$lib/js/constants'

export let remainingAttempts: number = 10
export let startingGuesses: number = 10
export let score = 0
</script>

<div class="power-bar-container example-power-bar">
  <div class="power-bar">
    <div class="score">{score}</div>
    <div
      class="power-bar__fill"
      style="
        transform: scaleX({ remainingAttempts / startingGuesses });
        background-size: {( startingGuesses / remainingAttempts) * 100}%;
      "
    />
    <div class="power-bar__grid">
      {#each Array.from({ length: STARTING_GUESSES }) as _, i}
        <div
          class="power-bar__grid-box" 
        />
      {/each}
    </div>
  </div>
</div>


<style lang="scss">
.example-power-bar {
  --powerBarHeight: 1.5rem;

  margin: 0 auto;
  max-width: 12rem;
}
</style>