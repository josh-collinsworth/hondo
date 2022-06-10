<script lang="ts">
  import { codeWord, currentGuess, maxRemainingAttempts, remainingLifelineCooldowns } from '$lib/js/state'
  import { handleNewGuess } from '$lib/js/mutations'
  import { LIFELINE_DURATION } from '$lib/js/constants'
  import { load, save } from '$lib/js/helpers'

  import Lifeline from '../icon/Lifeline.svelte'

  const useLifeline = (e: Event): void => {
    const hasAcknowledgedLifeline = load('acknowledgedLifeline')
    let confirmation = false

    if (!hasAcknowledgedLifeline) {
      confirmation = confirm(`Temporarily reduces life gauge to solve the current code word. Use a lifeline?\n\n(This warning won't show again once used.)`)

      if (confirmation) {
        save('acknowledgedLifeline', true)
      }
    }

    if (hasAcknowledgedLifeline || confirmation) {
      // Is +1 because it will immediately be reduced by 1 as part of setNewScores()
      const cooldownToAdd = $remainingLifelineCooldowns.length ? LIFELINE_DURATION : LIFELINE_DURATION + 1
      currentGuess.set($codeWord)
      maxRemainingAttempts.set($maxRemainingAttempts - 1)
      remainingLifelineCooldowns.set(
        [...$remainingLifelineCooldowns, cooldownToAdd]
      ) 
      handleNewGuess()
    }
  }
</script>

<!-- For debugging -->
<!-- <div style="position: fixed; top: 0; left: 0;">{$remainingLifelineCooldowns}</div> -->
<button class="info-button lifeline" on:click={useLifeline}>
  <Lifeline />
  <span class="sr">Use a lifeline</span>
</button>