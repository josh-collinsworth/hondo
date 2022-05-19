<script lang="ts">
  import { isSingleLetter, stringContainsLetter,  } from '$lib/helpers'
  import { quintOut } from 'svelte/easing'
  import { fly } from 'svelte/transition'
  import { flip } from 'svelte/animate'

  let points: number = 100
  let codeWord: string = 'charm'

  const keys = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['⏎', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '⌫'],
  ]

  let currentGuess: string = ''
  let previousGuesses: string[] = ['',' ','  ','   ','    ']

  const evaluateGuess = (guess: string): number[] => {
    const guessArray = [...guess]
    const codeWordArray = [...codeWord]
    let partial = 0
    let full = 0

    for (let i = 0; i < 5; i++) {
      if (codeWordArray.includes(guessArray[i])) {
        partial++
      }
      if (codeWordArray[i] === guessArray[i]) {
        full++
      }
    }
    return [partial, full]
  }

  const handlePress = (key: string) => {
    if (isSingleLetter(key)) {
      if (currentGuess.length < 5) {
        currentGuess += key
      }
    } else if (key === '⏎' && currentGuess.length === 5) {
      if (!previousGuesses.includes(currentGuess)) {
        previousGuesses = [...previousGuesses, currentGuess]
        const [partial, full] = evaluateGuess(currentGuess)
        const addedPoints = partial + full + full
        currentGuess = ''
        points = points - 10 + addedPoints
      }
      if (previousGuesses.length > 5) {
        previousGuesses = [...previousGuesses].slice(1, previousGuesses.length)
      }
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
  <input type="text" bind:value={codeWord} />
  <div class="container">
    <div class="power-bar">
      <div
        class="power-bar__fill"
        style="transform: scaleX({points})"
      ></div>
    </div>

    <ul class="guess-container">
      {#each previousGuesses as guess, row (guess)}
        <li 
          class="guess"
          out:fly|local="{{duration: 500, easing: quintOut, y: -80 }}"
          in:fly|local="{{duration: 500, easing: quintOut, y: 80 }}"
          animate:flip|local={{duration: 400}}
        >
          {#each {length: 5} as _, col}
            <div class="guess-box" in:fly="{{duration: 500, easing: quintOut, y: 40, delay: col * 40 }}">
              <span>
                {guess[col]
                  ? previousGuesses[row][col]
                  : ''}
              </span>
            </div>
          {/each}
        
          {#if stringContainsLetter(guess)}
            {#each evaluateGuess(guess) as hintNumber, i}
              <div
                class="guess-box hint {i ? 'full' : 'partial'}"
                in:fly="{{duration: 500, easing: quintOut, y: 40, delay: 280 }}"
              >
                {hintNumber}
              </div>
            {/each}
          {/if}
       
        </li>
      {/each}
      <li 
      class="guess"
        out:fly|local="{{duration: 400, easing: quintOut, y: -80 }}"
        in:fly|local="{{duration: 400, easing: quintOut, y: 80 }}"
      >
        {#each {length: 5} as _, col}
          <div class="current-guess-box">
            {currentGuess[col]
              ? currentGuess[col]
              : ''}
          </div>
        {/each}
      </li>
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
  font-family: sans-serif;
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
  font-size: 5vw;

  @media (min-width: 32rem) {
    font-size: 1rem;
  }
}

.power-bar {
  width: 100%;
  border: 1px solid;
  border-radius: 2rem;
  height: 1rem;
  display: flex;
  align-content: stretch;
  overflow: hidden;

  .power-bar__fill {
    transform-origin: left;
    background: orange;
    width: 1%;
    transition: transform .3s cubic-bezier(0.23, 1, 0.320, 1);
  }
}

.guess-container {
  display: grid;
  gap: 0.5rem 0;
  list-style-type: none;
  padding: 0;

  .guess {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
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
      
      &.hint {
        font-weight: bold;
        background: skyblue;
        color: #fff;
        border: 0;
        border-radius: 5em;
      }

      &.full {
        background: orange;
      }
    }

    .current-guess-box {
      @extend .guess-box;

      border: 0;
      border-bottom: 2px solid #999;
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