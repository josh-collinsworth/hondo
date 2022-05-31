<script lang="ts">
  import { STARTING_GUESSES } from '$lib/js/constants'

  import { fade } from 'svelte/transition'
  import ExampleGuess from './examples/ExampleGuess.svelte'

  export let close: VoidFunction
</script>

<div class="directions" on:click={close} transition:fade>
  <div class="directions__container">
    <h2>The goal is to guess as many code words as possible.</h2>

    <ExampleGuess codeWord="flick" guess="chore" />
    <p>“C” is in the code word, but it's not the first letter.</p>

    <ExampleGuess codeWord="venom" guess="vital" />
    <p>The code word starts with “V.”</p>

    
    <h2>This meter shows how many attempts you have left.</h2>

    <div class="power-bar- power-bar-example">
      <div class="power-bar" style="width: 100%; max-width: 18rem;">
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
      <li>When you guess a code word, you get one back!</li>
    </ul>

    <h2>When you guess a code word, it's replaced with a new one.</h2>
    
    <p>Your last five guesses stay on the board to hint at the new code word:</p>
          
    <div class="example-guess-holder">
      <div>
        <ExampleGuess codeWord="proof" guess="softy" />
        <ExampleGuess codeWord="proof" guess="frown" />
        <ExampleGuess codeWord="proof" guess="aloof" />
        <ExampleGuess codeWord="proof" guess="spoof" />
        <ExampleGuess codeWord="proof" guess="proof" />
        <p class="small-print">The word was “proof”</p>
      </div>
      <div class="arrow right">➡️</div>
      <div class="arrow down">⬇️</div>
      <div>
        <ExampleGuess codeWord="along" guess="softy" />
        <ExampleGuess codeWord="along" guess="frown" />
        <ExampleGuess codeWord="along" guess="aloof" />
        <ExampleGuess codeWord="along" guess="spoof" />
        <ExampleGuess codeWord="along" guess="proof" />
        <p class="small-print">Can you guess the new word?</p>
      </div>
    </div>

        

    <h2>The longer you play, the shorter the meter gets!</h2>
    <div class="power-bar-container power-bar-example">
      <div class="power-bar" style="width: 60%; max-width: 10.8rem;">
        <div class="power-bar__fill" style="transform: scaleX(0.67); background-size: 200%; width: 100%;" />
        <div class="power-bar__grid" style="grid-template-columns: repeat({ STARTING_GUESSES }, 1fr); width: 166.66%;">
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
      <li>The game ends when your meter is empty.</li>
      <li>Keep playing as long as you can to get your score as high as possible!</li>
      <li>(The maximum possible score is 100!)</li>
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
    border: 2px solid currentColor;
    background: var(--lightestGray); 
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
  }

  p {
    margin-top: 0.5rem;

    &.small-print {
      margin-bottom: 0;
      font-size: 0.8rem;
    }
  }

  .power-bar-example {
    max-width: 16rem;
    margin: 0 0 1rem;

    .power-bar {
      max-width: unset;
      height: 1rem;
    }
  }

  ul {
    padding-left: 1rem;
  }

  h2 {
    font-size: 1.4rem;

    &:not(:first-child) {
      margin-top: 3rem;
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