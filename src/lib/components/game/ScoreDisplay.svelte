<script lang="ts">
import { runningScore } from '$lib/state/game'
import { SCORE_TICK_DURATION } from '$lib/js/constants'
import { fly } from 'svelte/transition'
import { backIn, backOut } from 'svelte/easing'

let scoreDigits: string[]
$: scoreDigits = String($runningScore).padStart(3).split('')
</script>


<div
	class="score"
	role="status"
	aria-live="polite"
	aria-label={`Score: ` + $runningScore}
>
	<div class="score-container" aria-hidden="true">
		{#each scoreDigits as digit, i}
			{#key digit}
				<div
					class="score-digit digit-{i + 1}"
					out:fly={{ y: -36, duration: SCORE_TICK_DURATION, opacity: 1, easing: backIn }}
					in:fly={{ y: 36, duration: SCORE_TICK_DURATION, opacity: 1, easing: backOut, delay: SCORE_TICK_DURATION / 2 }}
				>
					{digit}
				</div>
			{/key}
		{/each}
	</div>
</div>

