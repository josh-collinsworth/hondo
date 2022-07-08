<script lang="ts">
import { shuffleGuesses, closeModal, useLifeline } from '$lib/state/mutations'
import { adjustedShuffleCost, adjustedLifelineCost } from '$lib/state/powerups';
import { remainingAttempts } from '$lib/state/game';

import ShuffleIcon from '../icon/ShuffleIcon.svelte'
import Lifeline from '../icon/Lifeline.svelte';

const shuffleAndClose = (): void => {
  shuffleGuesses()
  closeModal()
}

const lifelineAndClose = (): void => {
  useLifeline()
  closeModal()
}
</script>


<h2>Powers</h2>

<p class="small">Special abilities that can be played using energy.</p>

<ul class="no-bullets powers-list">
  <li class="power-card">
    <button class="power" on:click={shuffleAndClose} disabled={$adjustedShuffleCost >= $remainingAttempts}>
      <h3 class="display-flex align-center">
        <span class="info-button shuffle-button" aria-hidden="true">
          <ShuffleIcon />
        </span>
        Shuffle
      </h3>
      <p>Replaces all words on the board with new random guesses.</p>
      <p><b>Cost</b>: <span class="energy-bar" /><span class="energy-bar" /></p>
    </button>
  </li>
  <li class="power-card">
    <button class="power" on:click={lifelineAndClose} disabled={$adjustedLifelineCost >= $remainingAttempts}>
      <h3 class="display-flex align-center">
        <span class="info-button lifeline" aria-hidden="true">
          <Lifeline />
        </span>
        Lifeline
      </h3>
      <p>Randomly selects a new code word.</p>
      <p><b>Cost</b>:  <span class="energy-bar" /></p>
    </button>
  </li>
</ul>

<div class="button-bar">
  <button on:click={closeModal}>
    Cancel
  </button>
</div>



<style lang="scss">
.small {
  font-size: 0.875rem;
  line-height: 1.4;
}

.powers-list {
  margin-top: 1rem;
}

h3 {
  margin: 0;
}

.power-card p {
  font-size: 0.875rem;
  line-height: 1.4;
  grid-column: 1 / -1;
  font-weight: var(--fontWeightNormal);
}

.power {
  text-align: left;
  padding: 1rem;
  width: 100%;

  &[disabled] {
    opacity: 0.5;
  }
}

.power-card .button-bar {
  margin-top: 0;
}

.power-card + .power-card {
  margin-top: 1rem;
}

.lifeline {
  padding: 2px;
}

.shuffle-button,
.lifeline {
  width: 2rem;
  height: 2rem;
  margin-right: 0.5rem;
}

.energy-bar {
  width: 2em;
  height: 0.5em;
  background: var(--red);
  display: inline-block;
  margin: 0 0.125em;
}

b {
  font-weight: var(--fontWeightSemiBold)
}
</style>
