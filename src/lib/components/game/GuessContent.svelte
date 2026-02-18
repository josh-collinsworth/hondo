<script lang="ts">
import { currentGuesses, codeWord } from '$lib/state/game'
import { getHighlightArray } from '$lib/js/helpers'

let { guess, previousGuess = '' }: { guess: string, previousGuess?: string } = $props()

let highlightArray: string[] = $derived(getHighlightArray(guess, $codeWord))

let previousHighlightArray: string[] = $derived(getHighlightArray(previousGuess, $codeWord))
</script>


{#each {length: 5} as _, i (i)}
	<div class="guess-box">
		<!-- The letter is repeated because VoiceOver doesn't read the letter and the status together if they're in separate elements -->
		{#key $currentGuesses}
			<div class="guess-box__slider">
				<div
					class="guess-letter display-flex center-content {previousHighlightArray[i]}"
					aria-hidden="true"
				>
					{previousGuess && previousGuess[i] ? previousGuess[i] : ''}
				</div>
				<div
					class="guess-letter guess-letter--next display-flex center-content {highlightArray[i]}"
					aria-hidden="true"
				>
					{guess[i] || ''}
				</div>
			</div>
		{/key}
		<div class="sr">
			{guess[i] || ''}
			{#if highlightArray[i] === 'exact'}
				In position
			{:else if highlightArray[i] === 'partial'}
				Out of position
			{:else}
				Not in word
			{/if}
		</div>
	</div>
{/each}
