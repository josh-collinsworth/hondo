<script lang="ts">
import { codeWord, currentGuesses } from '$lib/state/game'

let lastGuess: string = $derived([...$currentGuesses].pop() || '')

let highlightArray: string[] = $derived.by(() => {
	const remaining = [...$codeWord]
	return [...lastGuess].map((letter, i) => {
		if ([...$codeWord][i] === letter) {
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

let accessibleGuessMessage: string = $derived(highlightArray.map((type, i) => {
	if (type === 'exact') {
		return lastGuess[i].toUpperCase() + ' exact'
	} else if (type === 'partial') {
		return lastGuess[i].toUpperCase() + ' out of position'
	}
	return lastGuess[i].toUpperCase()
}).join('; '))
</script>

<p
	class="sr"
	role="status"
	aria-live="polite"
	aria-label={lastGuess + ': ' + accessibleGuessMessage}
></p>
