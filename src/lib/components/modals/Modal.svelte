<script lang="ts">
  import { shownModal } from '$lib/js/state' 
  import LifelineConfirmationModal from './LifelineConfirmationModal.svelte'
</script>


<div id="modal-background">
  <div id=modal-card>
    {#if $shownModal === 'LifelineConfirmation'}
      <LifelineConfirmationModal />
    {/if}
  </div>
</div>


<style lang="scss">
  #modal-background {
    width: 100vw;
    min-height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    background: rgba(var(--inkRGB), 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #modal-card {
    border: 2px solid var(--lightAccent);
    background: var(--paper);
    width: 100%;
    height: 10rem;
    max-width: 32rem;
    margin: 1rem;
    padding: 1rem;
  }
</style>