<script lang="ts">
  import ExampleGuess from '$lib/components/game/examples/ExampleGuess.svelte'
  import Arrow from '$lib/components/icon/Arrow.svelte'
</script>


<h2>Hondo is a word-guessing game.</h2>
    
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

<h3>
  You score points for correct guesses, and bonus points for consecutive correct guesses.
</h3>

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