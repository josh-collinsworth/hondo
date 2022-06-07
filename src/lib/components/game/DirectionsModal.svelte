<script lang="ts">  
  import ExampleGuess from './examples/ExampleGuess.svelte'
  import ExamplePowerBar from './examples/ExamplePowerBar.svelte'
  import Arrow from '../icon/Arrow.svelte'

  import { fade } from 'svelte/transition'
import Lifeline from '../icon/Lifeline.svelte'

  export let close: VoidFunction

  const listenForEscape = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') close()
  }
</script>


<svelte:window on:keyup={listenForEscape} />

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
      <div class="arrow">
        <Arrow />
      </div>
      <div>
        <ExampleGuess codeWord="along" guess="knife" />
        <ExampleGuess codeWord="along" guess="foggy" />
        <ExampleGuess codeWord="along" guess="aloof" />
        <ExampleGuess codeWord="along" guess="spoof" />
        <ExampleGuess codeWord="along" guess="proof" />
        <p class="small-print">…now guess a new code word!</p>
      </div>
    </div>


    <h2>Watch your life meter</h2>
    <p>Every guess drains one bar…</p>

    <div class="example-meter-holder">
      <ExampleGuess codeWord="chore" guess="wrong" />
      <ExamplePowerBar remainingAttempts={10} />
      <Arrow direction="down" />
      <ExamplePowerBar remainingAttempts={9} />
    </div>
      
    <p>…but a correct guess <strong>replenishes</strong> one bar instead!</p>
    
    <div class="example-meter-holder">
      <ExampleGuess codeWord="right" guess="right" />
      <ExamplePowerBar remainingAttempts={8} />
      <Arrow direction="down" />
      <ExamplePowerBar remainingAttempts={9} />
    </div>


    <h2 class="display-flex" style="align-items: center;">
      Stuck? Use a lifeline
      <span aria-hidden="true" class="info-button lifeline" style="margin-left: 0.5em;">
        <Lifeline />
      </span>
    </h2>

   

    <p>
   
      A lifeline solves the current code word&mdash;but at the cost of <strong>permanently</strong> shrinking your life meter!
    </p>

    <div class="example-meter-holder">
      <ExamplePowerBar remainingAttempts={4} />
      <Arrow direction="down" />
      <ExamplePowerBar remainingAttempts={5} maxRemainingAttempts={9} />
    </div>
      
    

    <h2>Try to score a Hondo</h2>
    <ul>
      <li>The primary goal of Hondo is: stay alive as long as possible, to get your score as high as possible!</li>
      <li>The secondary goal: try score a Hondo! The game ends when you get to 100.</li>
      <li>The final goal: score a Hondo in as few guesses as possible!</li>
    </ul>

    <hr>

    <h2>Hints and tips</h2>
  
    <ul>
      <li><strong>Watch the keyboard.</strong> It will remind you which letters aren't currently on the board.</li>
      <li><strong>Use lifelines wisely!</strong> Try to deploy them when they might save you the most guesses.</li>
      <li>If you don't have a good guess (and don't want to use a lifeline), try a word that will add as many new letters to the board as possible.</li>
      <li>If you can, try to keep every vowel on the board at all times.</li>
      <li><strong>Be patient</strong>; haste is costly. Getting a high score requires careful thought, and a bit of luck.</li>
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
    margin: 0;

    &.small-print {
      margin-bottom: 0;
      font-size: 0.8rem;
    }
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
      transform: rotate(-90deg);
    }

    @media (min-width: 32rem) {
      width: auto;

      .arrow { 
        width: auto;
        margin-top: -2rem;
        transform: rotate(180deg);
      }
    }
  }

  .example-meter-holder {
    display: grid;
    width: max-content;
    max-width: 100%;
    grid-template-columns: 100%;
    gap: 0.5rem;
    margin-top: 1rem;

    + p {
      margin-top: 2rem;
    }
  }

  hr {
    margin: 2rem 0;
    border: 0;
    border-bottom: 1px solid var(--secondary);
  }
</style>