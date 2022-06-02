<script lang="ts">
  import { STARTING_GUESSES } from '$lib/js/constants'
  import { remainingAttempts, maxRemainingAttempts, runningScore} from '$lib/js/state'
</script>

<div class="power-bar-container">
  <div class="power-bar" style="width: {(($maxRemainingAttempts * STARTING_GUESSES) - ($runningScore % 10)) / STARTING_GUESSES}em;">
    <div
      class="power-bar__fill"
      style="
        transform: scaleX({ $remainingAttempts / STARTING_GUESSES });
      "
    />
    <div 
      class="power-bar__grid"
      style="grid-template-columns: repeat({STARTING_GUESSES}, 1fr);"
    >
      {#each Array.from({ length: STARTING_GUESSES }) as _, i}
        <div class="power-bar__grid-box" />
      {/each}
    </div>
  </div>
  <div class="power-bar__dots">
    {#each Array.from({length: STARTING_GUESSES }) as _, i}
      <div
        class="power-bar__dot"
        class:filled={i + 1 > $maxRemainingAttempts}
      />
    {/each}
  </div>
</div>