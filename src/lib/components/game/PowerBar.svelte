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
  <div class="power-bar__grid" style="grid-template-columns: repeat({$maxRemainingAttempts}, 1fr);">
    {#each Array.from({ length: $maxRemainingAttempts }) as _, i}
      <div 
        class="power-bar__grid-box"
      />
    {/each}
  </div>
</div>