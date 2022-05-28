<script lang="ts">
  import { STARTING_GUESSES } from '$lib/js/constants'
  import { remainingAttempts, maxScore} from '$lib/js/state'
</script>

<div class="power-bar">
  <div
    class="power-bar__fill"
    style="
      width: {$maxScore * 10}%;
      transform: scaleX({ $remainingAttempts / $maxScore });
      background-size: {( STARTING_GUESSES / $remainingAttempts) * 100}%;
    "
  />
  <div class="power-bar__grid" style="grid-template-columns: repeat({STARTING_GUESSES}, 1fr);">
    {#each Array.from({ length: 10 }) as _, i}
      <div 
        class="power-bar__grid-box"
        class:blackout={i + 1 > $maxScore}
      />
    {/each}
  </div>
</div>