<script lang="ts">
let { remainingAttempts = 10, startingGuesses = 10 }: { remainingAttempts?: number, startingGuesses?: number } = $props()
</script>

<div class="power-bar-container example-power-bar">
	<div class="power-bar">
		<div
			class="power-bar__fill"
			style="
				transform: scaleX({ remainingAttempts / startingGuesses });
				background-size: {( startingGuesses / remainingAttempts) * 100}%;
			"
		></div>
		<div class="power-bar__grid">
			{#each { length: 10 } as _, i}
				<div class="power-bar__grid-box"></div>
			{/each}
		</div>
	</div>
</div>
