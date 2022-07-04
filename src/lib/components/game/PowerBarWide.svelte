<script lang="ts">
import { remainingAttempts, maxRemainingAttempts } from '$lib/state/game'
import { STARTING_GUESSES } from '$lib/js/constants'
import { adjustedGuessCost } from '$lib/state/powerups';
</script>

<span class="power-bar__numbers">{$remainingAttempts}/{$maxRemainingAttempts}</span>
  <div
  class="power-bar-container wide"
  aria-label={`${$remainingAttempts} of ${$maxRemainingAttempts} attempts left.`}
  role="status" aria-live="polite"
  >
  <div class="power-bar">
    <div
    class="power-bar__fill"
    style="
    transform: scaleX({ $remainingAttempts / STARTING_GUESSES });
    background-size: {( STARTING_GUESSES / $remainingAttempts) * 100}%;
      "
      >
      <div class="power-bar__fill--blinker" style="width: {$adjustedGuessCost * ( STARTING_GUESSES / $remainingAttempts)}%" />
    </div>
  </div>
</div>


<style lang="scss">
.wide-wrap {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column: span all;
}

.power-bar__numbers {
  font-size: 0.75rem;
}
</style>