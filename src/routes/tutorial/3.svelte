<script lang="ts">
  import ExampleGuess from '$lib/components/game/examples/ExampleGuess.svelte'
  import ExamplePowerBarWide from '$lib/components/game/examples/ExamplePowerBarWide.svelte'
  import Arrow from '$lib/components/icon/Arrow.svelte'
</script>


<h2>Keep going as long as you can.</h2>

<p>Every incorrect guess drains your gauge…but a correct guess gives you a point, and <em>replenishes</em> your gauge instead!</p>

<div class="example-diagram">
  <ExamplePowerBarWide remainingAttempts={10} />
  <Arrow direction="down" />
  <ExampleGuess codeWord="xxxxr" guess="wrong" />
  <Arrow direction="down" />
  <ExamplePowerBarWide remainingAttempts={9} />
  <Arrow direction="down" />
  <ExampleGuess codeWord="right" guess="right" />
  <Arrow direction="down" />
  <ExamplePowerBarWide remainingAttempts={10} score={1} />
</div>

<h3>The game ends when your gauge is empty, OR when your score reaches 100.</h3>