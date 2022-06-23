<script>
import XIcon from '$lib/components/icon/XIcon.svelte'
import MenuButton from '$lib/components/MenuButton.svelte'
import { POWERUPS_STORAGE_KEY } from '$lib/js/constants'
import { staticPowerups } from '$lib/state/powerups'
import { loadFromLocalStorage, saveToLocalStorage } from '$lib/js/helpers'
import { selectedStaticPowerup } from '$lib/state/powerups'
import { onMount } from 'svelte'
import SweeterSuccess from '$lib/components/icon/powerups/SweeterSuccess.svelte';
import SafeStreak from '$lib/components/icon/powerups/SafeStreak.svelte';
import EducatedGuesses from '$lib/components/icon/powerups/EducatedGuesses.svelte';

const saveValueLocally = () => {
  const savedPowerups = loadFromLocalStorage(POWERUPS_STORAGE_KEY) || {}
  saveToLocalStorage(POWERUPS_STORAGE_KEY, {
    ...savedPowerups, static: $selectedStaticPowerup
  })
}

$: selectedStaticPowerupInfo = $staticPowerups[$selectedStaticPowerup]

onMount(() => {
  const savedPowerups = loadFromLocalStorage(POWERUPS_STORAGE_KEY)

  if (savedPowerups) {
    $selectedStaticPowerup = savedPowerups.static
  }
})
</script>


<div class="powerups">
  <div class="container">
    <MenuButton floating={true} />

    <h1>Powerups</h1>

    <div class="powerup-category">
      <h2>Static</h2>

      <div class="powerup-list">
        <input type="radio" bind:group={$selectedStaticPowerup} id="educatedGuesses" name="static" value="educatedGuesses" on:change={saveValueLocally} />
        <label for="educatedGuesses" class="powerup-card">
          <EducatedGuesses />
        </label>
        <input type="radio" bind:group={$selectedStaticPowerup} id="sweeterSuccess" name="static" value="sweeterSuccess" on:change={saveValueLocally} />
        <label for="sweeterSuccess" class="powerup-card">
          <SweeterSuccess />
        </label>
        
        <input type="radio" bind:group={$selectedStaticPowerup} id="safeStreak" name="static" value="safeStreak" on:change={saveValueLocally} />
        <label for="safeStreak" class="powerup-card">
          <SafeStreak />
        </label>
        
        <input type="radio" bind:group={$selectedStaticPowerup} id="none" name="static" value="none" on:change={saveValueLocally}/>
        <label for="none" class="powerup-card none">
          <XIcon />
        </label> 
      </div>
      <h3>{selectedStaticPowerupInfo.title}</h3>
      <p>{selectedStaticPowerupInfo.description}</p>
  </div>

  <a href="/" class="button">Main menu</a>

  </div>
</div>


<style lang="scss">
.powerups {
  h1 {
    margin: 0;
  }

  .powerup-category {
    padding: 1rem;
    margin: 2rem 0;
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
    gap: 1rem;
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

      &.none {
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