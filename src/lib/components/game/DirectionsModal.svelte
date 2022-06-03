<script lang="ts">
  import { STARTING_GUESSES } from '$lib/js/constants'

  import { fade } from 'svelte/transition'
  import ExampleGuess from './examples/ExampleGuess.svelte'

  export let close: VoidFunction
</script>

<div class="directions" on:click={close} transition:fade>
  <div class="directions__container">
    <h1>How to play</h1>
    <h2>Guess the code word</h2>

    <ExampleGuess codeWord="xrxxx" guess="ready" />
    <p>
      The code word includes <strong>R</strong>, but it's not the&nbsp;first&nbsp;letter.
    </p>
    
    <br />
    
    <ExampleGuess codeWord="xxxxt" guess="smart" />
    <p>
      The code word ends with <strong>T</strong>.
    </p>
    

    <h2>When you guess a code word, it's replaced with a new one.</h2>
    
    <p>However, your last five guesses stay on the board.</p>
          
    <div class="example-guess-holder">
      <div>
        <ExampleGuess codeWord="proof" guess="knife" />
        <ExampleGuess codeWord="proof" guess="foggy" />
        <ExampleGuess codeWord="proof" guess="aloof" />
        <ExampleGuess codeWord="proof" guess="spoof" />
        <ExampleGuess codeWord="proof" guess="proof" />
        <p class="small-print">Got the word <strong>proof</strong>…</p>
      </div>
      <div class="arrow right">➡️</div>
      <div class="arrow down">⬇️</div>
      <div>
        <ExampleGuess codeWord="along" guess="knife" />
        <ExampleGuess codeWord="along" guess="foggy" />
        <ExampleGuess codeWord="along" guess="aloof" />
        <ExampleGuess codeWord="along" guess="spoof" />
        <ExampleGuess codeWord="along" guess="proof" />
        <p class="small-print">…now guess a new code word.</p>
      </div>
    </div>


    <h2>Keep an eye on your remaining attempts:</h2>

    <div class="power-bar-container power-bar-example">
      <div class="power-bar">
        <div class="power-bar__fill" style="transform: scaleX(0.9)"></div>
        <div class="power-bar__grid" style="grid-template-columns: repeat({ STARTING_GUESSES }, 1fr);">
          {#each Array.from({ length: STARTING_GUESSES }) as _, i}
            <div 
              class="power-bar__grid-box"
              class:filled={i < 9}
            >
              <div class="power-bar__grid-box-fill" />
            </div>
          {/each}
        </div>
      </div>
    </div>

    <ul>
      <li>Every guess costs one; a correct guess replenishes one!</li>
    </ul>


    <h2>The longer you play, the harder it&nbsp;gets!</h2>
    <div class="power-bar-container power-bar-example">
      <div class="power-bar__divider" style="transform: translateX(5.3em)"></div>
      <div class="power-bar">
        <div class="power-bar__fill" style="transform: scaleX(0.4)"></div>
        <div class="power-bar__grid" style="grid-template-columns: repeat({ STARTING_GUESSES }, 1fr);">
          {#each Array.from({ length: STARTING_GUESSES }) as _, i}
            <div class="power-bar__grid-box" class:filled={i < 3}>
              <div class="power-bar__grid-box-fill" />
            </div>
          {/each}
        </div>
      </div>
    </div>
    <ul>
      <li>Keep playing as long as you can to get your score as high as possible!</li>
    </ul>

    <hr>

    <h2>Hints and tips</h2>
  
    <ul>
      <li>
        Try to keep every vowel on the board at all times, especially <b>E</b> and <b>A</b>.
      </li>
      <li>As you might expect, <b>R</b>, <b>S</b>, <b>T</b>, <b>L</b>, and <b>N</b> are the most common consonants.</li>
      <li>If you don't have a good guess, try one that will add as many new letters to the board as possible.</li>
      <li>Watch the keyboard! It will remind you what letters are in the code word, and which aren't currently on the board.</li>
    </ul>
  </div>
</div>


<style lang="scss">
  .directions {
    position: fixed;
    z-index: 10;
    width: calc(100vw - 2rem);
    height: calc(100vh - 2rem);
    height: calc(100dvh - 2rem);
    top: 1rem;
    left: 1rem;
    border: 2px solid var(--lightAccent);
    background: var(--paper); 
    padding: 1rem;
    font-size: 1rem;
    overflow: auto;
  }

  .directions__container {
    width: 26rem;
    max-width: 100%;
    margin: 1rem auto;
  }

  li {
    margin-top: 0.5rem;
    list-style-type: square;
    
    &::marker {
      color: var(--secondary);
    }
  }

  p {
    margin-top: 0.5rem;
    margin-bottom: 0;

    &.small-print {
      margin-bottom: 0;
      font-size: 0.8rem;
    }
  }

  .power-bar-example {
    width: 10em;
  }

  ul {
    padding-left: 1rem;
  }

  h2 {
    font-size: 1.5rem;
    margin-top: 3.5rem;

    &:first-child {
      margin-top: 0;
    }
  }

  .example-guess-holder {
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    align-items: center;
    width: min-content;
    margin-top: 2rem;

    .arrow {
      padding: 1rem;
      text-align: center;
      width: 100%;

      &.right {
        display: none;
      }
    }

    @media (min-width: 32rem) {
      width: auto;

      .arrow { width: auto; }
      .arrow.right { display: block; }
      .arrow.down { display: none; }
    }
  }

  hr {
    margin: 2rem 0;
    border: 0;
    border-bottom: 1px solid var(--secondary);
  }
</style>