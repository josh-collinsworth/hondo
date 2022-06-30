<script lang="ts">
import ExampleGuess from '$lib/components/game/examples/ExampleGuess.svelte'
import ExamplePowerBar from '$lib/components/game/examples/ExamplePowerBar.svelte'
import Arrow from '$lib/components/icon/Arrow.svelte'
</script>


<h2>Watch your energy bar.</h2>

<p>Every incorrect guess drains energy…but a correct guess <em>replenishes</em> energy instead!</p>

<div class="example-diagram">
  <ExamplePowerBar remainingAttempts={10} />
  <Arrow direction="down" />
  <ExampleGuess codeWord="xxxxr" guess="wrong" />
  <Arrow direction="down" />
  <ExamplePowerBar remainingAttempts={9} />
  <Arrow direction="down" />
  <ExampleGuess codeWord="right" guess="right" />
  <Arrow direction="down" />
  <ExamplePowerBar remainingAttempts={10} score={1} />
</div>

<p>The game ends when your bar is empty, OR when your score reaches 100.</p>