<script lang="ts">
import ShuffleButton from './ShuffleButton.svelte'
import SkipButton from './SkipButton.svelte'
import Toast from '../Toast.svelte'
import StatusBurst from './StatusBurst.svelte'
import MenuButton from '../MenuButton.svelte'
import PowerBarWide from './PowerBarWide.svelte'
import ScoreDisplay from './ScoreDisplay.svelte'

import BonusDisplay from './BonusDisplay.svelte';
</script>


<div class="info-bar">
  <StatusBurst />
  <Toast />

  <!-- First row -->
  <span class="tiny">Shuffle</span>
  <span class="tiny">Skip</span>
  <span class="tiny">Score</span>
  <span class="tiny">Bonus</span>
  <span class="tiny">Menu</span>

  <ShuffleButton />
  <SkipButton />
  <ScoreDisplay />
  <BonusDisplay />
  <!-- <PowerBar /> -->
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
  gap: 8px 20px;
  margin-bottom: 1rem;
  position: relative;
  z-index: 5;
  height: 4rem;
  height: 5.2rem;
}

.tiny {
  font-size: 10px;
  text-transform: uppercase;
  line-height: 1;
}
</style>