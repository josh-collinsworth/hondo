<script lang="ts">
  import ExampleGuess from '$lib/components/game/examples/ExampleGuess.svelte'
  import Arrow from '$lib/components/icon/Arrow.svelte'
</script>


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
