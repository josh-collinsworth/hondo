<script lang="ts">
  import { STARTING_GUESSES } from '$lib/js/constants'
  import { remainingAttempts, maxRemainingAttempts, runningScore, usedAttempts} from '$lib/js/state'

  $: baseDividerOffset = (($maxRemainingAttempts * STARTING_GUESSES) - ($usedAttempts % 10)) / STARTING_GUESSES
  $: pixelDividerOffset = 
    $usedAttempts > 90 
      ? $usedAttempts % 10 * -1
      : !$usedAttempts
        ? 4
        : 0
  $: calculatedDividerOffset = `calc(${baseDividerOffset}em + ${pixelDividerOffset}px)`
</script>

<div class="power-bar-container">
  <!-- <div class="power-bar" style="width: {(($maxRemainingAttempts * STARTING_GUESSES) - ($runningScore % 10)) / STARTING_GUESSES}em;"> -->
  <div
    class="power-bar__divider"
    style="transform: translateX({calculatedDividerOffset});"
  />
  <div class="power-bar">
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