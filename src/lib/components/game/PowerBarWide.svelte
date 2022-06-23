<script lang="ts">
import { remainingAttempts, maxRemainingAttempts, runningScore } from '$lib/state/game'
import { STARTING_GUESSES } from '$lib/js/constants'
import { adjustedGuessCost } from '$lib/state/powerups';
</script>

<div
  class="power-bar-container wide"
  aria-label={`${$remainingAttempts} of ${$maxRemainingAttempts} attempts left.`}
  role="status" aria-live="polite"
>
  <div class="power-bar">
    <div
      class="power-bar__fill"
      class:pulse={$remainingAttempts <= $adjustedGuessCost}
      style="
        transform: scaleX({ $remainingAttempts / STARTING_GUESSES });
        background-size: {( STARTING_GUESSES / $remainingAttempts) * 100}%;
      "
    />
  </div>
</div>
