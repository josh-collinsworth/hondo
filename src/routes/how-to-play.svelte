<script lang="ts">  
import BonusDisplay from '$lib/components/game/BonusDisplay.svelte'
import ExampleGuess from '$lib/components/game/examples/ExampleGuess.svelte'
import ExamplePowerBarWide from '$lib/components/game/examples/ExamplePowerBarWide.svelte'
import Arrow from '$lib/components/icon/Arrow.svelte'
import ShuffleIcon from '$lib/components/icon/ShuffleIcon.svelte'
import Shuffle from '$lib/components/icon/ShuffleIcon.svelte'
import SkipIcon from '$lib/components/icon/SkipIcon.svelte'
import MenuButton from '$lib/components/MenuButton.svelte'
import { SHUFFLE_COST, SKIP_COST } from '$lib/js/constants'
</script>


<svelte:head>
  <title>How to play Hondo</title>
  <meta name="description" content="Learn how to play Hondo, and get some tips and tricks for better scores!">
</svelte:head>


<div class="directions">
  <div class="directions__container">
    <MenuButton floating={true} />

    <h1>How to play</h1>

    <h2>Hondo is a word guessing game.</h2>
    
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

    
    <h2>When you get a code word, play continues with a new&nbsp;one.</h2>
    
    <p><em>However</em>, the last five guesses stay on the board as clues.</p>
          
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


    <h2>Watch your energy gauge</h2>
    <p>Every guess costs one bar, but a correct guess <em>replenishes</em> one bar instead.</p>

    <div class="example-diagram">
      <ExamplePowerBarWide remainingAttempts={10} />
      <Arrow direction="down" />
      <ExampleGuess codeWord="xxxxr" guess="wrong" />
      <Arrow direction="down" />
      <ExamplePowerBarWide remainingAttempts={9} />
      <Arrow direction="down" />
      <ExampleGuess codeWord="right" guess="right" />
      <Arrow direction="down" />
      <ExamplePowerBarWide remainingAttempts={10} />
    </div>


    <h2>Scoring</h2>

    <p>Every correct guess scores one point.</p>
    
    <p>Consecutive correct guesses score bonus&nbsp;points.</p>

    <div class="example-diagram">
      <div class="display-flex center-content position-relative width-max-content margin-auto bonus-demo">
        <ExampleGuess codeWord="store" guess="store" />
        <BonusDisplay bonusOverride={1} />
      </div>
      <Arrow direction="down" />
      <div class="display-flex center-content position-relative width-max-content margin-auto bonus-demo">
        <ExampleGuess codeWord="other" guess="other" />
        <BonusDisplay bonusOverride={2} />
      </div>
      <Arrow direction="down" />
      <div class="display-flex center-content position-relative width-max-content margin-auto bonus-demo">
        <ExampleGuess codeWord="their" guess="their" />
        <BonusDisplay bonusOverride={3} />
      </div>
    </div>


    <h2 class="display-flex" style="align-items: center;">
      <span class="shuffle-button info-button" style="margin-right: 1rem">
        <ShuffleIcon />
      </span>
      Shuffle
    </h2>

    <p>
      Hit <strong>shuffle</strong> any time to replace the board with five new random guesses.
    </p>
    
    <p>Costs {(SHUFFLE_COST / 10)} energy.</p>

    <div class="example-diagram">
      <ExamplePowerBarWide remainingAttempts={10} />
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
      <ExamplePowerBarWide remainingAttempts={10 - (SHUFFLE_COST / 10)} />
      <div>
        <ExampleGuess codeWord="boxer" guess="brown" />
        <ExampleGuess codeWord="boxer" guess="oxide" />
        <ExampleGuess codeWord="boxer" guess="regal" />
        <ExampleGuess codeWord="boxer" guess="epoxy" />
        <ExampleGuess codeWord="boxer" guess="flown" />
      </div>
    </div>


    <h2 class="display-flex" style="align-items: center;">
      <span class="info-button skip-button" style="margin-right: 1rem">
        <SkipIcon />
      </span>
      Skip
    </h2>

    <p>Use <b>skip</b> to get a new code word.</p>
    
    <p>Costs {SKIP_COST / 10} energy.</p>


    <h2>The goal</h2>
    <p><strong>Get your score as high as possible, as fast as possible.</strong></p>
    <p>The game ends when either:</p>
    <ol>
      <li>
        Your life gauge is empty; or
      </li>
      <li>
        You've scored a Hondo (100).
      </li>
    </ol>

    <hr>

    <h2>Hints and tips</h2>
  
    <ul>
      <li><strong>Look at the keyboard</strong>. It shows which letters aren't currently on the board, which can be a big hint.</li>
      <li><strong>Use shuffles and skips strategically</strong>. They can get you out of a jam, and can also keep streaks alive for extra bonus points.</li>
      <li>If you can, try to keep common letters on the board at all times, especially vowels.
      </li>
      <li><strong>Be patient</strong>; haste is costly. Getting a high score requires logic, strategy, and luck.</li>
    </ul>

    <a href="/" class="back-link">Back to game</a>
  </div>
</div>


<style lang="scss">
h1 {
  margin-top: 0;
}

h2 {
  font-size: 1.375rem;
  margin: 5rem 0 1rem;

  &:first-child {
    margin-top: 0;
  }
}

.directions {
  padding: 1rem 1rem 3rem;
  font-size: 1rem;
}

.directions__container {
  width: 28rem;
  max-width: 100%;
  margin: 0 auto 1rem;
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
    text-align: center;
  }
}

ul {
  padding-left: 1rem;
}

ol {
  padding-left: 1.5rem;
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

.bonus-demo {
  gap: 1rem;
}

.directions :global(.menu-button) {
  position: fixed;
  top: 1rem;
  right: 1rem;
}
</style>
