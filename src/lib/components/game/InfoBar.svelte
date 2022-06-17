<script lang="ts">
  import { isMenuOpen } from '$lib/js/state'

  import PowerBar from './PowerBar.svelte'
  import ShuffleButton from './ShuffleButton.svelte'
  import Toast from '../Toast.svelte'
  import StatusBurst from './StatusBurst.svelte'
  import Arrow from '../icon/Arrow.svelte'

  const toggleIsMenuOpen = (): void => {
    $isMenuOpen = !$isMenuOpen
  }
</script>


<div class="info-bar">
  <StatusBurst />
  <Toast />
  <!-- <LifelineButton /> -->
  <ShuffleButton />
  <PowerBar />
  <button class="info-button menu" on:click={toggleIsMenuOpen}>
    <div class="hamburger display-flex align-center">
      <div class="hamburger__bar"></div>
      <div class="hamburger__bar"></div>
      <div class="hamburger__bar"></div>
    </div>
  </button>
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

    .menu {
      padding: 0;
    }

    .hamburger {
      width: 1.25rem;
      height: 1rem;
      flex-wrap: wrap;

      .hamburger__bar {
        content: '';
        width: 100%;
        height: 2px;
        background: var(--darkBlue);
        display: block;
      }
    }
  }
</style>