<script lang="ts">
let { guess, codeWord }: { guess: string, codeWord: string } = $props()

// All this logic is copied directly from the GuessContent modal. Seemed easier to copy than to make the modal work for both purposes, with all the animation and such in the real one.
let highlightArray: string[] = $derived.by(() => {
	const remaining = [...codeWord]
	return [...guess].map((letter, i) => {
		if ([...codeWord][i] === letter) {
			remaining.splice(remaining.findIndex(l => l === letter), 1)
			return 'exact'
		}
		return letter
	}).map((letter) => {
		if (letter === 'exact') {
			return letter
		} else if (remaining.includes(letter) && letter) {
			remaining.splice(remaining.findIndex(l => l === letter), 1)
			return 'partial'
		}
		return ''
	})
})
</script>


<div class="example-guess guess">
	{#each guess as letter, i}
		<div class="guess-box {highlightArray[i]}">
			<div class="guess-box__slider">
				<div
					class="guess-letter display-flex center-content {highlightArray[i]}"
					aria-hidden="true"
				>
					{letter}
				</div>
			</div>
		</div>
	{/each}
</div>


<style lang="scss">
.example-guess {
	display: grid;
	font-size: 1.2rem;
	grid-template-columns: repeat(5, 2em);
	gap: 2px;
	margin: 0 auto 2px;
	width: max-content;

	.guess-box {
		width: 2em;
		height: 2em;
		min-height: unset;
	}

	.guess-box__slider {
		animation: none !important
	}
}
</style>
