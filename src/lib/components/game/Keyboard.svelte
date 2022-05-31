<script lang="ts">
  import { isSingleLetter, isValidGuess, chooseRandomCodeWord, setNewScores, evaluateGuess, saveGameData } from '$lib/js/helpers'
  import { currentGuess, previousGuesses, discoveredCodeWord, codeWord, isLoadingNewWord, gameIsOver, message, usedAttempts } from '$lib/js/state'
  import { tick } from 'svelte'
  import { get } from 'svelte/store';

  const keys = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['⏎', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '⌫'],
  ]

  $: lettersOnTheBoard = Array.from(new Set($previousGuesses.flatMap(word => [...word])))
  $: disableEnterKey = $currentGuess.length < 5
  $: disableDeleteKey = !$currentGuess.length

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

  const isEnterKey = (key: string): boolean => key === '⏎'
  const isDeleteKey = (key: string): boolean => key === '⌫'

  const handlePress = async (key: string): Promise<void> => {
    if (isSingleLetter(key)) {
      if ($currentGuess.length < 5) {
        currentGuess.set($currentGuess + key)
      }
    } else if (isDeleteKey(key)) {
      if ($currentGuess.length) {
        $currentGuess = $currentGuess.slice(0, $currentGuess.length - 1)
      }
    } else if (isEnterKey(key)) {
      if (isValidGuess($currentGuess)) {
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
      } else if ($currentGuess.length === 5) {
        message.set('')
        await tick()
        message.set('Sorry, not in word list')
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
          disabled={(isEnterKey(key) && disableEnterKey) || (isDeleteKey(key) && disableDeleteKey)}
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
      font-size: 1rem;
      flex: 1 0 3ch;
      text-transform: uppercase;
      background: var(--lightestGray);
      border: 1px solid var(--lighterGray);
      border-radius: 0.2rem;
      margin: 0;
      padding: 0;
      touch-action: manipulation;

      @media (min-width: 26rem) {
        font-size: 1.2rem;
      }

      &[data-key="⌫"],
      &[data-key="⏎"] {
        flex: 1 0 5ch;
      }

      &[disabled] {
        color: var(--lighterGray);
      }

      + button {
        margin-left: 2px;
      }

      &.used {
        background: var(--lighterGray);
      }

      &.included {
        background: var(--lightBlue);
      }
    }
  }
</style>