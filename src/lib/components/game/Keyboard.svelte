<script lang="ts">
  import { isSingleLetter, isValidGuess, chooseRandomCodeWord, setNewScores, evaluateGuess, save, saveGameData } from '$lib/js/helpers'
  import { tick } from 'svelte'
  import { currentGuess, previousGuesses, discoveredCodeWord, codeWord, isLoadingNewWord, runningScore, remainingAttempts, gameIsOver, maxRemainingAttempts } from '$lib/js/state'
  import { GAME_DATA_STORAGE_KEY } from '$lib/js/constants'
import { get } from 'svelte/store';

  const keys = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['⏎', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '⌫'],
  ]

  $: lettersOnTheBoard = Array.from(new Set($previousGuesses.flatMap(word => [...word])))


  const handleKeyUp = (e) => {
    if (!e.key) return
    if (e.key === 'Backspace') {
      handlePress('⌫')
    } else if (e.key === 'Enter') {
      handlePress('⏎')
    } else if (isSingleLetter(e.key.toLowerCase())) {
      handlePress(e.key)
    }
  }

  const handlePress = async (key: string): Promise<void> => {
    if (isSingleLetter(key)) {
      if ($currentGuess.length < 5) {
        currentGuess.set($currentGuess + key)
      }
    } else if (key === '⏎' && isValidGuess($currentGuess)) {
      if (!$previousGuesses.includes($currentGuess)) {
        $previousGuesses = [...$previousGuesses, $currentGuess]
        const [partial, full] = evaluateGuess($currentGuess)

        setNewScores()

        if (full === 5) {
          discoveredCodeWord.set($codeWord)
          setTimeout(async () => {
            isLoadingNewWord.set(true)
            chooseRandomCodeWord()
            await tick()
            isLoadingNewWord.set(false)
            saveGameData()
          }, 1000
          )
        } else if (!get(gameIsOver)) {
          saveGameData()
        }
      }
      if ($previousGuesses.length > 5) {
        $previousGuesses = [...$previousGuesses].slice(1, $previousGuesses.length)
      }
    } else if (key === '⌫') {
      if ($currentGuess.length) {
        $currentGuess = $currentGuess.slice(0, $currentGuess.length - 1)
      }
    }
  }
</script>


<svelte:window on:keyup={handleKeyUp} />


<div class="keyboard">
  {#each keys as row}
    <div class="row">
      {#each row as key}
        <button 
          on:click={() => handlePress(key)}
          data-key={key}
          class:used={lettersOnTheBoard.includes(key)}
          class:included={lettersOnTheBoard.includes(key) && $codeWord.includes(key)}
        >
          {key}
        </button>
      {/each}
    </div>
  {/each}
</div>

<style lang="scss">
  .keyboard {
    display: grid;
    grid-template-rows: repeat(3, 4.2rem);
    margin: 0 calc(-1rem + 3px);

    .row {
      display: flex;
      margin: 0 auto;
      width: 100%;

      + .row {
        margin-top: 2px;
      }
    }

    .row:nth-of-type(2) {
      max-width: calc(100% - 2.5rem)
    }

    button {
      font-size: 1.2rem;
      flex: 1 0 3ch;
      text-transform: uppercase;
      background: var(--lighterGray);
      border: 1px solid var(--lightGray);
      border-radius: 0.2rem;
      margin: 0;
      padding: 0;
      touch-action: manipulation;

      &[data-key="⌫"],
      &[data-key="⏎"] {
        flex: 1 0 5ch;
      }

      + button {
        margin-left: 2px;
      }

      &.used {
        background: var(--lightGray);
      }

      &.included {
        background: var(--lightBlue);
      }
    }
  }
</style>