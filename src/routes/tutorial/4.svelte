<script lang="ts">
import ExampleGuess from '$lib/components/game/examples/ExampleGuess.svelte'
import ExamplePowerBarWide from '$lib/components/game/examples/ExamplePowerBarWide.svelte'
import Arrow from '$lib/components/icon/Arrow.svelte'
</script>


<h2>Watch your life bar.</h2>

<p>Every incorrect guess drains life…but a correct guess <em>replenishes</em> life instead!</p>

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

<p>The game ends when your bar is empty, OR when your score reaches 100.</p>

<hr>

<p>There's more to learn later, but for now: <b>let's play!</b></p>