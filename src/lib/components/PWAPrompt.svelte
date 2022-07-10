<script lang="ts">
import { onMount } from 'svelte'
import { fly } from 'svelte/transition'

let isShown = false
let installEvent: Event

onMount(() => {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    installEvent = e
    isShown = true
  })
})

const dismissPrompt = () => {
  isShown = false
}

const installPWA = () => {
  installEvent.prompt()
  installEvent.userChoice.then((choice) => {
    dismissPrompt() // Hide the prompt once the user's clicked
    if (choice.outcome === 'accepted') {
      // Do something additional if the user chose to install
    } else {
      // Do something additional if the user declined
    }
  })
}

</script>


{#if isShown}
  <div class="pwa-prompt" transition:fly={{ y: 80 }}>
    <p>Install Hondo?</p>

    <div class="button-bar">
      <button on:click={dismissPrompt}>
        Dismiss
      </button>
      
      <button class="confirm" on:click={installPWA}>
        Install
      </button>
    </div>
  </div>
{/if}


<style lang="scss">
.pwa-prompt {
  position: fixed;
  left: 0;
  bottom: 0;
  padding: 1rem;
  width: 100vw;
  background: var(--darkBlue);
  color: var(--offwhite);
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .button-bar {
    margin: 0;
    gap: 1rem;
  }
}
</style>