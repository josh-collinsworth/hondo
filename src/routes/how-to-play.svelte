<script lang="ts">  
  import ExampleGuess from '$lib/components/game/examples/ExampleGuess.svelte'
  import ExamplePowerBar from '$lib/components/game/examples/ExamplePowerBar.svelte'
  import Arrow from '$lib/components/icon/Arrow.svelte'

  import Lifeline from '$lib/components/icon/Lifeline.svelte'
</script>


<div class="directions">
  <div class="directions__container">
    <h1>How to play 
      <a href="/" class="back-link">Back</a>
    </h1>

    <h2>Guess the code word</h2>

    <div class="width-max-content">
      <ExampleGuess codeWord="xrxxx" guess="ready" />
    </div>

    <p>
      The code word includes <strong>R</strong>, but it's not the&nbsp;first&nbsp;letter.
    </p>
    
    <br />
    
    <div class="width-max-content">
      <ExampleGuess codeWord="xxxxt" guess="smart" />
    </div>

    <p>
      The code word ends with <strong>T</strong>.
    </p>


    <h2>Watch your score and life gauge</h2>
    <p>Every attempt drains one bar from the gauge…</p>

    <div class="example-diagram">
      <ExamplePowerBar remainingAttempts={10} />
      <Arrow direction="down" />
      <ExampleGuess codeWord="xxxxr" guess="wrong" />
      <Arrow direction="down" />
      <ExamplePowerBar remainingAttempts={9} />
    </div>
      
    <p>…but a correct guess <strong>replenishes</strong> one bar instead (and also gives you a point)!</p>
    
    <div class="example-diagram">
      <ExamplePowerBar remainingAttempts={9} />
      <Arrow direction="down" />
      <ExampleGuess codeWord="right" guess="right" />
      <Arrow direction="down" />
      <ExamplePowerBar remainingAttempts={10} score={1} />
    </div>

    
    <h2>When you guess a code word, it's replaced with a new one.</h2>
    
    <p>However, your last five guesses stay on the board as clues.</p>
          
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
        <p class="small-print">…now guess a new code word</p>
      </div>
    </div>


    <h2 class="display-flex" style="align-items: center;">
      Stuck? Use a lifeline
      <span aria-hidden="true" class="info-button lifeline" style="margin-left: 0.5em;">
        <Lifeline />
      </span>
    </h2>

    <p>
      A lifeline solves the current code word&mdash;but at the cost of temporarily shrinking your life gauge.
    </p>

    <div class="example-diagram">
      <ExamplePowerBar remainingAttempts={4} score={9} />
      <Arrow direction="down" />
      <span aria-hidden="true" class="info-button lifeline" style="margin: auto;">
        <Lifeline />
      </span>
      <Arrow direction="down" />
      <ExamplePowerBar remainingAttempts={5} score={10} maxRemainingAttempts={9} />
    </div>

    <p>You can use multiple lifelines at once, but the penalty will last longer.</p>


    <h2>Try to score a Hondo</h2>
    <p>There are three goals to Hondo:</p>
    <ol>
      <li>Get your score as high as possible;</li>
      <li>Eventually, score a Hondo (the game ends when you get to 100);</li>
      <li>Once you can score a Hondo, try to do so in as few guesses as possible!</li>
    </ol>

    <hr>

    <h2>Hints and tips</h2>
  
    <ul>
      <li><strong>Watch the keyboard.</strong> It will remind you which letters aren't currently on the board.</li>
      <li><strong>Use lifelines wisely!</strong> Try to deploy them when they might save you the most guesses.</li>
      <li>Try to keep as many different letters on the board as possible at all times, especially vowels.</li>
      <li><strong>Be patient</strong>; haste is costly. Getting a high score requires careful thought, and a bit of luck.</li>
    </ul>

    <a href="/" class="back-link">Back to game</a>
  </div>
</div>


<style lang="scss">
  h1 {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: baseline;
  }

  .directions {
    border: 2px solid var(--lightAccent);
    background: var(--paper); 
    padding: 1rem;
    font-size: 1rem;
    overflow: auto;
  }

  .directions__container {
    width: 30rem;
    max-width: 100%;
    margin: 1rem auto;
  }


  li {
    margin-top: 0.5rem;

    &::marker {
      color: var(--secondary);
    }
  }

  ul li {
    list-style-type: square;
  }

  p {
    margin: 0;

    &.small-print {
      margin: 0.5rem 0 0;
      font-size: 0.8rem;
    }
  }

  ul {
    padding-left: 1rem;
  }

  ol {
    padding-left: 1.5rem;
  }

  h2 {
    font-size: 1.5rem;
    margin-top: 4rem;

    &:first-child {
      margin-top: 0;
    }
  }

  .example-guess-holder {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
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

  .example-diagram {
    display: grid;
    width: 100%;
    max-width: 100%;
    grid-template-columns: 100%;
    gap: 0.5rem;
    margin-top: 1rem;
    padding: 2rem 1.5rem;
    border: 2px solid var(--lighterAccent);
    border-radius: 0.5rem;

    + p {
      margin-top: 1rem;
    }
  }

  hr {
    margin: 4rem 0;
    border: 0;
    border-bottom: 1px solid var(--secondary);

    + * {
      margin-top: 0;
    }
  }

  .back-link {
    font-size: 1rem;
    margin-top: 2rem;
    display: inline-block;
    color: var(--darkBlue);
  }
</style>