<script lang="ts">
  import { STARTING_GUESSES } from '$lib/js/constants'
  import { remainingAttempts, maxRemainingAttempts} from '$lib/js/state'
</script>

<div class="power-bar-container">
  <div class="power-bar" style="width: {$maxRemainingAttempts * STARTING_GUESSES}%;">
    <div
      class="power-bar__fill"
      style="
        width: 100%;
        transform: scaleX({ $remainingAttempts / $maxRemainingAttempts });
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
  <div class="power-bar__dots">
    {#each Array.from({length: STARTING_GUESSES }) as _}
      <div class="power-bar__dot"></div>
    {/each}
  </div>
</div>