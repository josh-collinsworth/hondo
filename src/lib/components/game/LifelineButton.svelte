<script lang="ts">
  import { showModal } from '$lib/js/mutations'
  import LifelineConfirmationModal from '../modals/LifelineConfirmationModal.svelte'

  import Lifeline from '../icon/Lifeline.svelte'

  const confirm = () => {
    showModal(LifelineConfirmationModal)
  }
</script>

<!-- For debugging -->
<!-- <div style="position: fixed; top: 0; left: 0;">{$remainingLifelineCooldowns}</div> -->
<button class="info-button lifeline" on:click={confirm}>
  <Lifeline />
  <span class="sr">Use a lifeline</span>
</button>