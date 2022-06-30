<script lang="ts">
import ExampleGuess from '$lib/components/game/examples/ExampleGuess.svelte'
import Arrow from '$lib/components/icon/Arrow.svelte'
</script>


<h2>Hondo is a word-guessing game.</h2>
    
<div class="width-max-content" style="margin: 2rem 0 0.5rem">
  <ExampleGuess codeWord="xrxxx" guess="ready" />
</div>

<p class="small-print">
  The code word includes <strong>R</strong>, but it's not the&nbsp;first&nbsp;letter.
</p>

<div class="width-max-content" style="margin: 2rem 0 0.5rem">
  <ExampleGuess codeWord="xxxxt" guess="smart" />
</div>

<p class="small-print">
  The code word ends with <strong>T</strong>.
</p>

<p>Every correct guess scores a point. The goal is to score as many points as possible (up to 100).</p>


<style>
.small-print {
  text-align: left;
}

.small-print + p {
  margin-top: 2rem;
}
</style>
