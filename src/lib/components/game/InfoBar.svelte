<script lang="ts">
import PowerBar from './PowerBar.svelte'
import ShuffleButton from './ShuffleButton.svelte'
import Toast from '../Toast.svelte'
import StatusBurst from './StatusBurst.svelte'
import MenuButton from '../MenuButton.svelte'
import PowerBarWide from './PowerBarWide.svelte'
import ScoreDisplay from './ScoreDisplay.svelte'
</script>


<div class="info-bar">
  <StatusBurst />
  <Toast />
  <!-- <LifelineButton /> -->
  <ShuffleButton />
  <!-- <ScoreDisplay /> -->
  <PowerBar />
  <MenuButton />
  <!-- <PowerBarWide /> -->
</div>
<!-- For debugging -->
<!-- <button on:click={() => runningScore.set($runningScore + 1)}>+1</button> -->

<style lang="scss">
.info-bar {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  justify-items: center;
  gap: 10px;
  margin-bottom: 1rem;
  position: relative;
  z-index: 5;
  height: var(--buttonHeight);
}
</style>