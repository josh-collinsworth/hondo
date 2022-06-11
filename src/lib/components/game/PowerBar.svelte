<script lang="ts">
  import { remainingAttempts, maxRemainingAttempts, runningScore, remainingLifelineCooldowns } from '$lib/js/state'
  import { LIFELINE_DURATION, STARTING_GUESSES } from '$lib/js/constants'
  import { fly } from 'svelte/transition'

  let scoreDigits: string[]
  $: scoreDigits = String($runningScore).padStart(3).split('')
  
  let totalLifelineCooldown: number
  $: totalLifelineCooldown = $remainingLifelineCooldowns[0] || 0
  
  let calculatedDividerOffset: string 
  $: calculatedDividerOffset = `${$maxRemainingAttempts + ((LIFELINE_DURATION - totalLifelineCooldown) / LIFELINE_DURATION)}em`
</script>

<div
  class="power-bar-container"
  aria-label={`${$remainingAttempts} of ${$maxRemainingAttempts} attempts left.`}
  role="status" aria-live="polite"
>
  <div
    class="power-bar__divider"
    style="
      transform: translateX({calculatedDividerOffset});
    "
  />
  <div class="power-bar">
    <div
      class="score"
      role="status"
      aria-live="polite"
      aria-label={`Score: ` + $runningScore}
      style="overflow: {$runningScore < 100 ? 'hidden' : 'visible'};"
    >
      <div class="score-container" aria-hidden="true">
        {#each scoreDigits as digit, i}
          {#key digit}
            <div
              class="score-digit digit-{i + 1}"
              out:fly={{ y: -40, duration: 360, opacity: 1 }}
              in:fly={{ y: 40, duration: 360, opacity: 1 }}
            >
              {digit}
            </div>
          {/key}
        {/each}
      </div>
    </div>
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
        <div
          class="power-bar__grid-box" 
          class:disabled={i + 1 > $maxRemainingAttempts}
        />
      {/each}
    </div>
  </div>
</div>
