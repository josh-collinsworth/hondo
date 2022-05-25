<script lang="ts">
  import { isSingleLetter } from '$lib/helpers'
  import { quintOut } from 'svelte/easing'
  import { fly } from 'svelte/transition'
  import { flip } from 'svelte/animate'
  import { onMount, tick } from 'svelte'
  import { MAX_SCORE } from '$lib/helpers'
  import legalGuesses from '$lib/js/legalGuesses'
  import codeWords from '$lib/js/codeWords'
  
  import GuessContent from '$lib/components/game/GuessContent.svelte'
  import FlashModal from '$lib/components/game/FlashModal.svelte';

  let points: number = MAX_SCORE
  let codeWord: string
  let discoveredCodeWord: string = ''
  let isLoadingNewWord = false

  $: lettersOnTheBoard = Array.from(new Set(previousGuesses.flatMap(word => [...word])))

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
    const newWord = codeWords[Math.floor(Math.random() * codeWords.length)]
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

  const isValidGuess = (guess: string): boolean => {
    return guess.length === 5 && legalGuesses.includes(guess.toLowerCase())
  }

  const handlePress = async (key: string) => {
    if (isSingleLetter(key)) {
      if (currentGuess.length < 5) {
        currentGuess += key
      }
    } else if (key === '⏎' && isValidGuess(currentGuess)) {
      if (!previousGuesses.includes(currentGuess)) {
        previousGuesses = [...previousGuesses, currentGuess]
        const [partial, full] = evaluateGuess(currentGuess)
        const addedPoints = partial + full + full
        currentGuess = ''

        const adjustedPoints = points - 10 + addedPoints
        if (adjustedPoints > MAX_SCORE) {
          points = MAX_SCORE
        } else {
          points = adjustedPoints
        }

        if (partial + full === 10) {
          discoveredCodeWord = codeWord
          setTimeout(async () => {
            isLoadingNewWord = true
            chooseRandomCodeWord()
            await tick()
            isLoadingNewWord = false
          }, 1000
          )
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

    <!-- TODO: should this be moved? It's just for fireworks -->
    <FlashModal {discoveredCodeWord} />

    <div class="power-bar">
      <div
        class="power-bar__fill"
        style="transform: scaleX({points / MAX_SCORE})"
      >
      </div>
      <div class="power-bar__score">
        {points}/{MAX_SCORE}
      </div>
    </div>

    <ul class="guess-container" style="padding: 0; margin: 0;">
      {#each previousGuesses as guess, row (guess)}
        <li 
          class="guess"
          out:fly|local="{{ duration: 500, easing: quintOut, y: -80 }}"
          in:fly|local="{{ duration: 500, easing: quintOut, y: 80 }}"
          animate:flip|local={{ duration: 400 }}
        >
          <GuessContent {codeWord} {guess} {row} {previousGuesses} {isLoadingNewWord} />
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
          <button 
            on:click={() => handlePress(key)}
            class:used={lettersOnTheBoard.includes(key)}
          >
            {key}
          </button>
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

body {
  margin: 0;
}

.container {
  width: 100%;
  max-width: 32rem;
  margin: 0 auto;
  padding: 1rem 1rem 3px;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-content: space-between;
  align-items: space-between;
  justify-content: space-between;
  font-size: 10vw;

  @media (min-width: 32rem) {
    font-size: 1rem;
  }
}

.power-bar {
  width: 100%;
  border: 1px solid;
  border-radius: 2rem;
  height: 1.5rem;
  display: flex;
  align-content: stretch;
  overflow: hidden;
  position: relative;

  .power-bar__fill {
    transform-origin: left;
    background: orange;
    width: 100%;
    transition: transform .3s cubic-bezier(0.23, 1, 0.320, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    height: inherit;
  }
  .power-bar__score {
    position: absolute;
    height: 100%;
    width: 100%;
    text-align: center;
    left: 0;
    top: 0;
    line-height: 1.5rem;
  }
}

.guess-container {
  display: grid;
  gap: 0.5rem 0;
  list-style-type: none;
  padding: 0;
  grid-template-rows: repeat(6, auto);

  .guess {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: .5rem;
    height: 1.6em;

    @media (min-width: 32rem) {
      height: 5.6em;
    }
  }
}

.keyboard {
  display: grid;
  grid-template-rows: repeat(3, 4rem);
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
    max-width: calc(100% - 2rem)
  }

  button {
    font-size: 1rem;
    flex: 1 1 3ch;
    text-transform: uppercase;
    background: #eee;
    border: 1px solid #666;
    border-radius: 0.2rem;

    + button {
      margin-left: 2px;
    }

    &.used {
      background: #ccc;
    }
  }
}
</style>