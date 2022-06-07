<script lang="ts">
  import { isSingleLetter, handleNewGuess } from '$lib/js/helpers'
  import { currentGuess, previousGuesses, codeWord } from '$lib/js/state'

  import Arrow from '../icon/Arrow.svelte'
  import Checkmark from '../icon/Checkmark.svelte'

  import { tick } from 'svelte'
  import { get } from 'svelte/store'
  import { dev } from '$app/env'

  const keys = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['-', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '+'],
  ]

  $: lettersOnTheBoard = Array.from(new Set($previousGuesses.flatMap(word => [...word])))
  $: disableEnterKey = $currentGuess.length < 5
  $: disableDeleteKey = !$currentGuess.length

  const handleKeyUp = (e: KeyboardEvent): void => {
    if (!e.key) return
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
        currentGuess.set($currentGuess + key)
      }
    } else if (isDeleteKey(key)) {
      if ($currentGuess.length) {
        $currentGuess = $currentGuess.slice(0, $currentGuess.length - 1)
      }
    } else if (isEnterKey(key)) {
      handleNewGuess()
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
          {#if isSingleLetter(key)}
            {key}
          {:else if isDeleteKey(key)}
            <Arrow />
          {:else if isEnterKey(key)}
            <Checkmark />
          {/if}
        </button>
      {/each}
    </div>
  {/each}
</div>

<style lang="scss">
  .keyboard {
    display: grid;
    grid-template-rows: repeat(3, 2.2em);
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
      font-size: 1.1rem;
      flex: 1 1 3ch;
      text-transform: uppercase;
      background: var(--lightestAccent);
      border: 1px solid var(--lighterAccent);
      border-radius: 0.2rem;
      margin: 0;
      padding: 0;
      touch-action: manipulation;
      transition: background .6s ease-in-out;
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

        @media (min-width: 26rem) {
          font-size: 1.1rem;
        }
      }

      &[disabled] {
        color: var(--lightAccent);
      }

      + button {
        margin-left: 2px;
      }

      &.used {
        background: var(--lighterAccent);
      }

      &.included {
        background: var(--secondary);
      }
    }
  }
</style>