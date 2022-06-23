<script>
import BackBlock from '$lib/components/icon/BackBlock.svelte'
import QuestionBlock from '$lib/components/icon/QuestionBlock.svelte'
import StatsBlock from '$lib/components/icon/StatsBlock.svelte'
import XIcon from '$lib/components/icon/XIcon.svelte'
import MenuButton from '$lib/components/MenuButton.svelte'
import { POWERUPS_STORAGE_KEY } from '$lib/js/constants'
import { staticPowerups } from '$lib/state/powerups'
import { loadFromLocalStorage, saveToLocalStorage } from '$lib/js/helpers'
import { selectedStaticPowerup } from '$lib/state/powerups'
import { onMount } from 'svelte'

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

    <h1>Power-ups</h1>
    <p>Pick one from each category</p>

    <fieldset>
      <legend>Static</legend>

      <div class="powerup-list">
        <input type="radio" bind:group={$selectedStaticPowerup} id="none" name="static" value="none" on:change={saveValueLocally}/>
        <label for="none" class="powerup-card none">
          <XIcon />
        </label>

        <input type="radio" bind:group={$selectedStaticPowerup} id="educatedGuesses" name="static" value="educatedGuesses" on:change={saveValueLocally} />
        <label for="educatedGuesses" class="powerup-card">
          <BackBlock />
        </label>
        
        <input type="radio" bind:group={$selectedStaticPowerup} id="sweeterSuccess" name="static" value="sweeterSuccess" on:change={saveValueLocally} />
        <label for="sweeterSuccess" class="powerup-card">
          <QuestionBlock />
        </label>

        <input type="radio" bind:group={$selectedStaticPowerup} id="safeStreak" name="static" value="safeStreak" on:change={saveValueLocally} />
        <label for="safeStreak" class="powerup-card">
          <StatsBlock />
        </label>
      </div>
      <h2>{selectedStaticPowerupInfo.title}</h2>
      <p>{selectedStaticPowerupInfo.description}</p>
    </fieldset>


    <a href="/" class="button">Main menu</a>

  </div>
</div>


<style lang="scss">
.powerups {
  h2 {
    margin-bottom: 0;
  }

  .powerup-list {
    display: grid;
    grid-template-columns: 1fr 2fr 2fr 2fr;
    gap: 0.5rem;
    align-items: center;
    align-content: center;

    input[type=radio] {
      position: absolute;
      opacity: 0;

      &:checked + .powerup-card {
        border-color: var(--lightBlue);
        box-shadow: inset 0 0 0 2px var(--lightBlue);
      }
    }

    .powerup-card {
      border: 2px solid var(--lighterAccent);
      padding: 1rem;
      border-radius: 0.5rem;
      line-height: 1;
      transition: border 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

      &.none {
        padding: 0.25rem;
      }
    }
  }
}
</style>