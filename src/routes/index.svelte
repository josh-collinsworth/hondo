<script lang="ts">
  import { isSingleLetter } from '$lib/helpers'
  import { quintOut } from 'svelte/easing'
  import { fly } from 'svelte/transition'
  import { flip } from 'svelte/animate'
  import { onMount } from 'svelte'
  
  import GuessContent from '$lib/components/game/GuessContent.svelte'

  const possibleCodeWords = ['charm', 'leapt', 'ivory', 'leaky', 'rapid', 'learn', 'stole', 'quote', 'stole', 'kinds', 'happy', 'fruit', 'bored', 'floss', 'bread', 'opens', 'filed', 'porch', 'rapid', 'steal', 'whale', 'whole', 'hoops', 'chose', 'style', 'maker', 'torch', 'trick', 'glaze', 'gaudy', 'space', 'chirp', 'vinyl', 'ogres', 'pluck', 'fluid', 'white', 'actor', 'minor', 'pouch', 'touch', 'truck', 'octet', 'timer', 'merit', 'title', 'built', 'belly']
  let points: number = 100
  let codeWord: string

  const keys = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['⏎', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '⌫'],
  ]

  let currentGuess: string = ''
  let previousGuesses: string[] = ['',' ','  ','   ','    ']

  onMount(() => {
    chooseRandomCodeWord()
  })

  const chooseRandomCodeWord = (): void => {
    const newWord = possibleCodeWords[Math.floor(Math.random() * possibleCodeWords.length)]
    if (newWord !== codeWord && !previousGuesses.includes(newWord)) {
      codeWord = newWord
      return
    }
    chooseRandomCodeWord()
  }

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

        if (partial + full === 10) {
          chooseRandomCodeWord()
        }
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
          <GuessContent {codeWord} {guess} {row} {previousGuesses} />
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


<style lang="scss" global>
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