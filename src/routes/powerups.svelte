<script>
import { POWERUPS_STORAGE_KEY } from '$lib/js/constants'
import { staticPowerups } from '$lib/state/powerups'
import { loadFromLocalStorage, saveToLocalStorage } from '$lib/js/helpers'
import { selectedStaticPowerupKey } from '$lib/state/powerups'
import { onMount } from 'svelte'
import { get } from 'svelte/store'
import * as getters from '$lib/state/getters'

const saveValueLocally = () => {
  const savedPowerups = loadFromLocalStorage(POWERUPS_STORAGE_KEY) || {}
  saveToLocalStorage(POWERUPS_STORAGE_KEY, {
    ...savedPowerups, static: $selectedStaticPowerupKey
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
        <!-- TODO: make it so a disabled powerup can't be selected -->
          <input type="radio" bind:group={$selectedStaticPowerupKey} id={powerup.slug} name="static" value={powerup.slug} on:change={saveValueLocally} />
          <label for={powerup.slug} class="powerup-card" class:locked={get(getters[powerup.unlock.getter]) < powerup.unlock.threshold}>
            <svelte:component this={powerup.icon} />
          </label>
        {/each}
      </div>
      <h3>{selectedStaticPowerup.title}</h3>
      <p>{selectedStaticPowerup.description}</p>
  </div>

  <div class="button-bar">
    <a href="/" class="button">
      Back
    </a>

    <a href="/game" class="button confirm">
      Play!
    </a>
  </div>

  </div>
</div>


<style lang="scss">
.powerups {
  h1 {
    margin: 0;
    font-size: 1.3rem;
  }

  .powerup-category {
    padding: 1rem;
    margin: 24px 0;
    border: 2px solid var(--lighterAccent);
    border-radius: 0.5rem;
  }

  h3 {
    margin: 1rem 0 0;

    + p {
      margin: 0.5rem 0 0;
      font-size: 0.875rem;
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
    }
  }
}
</style>