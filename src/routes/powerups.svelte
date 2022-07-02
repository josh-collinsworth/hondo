<script lang="ts">
import { POWERUPS_STORAGE_KEY } from '$lib/js/constants'
import { powerups } from '$lib/state/powerups'
import { loadFromLocalStorage, saveToLocalStorage } from '$lib/js/helpers'
import { selectedPowerupKey } from '$lib/state/powerups'
import { onMount } from 'svelte'
import { get } from 'svelte/store'
import * as getters from '$lib/state/getters'
import Padlock from '$lib/components/icon/Padlock.svelte'
import { setToast } from '$lib/state/mutations';

const saveValueLocally = () => {
  const savedPowerups = loadFromLocalStorage(POWERUPS_STORAGE_KEY) || {}
  saveToLocalStorage(POWERUPS_STORAGE_KEY, {
    ...savedPowerups, static: $selectedPowerupKey
  })
}

const promptToChooseValidPowerups = (): void => {
  console.log('clicked')
  setToast({
    message: 'Please choose powerups that are unlocked',
    type: 'warning'
  })
}

$: selectedPowerup = $powerups.find(powerup => powerup.slug === $selectedPowerupKey)

onMount(() => {
  const savedPowerups = loadFromLocalStorage(POWERUPS_STORAGE_KEY)

  if (savedPowerups) {
    $selectedPowerupKey = savedPowerups.static
  }
})
</script>


<div class="powerups">
  <div class="container">
    <h1>Choose a powerup</h1>
    <p>Powerups have a lasting effect on the game.</p>

    <div class="powerup-list">
      {#each $powerups as powerup}
        <input
          id={powerup.slug}
          bind:group={$selectedPowerupKey}
          value={powerup.slug}
          on:change={saveValueLocally}
          type="radio"
          name="charm"
          disabled={get(getters[powerup.unlock.getter]) < powerup.unlock.threshold}
        />
        <label for={powerup.slug} class="powerup-card" class:locked={get(getters[powerup.unlock.getter]) < powerup.unlock.threshold}>
          <span class="powerup-icon display-flex center-content" aria-hidden="true">
            {get(getters[powerup.unlock.getter]) < powerup.unlock.threshold ? '🔒' : powerup.emoji}
          </span>
          <div>
            <h2>
              {powerup.title}
            </h2>
            <p>
              {powerup.description}
            </p>
            {#if get(getters[powerup.unlock.getter]) < powerup.unlock.threshold}
              <p>{powerup.unlock.description}</p>
            {/if}
          </div>
        </label>
      {/each}
    </div>

    <div class="button-bar">
      <a href="/" class="button">
        Back
      </a>

      {#if get(getters[selectedPowerup.unlock.getter]) < selectedPowerup.unlock.threshold}
        <button class="button unavailable" on:click={promptToChooseValidPowerups}>
          Play!
        </button>
      {:else}
        <a href="/game" class="button confirm">
          Play! 
        </a>
      {/if}
    </div>
  </div>
</div>


<style lang="scss">
.powerups {
  h1 {
    font-size: 1.5rem;
    margin: 1rem 0 2rem;
  }

  .powerup-list {
    display: grid;
    grid-template-columns: 100%;
    gap: 2rem;
    line-height: 1.4;

    h2 {
      font-size: 1.125rem;
      margin: 0;
    }
    
    p {
      margin: 0.5rem 0 0;
      font-size: 0.875rem;
    }

    .powerup-card {
      --powerupIconSize: 4rem;

      border: 0;
      display: grid;
      grid-template-columns: var(--powerupIconSize) 1fr;
      align-items: center;
      gap: 1.5rem;
      border-radius: 0.375rem;
      transition: box-shadow 0.2s ease-in-out;
      position: relative;
      padding-right: 0.5rem;
      // box-shadow: 0 0 0 4px var(--paper), 0 0 0 2px var(--primary);

      .powerup-icon {
        width: 100%;
        aspect-ratio: 1 / 1;
        border-radius: 0.5rem;
        font-size: 2rem;
        line-height: 0;
        padding: 0.5rem;
        transition: all 0.15s;
        
        &::before {
          content: '';
          transition: all 0.2s;
          border-radius: 0.5rem;
          border: 2px solid var(--lighterAccent);
          position: absolute;
          width: var(--powerupIconSize);
          height: var(--powerupIconSize);
          left: 0;
        }
      }
    }
  }

  input[type=radio] {
    position: absolute;
    opacity: 0;

    &:checked + .powerup-card {
      // box-shadow: 0 0 0 8px var(--paper), 0 0 0 10px var(--primary);

      .powerup-icon {
        border-color: var(--primary);
        // background: var(--primary);

        &::before {
          width: calc(100%);
          height: calc(100% + 1rem);
          top: -0.5rem;
          border-color: var(--orange);
        }
      }
    }

    &:disabled + .powerup-card {
      color: var(--lightAccent);
      // background: var(--lighterAccent);

      .powerup-icon {
        background: var(--paper);
        border-color: var(--lighterAccent);
      }
    }
  }

  .button.unavailable {
    opacity: 0.5;
  }
}
</style>