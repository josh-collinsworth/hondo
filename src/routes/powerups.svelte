<script>
import BackBlock from '$lib/components/icon/BackBlock.svelte'
import QuestionBlock from '$lib/components/icon/QuestionBlock.svelte'
import StatsBlock from '$lib/components/icon/StatsBlock.svelte'
import XIcon from '$lib/components/icon/XIcon.svelte'
import MenuButton from '$lib/components/MenuButton.svelte'
import { POWERUPS_STORAGE_KEY, STATIC_POWERUP_EFFECTS } from '$lib/js/constants'
import { loadFromLocalStorage, saveToLocalStorage } from '$lib/js/helpers'
import { staticPowerup } from '$lib/state/powerups'
import { onMount } from 'svelte'

const saveValueLocally = () => {
  const savedPowerups = loadFromLocalStorage(POWERUPS_STORAGE_KEY) || {}
  saveToLocalStorage(POWERUPS_STORAGE_KEY, {
    ...savedPowerups, static: $staticPowerup
  })
}

$: staticPowerupInfo = STATIC_POWERUP_EFFECTS[$staticPowerup]

onMount(() => {
  console.log('onMount', $staticPowerup)
  const savedPowerups = loadFromLocalStorage(POWERUPS_STORAGE_KEY)

  if (savedPowerups) {
    $staticPowerup = savedPowerups.static
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
        <input type="radio" bind:group={$staticPowerup} id="none" name="static" value="none" on:change={saveValueLocally}/>
        <label for="none" class="powerup-card none">
          <XIcon />
        </label>

        <input type="radio" bind:group={$staticPowerup} id="educatedGuesses" name="static" value="educatedGuesses" on:change={saveValueLocally} />
        <label for="educatedGuesses" class="powerup-card">
          <BackBlock />
        </label>
        
        <input type="radio" bind:group={$staticPowerup} id="sweeterSuccess" name="static" value="sweeterSuccess" on:change={saveValueLocally} />
        <label for="sweeterSuccess" class="powerup-card">
          <QuestionBlock />
        </label>

        <input type="radio" bind:group={$staticPowerup} id="wordserk" name="static" value="wordserk" on:change={saveValueLocally} />
        <label for="wordserk" class="powerup-card">
          <StatsBlock />
        </label>
      </div>
      <h2>{staticPowerupInfo.title}</h2>
      <p>{staticPowerupInfo.description}</p>
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