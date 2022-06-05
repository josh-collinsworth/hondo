<script lang="ts">
  import { STARTING_GUESSES } from '$lib/js/constants'
  import { remainingAttempts } from '$lib/js/state'
</script>

<div
  class="power-bar-container"
  aria-label={`${$remainingAttempts} of ${STARTING_GUESSES} attempts left.`}
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
    <div 
      class="power-bar__grid"
      style="grid-template-columns: repeat({STARTING_GUESSES}, 1fr);"
    >
      {#each Array.from({ length: STARTING_GUESSES }) as _, i}
        <div class="power-bar__grid-box" />
      {/each}
    </div>
  </div>
</div>