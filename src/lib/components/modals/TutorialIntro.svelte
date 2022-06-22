<script lang="ts">
import { saveToLocalStorage } from '$lib/js/helpers';

import { shownModal } from '$lib/state/global'
import { closeModal } from '$lib/state/mutations'

const startTutorial = (): void => {
  // $shownModal = tutoralO
}

const handleCloseModal = (): void => {
  saveToLocalStorage('skip-tutorial', true)
  $shownModal = null
}
</script>


<h2>Welcome to Hondo!</h2>

<p>Would you like a quick tutorial?</p>


<div class="button-bar">
  <button on:click={handleCloseModal}>
    No, thanks
  </button>
  <button class="confirm" on:click={startTutorial}>
    Sure!
  </button>
</div>