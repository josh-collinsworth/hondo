<script lang="ts">
import { saveToLocalStorage } from '$lib/js/helpers'
import { closeModal } from '$lib/state/mutations'

const dismissForever = (): void => {
  saveToLocalStorage('skipTutorial', true)
  closeModal()
}
</script>


<h2>Welcome to Hondo!</h2>

<p>Would you like a quick tutorial?</p>


<div class="button-bar">
  <button on:click={closeModal}>
    Not now
  </button>
  <button on:click={dismissForever}>
    Never
  </button>
  <a class="button confirm" href="/how-to-play" on:click={closeModal}>
    Sure!
  </a>
</div>