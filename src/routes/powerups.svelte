<script lang="ts">
import { POWERUPS_STORAGE_KEY } from '$lib/js/constants'
import { staticPowerups } from '$lib/state/powerups'
import { loadFromLocalStorage, saveToLocalStorage } from '$lib/js/helpers'
import { selectedStaticPowerupKey } from '$lib/state/powerups'
import { onMount } from 'svelte'
import { get } from 'svelte/store'
import * as getters from '$lib/state/getters'
import Padlock from '$lib/components/icon/Padlock.svelte'
import { setToast } from '$lib/state/mutations';

const saveValueLocally = () => {
  const savedPowerups = loadFromLocalStorage(POWERUPS_STORAGE_KEY) || {}
  saveToLocalStorage(POWERUPS_STORAGE_KEY, {
    ...savedPowerups, static: $selectedStaticPowerupKey
  })
}

const promptToChooseValidPowerups = (): void => {
  console.log('clicked')
  setToast({
    message: 'Please choose powerups that are unlocked',
    type: 'warning'
  })
}

$: selectedStaticPowerup = $staticPowerups.find(powerup => powerup.slug === $selectedStaticPowerupKey)

onMount(() => {
  const savedPowerups = loadFromLocalStorage(POWERUPS_STORAGE_KEY)

  if (savedPowerups) {
    $selectedStaticPowerupKey = savedPowerups.static
  }
})
</script>


<div class="powerups">
  <div class="container">
    <h1>Choose your powerups</h1>

    <div class="powerup-category">
      <h2>Static</h2>

      <div class="powerup-list">

        {#each $staticPowerups as powerup}
          <input type="radio" bind:group={$selectedStaticPowerupKey} id={powerup.slug} name="static" value={powerup.slug} on:change={saveValueLocally} />
          <label for={powerup.slug} class="powerup-card" class:locked={get(getters[powerup.unlock.getter]) < powerup.unlock.threshold}>
            <span aria-hidden="true">
              <svelte:component this={get(getters[powerup.unlock.getter]) < powerup.unlock.threshold ? Padlock: powerup.icon} />
            </span>
            <div class="sr">{selectedStaticPowerup.title}</div>
          </label>
        {/each}
      </div>
      <h3>{selectedStaticPowerup.title}</h3>
      <p>{selectedStaticPowerup.description}</p>
      {#if get(getters[selectedStaticPowerup.unlock.getter]) < selectedStaticPowerup.unlock.threshold}
        <p class="unlock-message">
          <span class="unlock-icon" aria-hidden="true">
            <Padlock />
          </span> 
          {selectedStaticPowerup.unlock.description}</p>
      {/if}
  </div>

  <div class="button-bar">
    <a href="/" class="button">
      Back
    </a>

    {#if get(getters[selectedStaticPowerup.unlock.getter]) < selectedStaticPowerup.unlock.threshold}
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
    margin: 0;
    font-size: 1.25rem;
  }

  h2 {
    font-size: 1.125rem;
  }

  .powerup-category {
    padding: 1rem;
    margin: 24px 0;
    border: 2px solid var(--lighterAccent);
    border-radius: 0.5rem;

    h3 {
      margin: 1rem 0 0;
      font-size: 1rem;
    }
  
    p {
      margin: 0.5rem 0 0;
      font-size: 0.875rem;
    }
  }

  p.unlock-message {
    background: var(--red);
    color: var(--white);
    padding: 0.5em;
    border-radius: 0.5em;
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    .unlock-icon {
      width: 1rem;
      padding-top: 0.2em;
      display: block;
      margin-right: 0.5em;
    }
  }

  .powerup-list {
    display: grid;
    grid-template-columns: 2fr 2fr 2fr 2.5rem;
    gap: 0.5rem;
    align-items: center;
    align-content: center;

    :global(svg) {
      fill: currentColor;
    }

    .powerup-card {
      border: 2px solid var(--lighterAccent);
      padding: 1rem;
      border-radius: 1rem;
      line-height: 0;
      transition: background 0.15s ease-in-out;

      &.locked {
        opacity: 0.4;
      }

      &[for=none] {
        padding: 0.25rem;
      }
    }
  }

  input[type=radio] {
    position: absolute;
    opacity: 0;

    &:checked + .powerup-card {
      border-color: var(--primary);
      background: var(--primary);

      &.locked {
        border-color: var(--lighterAccent);
        background: var(--lighterAccent);
      }
    }
  }

  .button.unavailable {
    opacity: 0.5;
  }
}
</style>