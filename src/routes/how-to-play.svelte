<script lang="ts">  
  import ExampleGuess from '$lib/components/game/examples/ExampleGuess.svelte'
  import ExamplePowerBar from '$lib/components/game/examples/ExamplePowerBar.svelte'
  import Arrow from '$lib/components/icon/Arrow.svelte'
  import Shuffle from '$lib/components/icon/ShuffleIcon.svelte'
  import MenuButton from '$lib/components/MenuButton.svelte'
</script>


<svelte:head>
  <title>How to play Hondo</title>
  <meta name="description" content="Learn how to play Hondo, and get some tips and tricks for better scores!">
</svelte:head>


<div class="directions">
  <div class="directions__container">
    <MenuButton />
    <img src="/logo.svg" style="width: 12rem;" alt="Hondo">
    <h1>How to play</h1>

    <h2>Guess as many code words as you&nbsp;can</h2>
    
    <div class="width-max-content" style="margin: 2rem 0 0.5rem">
      <ExampleGuess codeWord="xrxxx" guess="ready" />
    </div>

    <p>
      The code word includes <strong>R</strong>, but it's not the&nbsp;first&nbsp;letter.
    </p>
    
    <div class="width-max-content" style="margin: 2rem 0 0.5rem">
      <ExampleGuess codeWord="xxxxt" guess="smart" />
    </div>

    <p>
      The code word ends with <strong>T</strong>.
    </p>

    
    <h2>When you guess one, the game continues with a new one</h2>
    
    <p><em>However</em>, your five most recent guesses stay on the board as clues.</p>
          
    <div class="example-diagram">
      <div>
        <ExampleGuess codeWord="proof" guess="knife" />
        <ExampleGuess codeWord="proof" guess="foggy" />
        <ExampleGuess codeWord="proof" guess="aloof" />
        <ExampleGuess codeWord="proof" guess="spoof" />
        <ExampleGuess codeWord="proof" guess="proof" />
        <p class="small-print">Got one code word (proof)…</p>
      </div>
      <Arrow direction="down" />
      <div>
        <ExampleGuess codeWord="along" guess="knife" />
        <ExampleGuess codeWord="along" guess="foggy" />
        <ExampleGuess codeWord="along" guess="aloof" />
        <ExampleGuess codeWord="along" guess="spoof" />
        <ExampleGuess codeWord="along" guess="proof" />
        <p class="small-print">…now guess the next.</p>
      </div>
    </div>


    <h2>Watch your score &amp; life gauge</h2>
    <p>Every incorrect guess drains one life…</p>

    <div class="example-diagram">
      <ExamplePowerBar remainingAttempts={10} />
      <Arrow direction="down" />
      <ExampleGuess codeWord="xxxxr" guess="wrong" />
      <Arrow direction="down" />
      <ExamplePowerBar remainingAttempts={9} />
    </div>
      
    <p>…but a correct guess gives you a point, and <em>replenishes</em> one life instead!</p>
    
    <div class="example-diagram">
      <ExamplePowerBar remainingAttempts={9} />
      <Arrow direction="down" />
      <ExampleGuess codeWord="right" guess="right" />
      <Arrow direction="down" />
      <ExamplePowerBar remainingAttempts={10} score={1} />
    </div>


    <h3>Streak bonus</h3>

    <p>You get a bonus point for every consecutive successful guess after the first.</p>

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
        <ExampleGuess codeWord="their" guess="their" />
        <div class="example-score">
          +3
        </div>
      </div>
    </div>


    <h2 class="display-flex" style="align-items: center;">
      Need help? Try shuffling!
    </h2>

    <p>
      Hit the <strong>shuffle button</strong> any time to replace the board with five random new guesses!
    </p>

    <div class="example-diagram">
      <ExamplePowerBar remainingAttempts={10} />
      <div>
        <ExampleGuess codeWord="boxer" guess="clang" />
        <ExampleGuess codeWord="boxer" guess="chimp" />
        <ExampleGuess codeWord="boxer" guess="chomp" />
        <ExampleGuess codeWord="boxer" guess="flaws" />
        <ExampleGuess codeWord="boxer" guess="flaky" />
      </div>
      <Arrow direction="down" />
      <span aria-hidden="true" class="info-button shuffle-button" style="margin: auto;">
        <Shuffle />
      </span>
      <Arrow direction="down" />
      <ExamplePowerBar remainingAttempts={7} />
      <div>
        <ExampleGuess codeWord="boxer" guess="brown" />
        <ExampleGuess codeWord="boxer" guess="oxide" />
        <ExampleGuess codeWord="boxer" guess="regal" />
        <ExampleGuess codeWord="boxer" guess="epoxy" />
        <ExampleGuess codeWord="boxer" guess="flown" />
      </div>
    </div>

    <p><strong>Shuffling is a key strategy</strong>; it helps replace unhelpful guesses, <strong>and</strong> keeps bonus streaks alive!</p>

    <p>However, <strong>shuffling costs 3 life</strong>! Use shuffles wisely.</p>

    <h2>The goal</h2>
    <p>The game ends when either:</p>
    <ol>
      <li>
        Your life gauge is empty; or
      </li>
      <li>
        You've scored a Hondo (100).
      </li>
    </ol>
    <p>Get your score as high as possible, as fast as possible.</p>

    <hr>

    <h2>Hints and tips</h2>
  
    <ul>
      <li><strong>Look at the keyboard</strong>. It shows which letters aren't currently on the board, which can be a big hint.</li>
      <li><strong>Use shuffles strategically</strong>. They can get you out of a jam, and can also keep streaks alive for bonus points.</li>
      <li>If you can, try to keep common letters on the board at all times, especially vowels.
      </li>
      <li><strong>Be patient</strong>; haste is costly. Getting a high score requires logic, strategy, and luck.</li>
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
    width: 28rem;
    max-width: 100%;
    margin: 1rem auto;
  }

  ul, ol {
    margin: 2rem 0;
  }


  li {
    margin-top: 1rem;

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
      text-align: center;
    }
  }

  ul {
    padding-left: 1rem;
  }

  ol {
    padding-left: 1.5rem;
  }

  h2 {
    font-size: 1.6rem;
    margin: 5rem 0 1rem;

    &:first-child {
      margin-top: 0;
    }
  }

  h3 {
    margin-top: 3rem;
  }

  .example-diagram {
    display: grid;
    width: 100%;
    max-width: 100%;
    grid-template-columns: 100%;
    gap: 0.75rem;
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
    font-size: 1.5rem;
    font-weight: var(--fontWeightBold);
  }

  .directions :global(.menu-button) {
    position: fixed;
    top: 1rem;
    right: 1rem;
  }
</style>
