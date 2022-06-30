<script lang="ts">
import ExampleGuess from '$lib/components/game/examples/ExampleGuess.svelte'
import Arrow from '$lib/components/icon/Arrow.svelte'
</script>

<h2>
  Back-to-back correct guesses score bonus points.
</h2>

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

<p>It's hard to do, but remember: you'll always have five previous words on the board to use as clues.</p>