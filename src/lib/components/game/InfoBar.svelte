<script lang="ts">
import ShuffleButton from './ShuffleButton.svelte'
import Toast from '../Toast.svelte'
import StatusBurst from './StatusBurst.svelte'
import MenuButton from '../MenuButton.svelte'
import PowerBarWide from './PowerBarWide.svelte'
import ScoreDisplay from './ScoreDisplay.svelte'
import { selectedPowerupKey, getCurrentPowerup } from '$lib/state/powerups'
</script>


<div class="info-bar">
  <!-- First row -->
  <!-- <span class="tiny">Shuffle</span>
  <span class="tiny">Charm</span>
  <span class="tiny">Score</span>
  <span class="tiny"></span>
  <span class="tiny">Menu</span> -->

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
  <div style="width: var(--buttonSize)"></div>
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
  gap: 2px 24px;
  margin-bottom: 1rem;
  position: relative;
  z-index: 5;
  height: auto;
}

.tiny {
  font-size: 10px;
  text-transform: uppercase;
  line-height: 1;
}
</style>