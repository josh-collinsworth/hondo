<script lang="ts">
import { saveToLocalStorage } from '$lib/js/helpers'
import { hasViewedTutorial } from '$lib/state/global'
import { closeModal } from '$lib/state/mutations'

const dismissForever = (): void => {
  saveToLocalStorage('skipTutorial', true)
  closeModal()
}

const dismissForThisSession = (): void => {
  $hasViewedTutorial = true
  closeModal()
}
</script>


<h2>Welcome to Hondo!</h2>

<p>Would you like to learn how to play?</p>

<div class="button-bar">
  <button on:click={closeModal}>
    Not now
  </button>
  <button on:click={dismissForever}>
    Never
  </button>
  <a class="button confirm" href="/how-to-play" on:click={dismissForThisSession}>
    Sure!
  </a>
</div>