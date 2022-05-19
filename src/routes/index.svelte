<script lang="ts">
  import { isSingleLetter } from '$lib/helpers'
  import { quintOut } from 'svelte/easing'
  import { fly } from 'svelte/transition'
  import { flip } from 'svelte/animate'

  let points: number = 80

  const keys = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['⏎', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '⌫'],
  ]

  let currentGuess: string = ''
  let previousGuesses: string[] = ['     ', '    ', '   ', '  ']
  $: renderedGuesses = [...previousGuesses, currentGuess]

  const handlePress = (key: string) => {
    if (isSingleLetter(key)) {
      if (currentGuess.length < 5) {
        currentGuess += key
      }
    } else if (key === '⏎' && currentGuess.length === 5) {
      previousGuesses = [...previousGuesses, currentGuess]
      if (previousGuesses.length > 4) {
        previousGuesses = [...previousGuesses].slice(1, previousGuesses.length)
      }
      currentGuess = ''
    } else if (key === '⌫') {
      if (currentGuess.length) {
        currentGuess = currentGuess.slice(0, currentGuess.length - 1)
      }
    }
  }

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
</script>

<svelte:window on:keyup={handleKeyUp} />

<main>
  <div class="container">
    <div class="power-bar">
      <div
        class="power-bar__fill"
        style="width: {points}%"
      ></div>
    </div>

    <ul class="guess-container">
      {#each previousGuesses as guess, row (guess)}
        <li 
          class="guess"
          out:fly|local="{{duration:400, easing: quintOut, y: -80 }}"
          in:fly|local="{{duration: 400, easing: quintOut, y: 80 }}"
          animate:flip={{duration: 400}}
        >
          {#each {length: 5} as _, col}
            <div class="guess-box">
              {guess[col]
                ? previousGuesses[row][col]
                : ''}
            </div>
          {/each}
        </li>
      {/each}
      <li 
      class="guess"
        out:fly|local="{{duration: row === 4 ? 0 : 400, easing: quintOut, y: -80 }}"
        in:fly|local="{{duration: row === 4 ? 400 : 0, easing: quintOut, y: 80 }}"
      >
        {#each {length: 5} as _, col}
          <div class="guess-box">
            {currentGuess[col]
              ? currentGuess[col]
              : ''}
          </div>
        {/each}
      </li>
      <!-- {#each {length: 5 - renderedGuesses.length } as emptyGuess, row (row)}
        <div 
          class="guess"
          in:fly="{{key: emptyGuess, duration: 300, easing: quintOut, y: 80 }}"
          out:fly="{{key: emptyGuess, duration: 300, easing: quintOut, y: -80 }}"
          animate:flip
        >
          {#each {length: 5} as _, col}
            <div class="guess-box">
              {''}
            </div>
          {/each}
        </div>
      {/each} -->
    </ul>

    <div class="keyboard">
      {#each keys as row}
      <div class="row">
        {#each row as key}
          <button on:click={() => handlePress(key)}>{key}</button>
        {/each}
      </div>
      {/each}
    </div>
  </div>
</main>


<style lang="scss">
*, *::before, *::after {
  box-sizing: border-box;
}

.container {
  width: 100%;
  max-width: 32rem;
  margin: 0 auto;
  padding: 1rem;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-content: space-between;
  align-items: space-between;
  justify-content: space-between;
}

.power-bar {
  width: 100%;
  border: 1px solid;
  border-radius: 2rem;
  height: 1rem;
  display: flex;
  align-content: stretch;

  .power-bar__fill {
    background: orange;
  }
}

.guess-container {
  display: grid;
  gap: 0.5rem 0;
  list-style-type: none;
  padding: 0;

  .guess {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: .5rem;

    .guess-box {
      width: 0;
      height: 0;
      padding: 50%;
      border: 2px solid #999;
      font-size: 2rem;
      text-transform: uppercase;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
    }
  }
}

.keyboard {
  display: grid;
  grid-template-rows: repeat(3, 4rem);

  .row {
    display: flex;
    margin: 0 auto;
    width: 100%;

    + .row {
      margin-top: 2px;
    }
  }

  .row:nth-of-type(2) {
    max-width: calc(100% - 2rem)
  }

  button {
    font-size: 1rem;
    flex: 1 1 3ch;
    text-transform: uppercase;

    + button {
      margin-left: 2px;
    }
  }
}
</style>