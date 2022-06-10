<script lang="ts">
  import PowerBar from './PowerBar.svelte'
  import LifelineButton from './LifelineButton.svelte'
</script>


<div class="info-bar">
  <LifelineButton />
  
  <PowerBar />
  <a href="how-to-play" class="info-button instructions">
    <span class="sr">How to play Hondo</span>
    ?
  </a>
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
    z-index: 2;
  }

  .instructions {
    font-size: 1.5rem;
    text-decoration: none;
  }
</style>