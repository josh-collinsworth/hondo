<script lang="ts">
  import { STARTING_GUESSES } from '$lib/js/constants'
  import { remainingAttempts, maxRemainingAttempts} from '$lib/js/state'
</script>

<div class="power-bar" style="width: {$maxRemainingAttempts * 10}%;">
  <div
    class="power-bar__fill"
    style="
      width: 100%;
      transform: scaleX({ $remainingAttempts / $maxRemainingAttempts });
      background-size: {( STARTING_GUESSES / $remainingAttempts) * 100}%;
    "
  />
  <div 
    class="power-bar__grid"
    style="
      grid-template-columns: repeat({STARTING_GUESSES}, 1fr);
      width: {( STARTING_GUESSES / $maxRemainingAttempts ) * 100}%;
    "
  >
    {#each Array.from({ length: STARTING_GUESSES }) as _, i}
      <div 
        class="power-bar__grid-box"
      />
    {/each}
  </div>
</div>