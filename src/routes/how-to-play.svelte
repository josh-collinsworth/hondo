<script lang="ts">  
  import ExampleGuess from '$lib/components/game/examples/ExampleGuess.svelte'
  import ExamplePowerBar from '$lib/components/game/examples/ExamplePowerBar.svelte'
  import Arrow from '$lib/components/icon/Arrow.svelte'

  import Lifeline from '$lib/components/icon/Lifeline.svelte'
</script>


<svelte:head>
  <title>How to play Hondo</title>
</svelte:head>


<div class="directions">
  <div class="directions__container">
    <h1>How to play Hondo
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

    
    <h2>When you guess the code word, the game continues with a new one</h2>
    
    <p>However, your five most recent guesses stay on the board as clues.</p>
          
    <div class="example-guess-holder">
      <div>
        <ExampleGuess codeWord="proof" guess="knife" />
        <ExampleGuess codeWord="proof" guess="foggy" />
        <ExampleGuess codeWord="proof" guess="aloof" />
        <ExampleGuess codeWord="proof" guess="spoof" />
        <ExampleGuess codeWord="proof" guess="proof" />
        <p class="small-print">Got one code word (proof)</p>
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
        <p class="small-print">Now guess the next.</p>
      </div>
    </div>


    <h2>Watch your score &amp; life gauge</h2>
    <p>Every incorrect guess drains the gauge…</p>

    <div class="example-diagram">
      <ExamplePowerBar remainingAttempts={10} />
      <Arrow direction="down" />
      <ExampleGuess codeWord="xxxxr" guess="wrong" />
      <Arrow direction="down" />
      <ExamplePowerBar remainingAttempts={9} />
    </div>
      
    <p>…but a correct guess gives you a point, and <strong>replenishes</strong> the gauge instead!</p>
    
    <div class="example-diagram">
      <ExamplePowerBar remainingAttempts={9} />
      <Arrow direction="down" />
      <ExampleGuess codeWord="right" guess="right" />
      <Arrow direction="down" />
      <ExamplePowerBar remainingAttempts={10} score={1} />
    </div>


    <h2>Bonus points</h2>

    <p>You'll get a bonus point if you guess a new code word within two attempts of solving the last one.</p> 
    
    <div class="example-diagram">
      <div class="display-flex center-content position-relative width-max-content margin-auto">
        <ExampleGuess codeWord="snout" guess="snout" />
        <div class="example-score">
          +1
        </div>
      </div>
      <Arrow direction="down" />
      <div class="display-flex center-content position-relative width-max-content margin-auto">
        <ExampleGuess codeWord="thank" guess="train" />
      </div>
      <Arrow direction="down" />
      <div class="display-flex center-content position-relative width-max-content margin-auto">
        <ExampleGuess codeWord="thank" guess="thank" />
        <div class="example-score">
          +2
        </div>
      </div>
    </div>

    <p>You'll get an <strong>extra</strong> bonus point for every word in a consecutive streak of three or more!</p>

    <div class="example-diagram">
      <div class="display-flex center-content position-relative width-max-content margin-auto">
        <ExampleGuess codeWord="store" guess="store" />
        <div class="example-score">
          +1
        </div>
      </div>
      <Arrow direction="down" />
      <div class="display-flex center-content position-relative width-max-content margin-auto">
        <ExampleGuess codeWord="other" guess="other" />
        <div class="example-score">
          +2
        </div>
      </div>
      <Arrow direction="down" />
      <div class="display-flex center-content position-relative width-max-content margin-auto">
        <ExampleGuess codeWord="reign" guess="reign" />
        <div class="example-score">
          +3
        </div>
      </div>
      <Arrow direction="down" />
      <div class="display-flex center-content position-relative width-max-content margin-auto">
        <ExampleGuess codeWord="plays" guess="plays" />
        <div class="example-score">
          +4
        </div>
      </div>
    </div>

    <!-- <h2 class="display-flex" style="align-items: center;">
      Stuck? Use a lifeline
      <span aria-hidden="true" class="info-button lifeline" style="margin-left: 0.5em;">
        <Lifeline />
      </span>
    </h2>

    <p>
      A lifeline solves the current code word for you&mdash;but at the cost of temporarily shrinking your life gauge.
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
    
    <p>Your gauge will slowly recover. You can use more lifelines during recovery, but the penalty is increasingly severe.</p> -->


    <h2>The goal</h2>
    <p>The game ends when either:</p>
    <ol>
      <li>
        Your lifeline is empty; or
      </li>
      <li>
        You've scored a Hondo (100).
      </li>
    </ol>
    <p>Get your score as high as possible, as fast as possible!</p>

    <hr>

    <h2>Hints and tips</h2>
  
    <ul>
      <li><strong>Watch the keyboard.</strong> It shows which letters aren't currently on the board, which can be a big hint.</li>
      <!-- <li><strong>Use lifelines wisely.</strong> They can save guesses, get you out of a jam, <strong>or</strong> keep a streak alive for extra bonus points!</li> -->
      <li>Try to keep common letters, especially vowels, on the board at all times.</li>
      <li>Use shuffles wisely.</li>
      <li><strong>Be patient</strong>; haste is costly. Getting a high score requires logic, lifelines, and luck.</li>
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
    padding: 1rem 1rem 3rem;
    font-size: 1rem;
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

    + p {
      margin-top: 1rem;
    }

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
    margin: 5rem 0 1rem;

    &:first-child {
      margin-top: 0;
    }
  }

  .example-guess-holder {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: 2rem 0 1rem;
    border: 2px solid var(--lighterAccent);
    border-radius: 0.5rem;
    padding: 2rem 1.5rem;
    
    .arrow {
      padding: 1rem;
      text-align: center;
      width: 100%;
      transform: rotate(-90deg);
    }
    
    @media (min-width: 32rem) {
      justify-content: space-between;

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
      margin-top: 2rem;
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

  .example-score {
    position: absolute;
    right: -2em;
    font-weight: bold;
  }
</style>