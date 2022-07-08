<script lang="ts">
import { SCORE_TICK_DURATION } from '$lib/js/constants'
import { streak } from '$lib/state/game'
import { selectedPowerupKey, getCurrentPowerup } from '$lib/state/powerups'

import ShuffleButton from './ShuffleButton.svelte'
import Toast from '../Toast.svelte'
import StatusBurst from './StatusBurst.svelte'
import MenuButton from '../MenuButton.svelte'
import PowerBarWide from './PowerBarWide.svelte'
import ScoreDisplay from './ScoreDisplay.svelte'

import { fly } from 'svelte/transition'
import { backIn, backOut } from 'svelte/easing'
</script>


<div class="info-bar">
  <!-- First row -->
  <span class="tiny">Powers</span>
  <span class="tiny">Charms</span>
  <span class="tiny">Score</span>
  <span class="tiny">Bonus</span>
  <span class="tiny">Menu</span>

  <StatusBurst />
  <Toast />
  <!-- <LifelineButton /> -->
  <ShuffleButton />
  <a class="info-button" href="/powerups">
    <div>
      {getCurrentPowerup($selectedPowerupKey).emoji}
    </div>
  </a>
  <ScoreDisplay />
  <!-- <PowerBar /> -->
  <div class="info-button bonus" style="font-weight: normal;">
    <div class="bonus-wrapper display-flex center-content">
      {#key $streak}
        <div
          class="bonus-digit display-flex center-content"
          out:fly={{ y: -36, duration: SCORE_TICK_DURATION, opacity: 1, easing: backIn }}
          in:fly={{ y: 36, duration: SCORE_TICK_DURATION, opacity: 1, easing: backOut, delay: SCORE_TICK_DURATION }}
        >
        {$streak}
      </div>
      {/key}
    </div>
  </div>
  <MenuButton />
  <PowerBarWide />
</div>
<!-- For debugging -->
<!-- <button on:click={() => runningScore.set($runningScore + 1)}>+1</button> -->

<style lang="scss">
.info-bar {
  display: grid;
  grid-template-columns: var(--buttonSize) var(--buttonSize) 1fr var(--buttonSize) var(--buttonSize);
  align-items: center;
  justify-items: center;
  gap: 8px 24px;
  margin-bottom: 1rem;
  position: relative;
  z-index: 5;
  height: 5.2rem;
}

.bonus {
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 100%;
  align-items: center;
  line-height: 1;

  .bonus-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .bonus-digit {
    width: 100%;
    height: 0;
    line-height: 0;
    text-align: center;
  }

  &::after {
    content: '+';
    font-weight: var(--fontWeightSemiBold);
    font-size: 0.875rem;
    position: absolute;
    height: 1rem;
    width: 1rem;
    line-height: 1rem;
    left: -0.3rem;
    top: calc(50% - 0.5rem);
    background: var(--paper);
    z-index: 200;
  }
}

.tiny {
  font-size: 10px;
  text-transform: uppercase;
  line-height: 1;
}
</style>