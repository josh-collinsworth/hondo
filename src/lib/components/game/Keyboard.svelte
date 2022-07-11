<script lang="ts">
import { currentGuess, codeWord, currentGuesses, gameIsOver } from '$lib/state/game'
import { handleNewGuess } from '$lib/state/mutations'
import { isSingleLetter } from '$lib/js/helpers'
import { browser } from '$app/env'

import SkipIcon from '../icon/SkipIcon.svelte'
import PlayIcon from '../icon/PlayIcon.svelte'

const keys = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['+', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '-'],
]

$: lettersOnTheBoard = Array.from(new Set($currentGuesses.flatMap(word => [...word])))
$: disableEnterKey = $currentGuess.length < 5
$: disableDeleteKey = !$currentGuess.length
$: disableKeyboard = $gameIsOver
$: vibrationEnabled = browser && window.navigator && window.navigator.vibrate

const handleKeyUp = (e: KeyboardEvent): void => {
  if (!e.key || disableKeyboard) return
  if (e.key === 'Backspace') {
    handlePress('-')
  } else if (e.key === 'Enter') {
    handlePress('+')
  } else if (isSingleLetter(e.key.toLowerCase())) {
    handlePress(e.key)
  }
}

const isEnterKey = (key: string): boolean => key === '+'
const isDeleteKey = (key: string): boolean => key === '-'

const handlePress = async (key: string): Promise<void> => {
  if (isSingleLetter(key)) {
    if ($currentGuess.length < 5) {
      $currentGuess = $currentGuess + key
    }
  } else if (isDeleteKey(key)) {
    if ($currentGuess.length) {
      $currentGuess = $currentGuess.slice(0, $currentGuess.length - 1)
    }
  } else if (isEnterKey(key)) {
    handleNewGuess()
  }

  if (vibrationEnabled) {
    window.navigator.vibrate(10)
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
          disabled={disableKeyboard || (isEnterKey(key) && disableEnterKey) || (isDeleteKey(key) && disableDeleteKey)}
        >
          {#if isSingleLetter(key)}
            {key}
          {:else if isDeleteKey(key)}
            <span aria-hidden="true">
              <SkipIcon flipped={true} />
            </span>
            <span class="sr">Delete</span>
          {:else if isEnterKey(key)}
            <span aria-hidden="true">
              <PlayIcon />
            </span>
            <span class="sr">Enter</span>
          {/if}
        </button>
      {/each}
    </div>
  {/each}
</div>

<style lang="scss">
.keyboard {
  display: grid;
  grid-template-rows: repeat(3, 3.5rem);
  margin: 0 calc(-1rem + 5px);
  height: 100%;

  @media (min-height: 44rem) {
    grid-template-rows: repeat(3, 4rem);
  }

  @media (min-height: 50rem) {
    grid-template-rows: repeat(3, 4.2rem);
  }

  .row {
    display: flex;
    margin: 0 auto;
    width: 100%;

    + .row {
      margin-top: 5px;
    }
  }

  .row:nth-of-type(2) {
    max-width: calc(100% - 2.5rem)
  }

  button {
    font-size: 1.1rem;
    font-weight: var(--fontWeightNormal);
    flex: 1 1 3ch;
    text-transform: uppercase;
    background: transparent;
    border: 1.5px solid var(--lightAccent);
    border-radius: 0.25em;
    margin: 0;
    padding: 0;
    touch-action: manipulation;
    transition: background .6s cubic-bezier(0.645, 0.045, 0.355, 1), color .6s cubic-bezier(0.645, 0.045, 0.355, 1);
    color: var(--ink);
    line-height: 1;

    @media (min-width: 26rem) {
      font-size: 1.2rem;
    }

    &[data-key="-"],
    &[data-key="+"] {
      flex: 1 1 5ch;
      font-size: 0.9rem;
      padding: 0 0.5ch;
      color: var(--ink);
      transition: color .15s;

      &:disabled {
        color: var(--lightAccent);
      }

      @media (min-width: 26rem) {
        font-size: 1.1rem;
      }
    }

    &[data-key="-"] :global(svg) {
      width: 1.25rem;
      fill: currentColor;
    }
    
    &[data-key="+"] :global(svg) {
      width: 1.75rem;
    }
    
    + button {
      margin-left: 5px;
    }

    &.used {
      color: var(--lighterAccent);
      background: var(--lightestAccent);
      border-color: var(--lighterAccent);
    }

    &.included {
      color: var(--ink);
      border-color: var(--secondary);
      background: var(--secondary);
      opacity: 1;
    }
  }
}
</style>