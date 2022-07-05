<script lang="ts">
import { remainingAttempts, maxRemainingAttempts } from '$lib/state/game'
import { STARTING_GUESSES } from '$lib/js/constants'
import { adjustedGuessCost } from '$lib/state/powerups';
</script>

<div
  class="power-bar-container wide"
  aria-label={`${$remainingAttempts} of ${$maxRemainingAttempts} attempts left.`}
  role="status" aria-live="polite"
>
  <span class="power-bar__numbers">{$remainingAttempts}</span>
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

.power-bar__numbers {
  font-size: 0.625rem;
  font-weight: var(--fontWeightSemiBold);
  line-height: 1;
  display: block;
  width: 2.2em;
  margin: 1px 4px 0 3px;
}
</style>