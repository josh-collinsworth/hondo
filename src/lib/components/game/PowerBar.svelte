<script lang="ts">
import { remainingAttempts, maxRemainingAttempts } from '$lib/state/game'
import { STARTING_GUESSES } from '$lib/js/constants'
</script>

<div
  class="power-bar-container"
  aria-label={`${$remainingAttempts / 10} of ${$maxRemainingAttempts / 10} attempts left.`}
  role="status" aria-live="polite"
>
  <div class="power-bar">
    <div
      class="power-bar__fill"
      style="
        transform: scaleX({ $remainingAttempts / STARTING_GUESSES });
        background-size: {( STARTING_GUESSES / $remainingAttempts) * 100}%;
      "
    />
    <div class="power-bar__grid">
      {#each { length: 10 } as _, i}
        <div class="power-bar__grid-box" />
      {/each}
    </div>
  </div>
</div>
