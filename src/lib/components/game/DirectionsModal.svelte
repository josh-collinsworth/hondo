<script lang="ts">
  import { STARTING_GUESSES } from '$lib/js/constants'

  import { fade } from 'svelte/transition'
  import ExampleGuess from './examples/ExampleGuess.svelte'

  export let close: VoidFunction
</script>

<div class="directions" on:click={close} transition:fade>
  <div class="directions__container">
    <h2>The goal is to guess as many code words as possible.</h2>

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
    
    <p>Your last five guesses stay on the board.</p>
          
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
        <p class="small-print">…same guesses, new code&nbsp;word</p>
      </div>
    </div>


    <h2>This meter shows how many attempts you have left.</h2>

    <div class="power-bar-container power-bar-example">
      <div class="power-bar">
        <div class="power-bar__fill" style="transform: scaleX(0.8); background-size: 125}%; width: 100%;" />
        <div class="power-bar__grid" style="grid-template-columns: repeat({ STARTING_GUESSES }, 1fr);">
          {#each Array.from({ length: STARTING_GUESSES }) as _}
            <div class="power-bar__grid-box" />
          {/each}
        </div>
      </div>
    </div>

    <ul>
      <li>You start with { STARTING_GUESSES } attempts.</li>
      <li><strong>Successfully guessing a code word replenishes one attempt!</strong></li>
    </ul>


    <h2>The longer you play, the shorter the meter gets.</h2>
    <div class="power-bar-container power-bar-example">
      <div class="power-bar" style="width: 7em;">
        <div class="power-bar__fill" style="transform: scaleX(0.3);" />
        <div class="power-bar__grid" style="grid-template-columns: repeat({ STARTING_GUESSES }, 1fr);">
          {#each Array.from({ length: STARTING_GUESSES }) as _, i}
          <div class="power-bar__grid-box" />
          {/each}
        </div>
      </div>
      <div class="power-bar__dots">
        {#each Array.from({ length: 10}) as _}
        <div class="power-bar__dot"></div>
        {/each}
      </div>
    </div>
    <ul>
      <li><strong>The game ends when your meter is empty!</strong></li>
      <li>Keep playing as long as you can!</li>
      <li>The maximum possible score is 100. How close can you get?</li>
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
    border: 2px solid var(--lightGray);
    background: var(--paper); 
    padding: 1rem;
    font-size: 1rem;
    overflow: auto;
  }

  .directions__container {
    width: 26rem;
    max-width: 100%;
    margin: 0 auto;
  }

  li {
    margin-top: 0.5rem;
    list-style-type: square;
    
    &::marker {
      color: var(--lightBlue);
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
    margin: 0 0 1rem;
    width: 10em;

    .power-bar {
      height: 1rem;
    }
  }

  ul {
    padding-left: 1rem;
  }

  h2 {
    font-size: 1.4rem;
    margin-top: 3rem;

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
    margin-top: 1rem;

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
</style>