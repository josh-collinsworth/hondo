<script lang="ts">
import { SCORE_TICK_DURATION } from '$lib/js/constants'
import { streak } from '$lib/state/game'
import { fly } from 'svelte/transition'
import { backIn, backOut } from 'svelte/easing'

export let bonusOverride: number|null = null

let bonusToShow: number
$: bonusToShow = bonusOverride ? bonusOverride : $streak
</script>


<div class="info-button bonus" aria-label="Current bonus: {bonusToShow}">
	<div class="bonus-wrapper display-flex center-content">
		{#key $streak}
			<div
				class="bonus-digit display-flex center-content"
				out:fly={{ y: -36, duration: SCORE_TICK_DURATION, opacity: 1, easing: backIn }}
				in:fly={{ y: 36, duration: SCORE_TICK_DURATION, opacity: 1, easing: backOut, delay: SCORE_TICK_DURATION }}
			>
				<span class="plus">
					+
				</span>{bonusToShow}
			</div>
		{/key}
	</div>
</div>


<style lang="scss">
.bonus {
	display: flex;
	flex-wrap: wrap;
	grid-template-columns: 100%;
	align-items: center;
	align-content: center;
	line-height: 1;
	border: 0;

	.bonus-wrapper {
		width: 100%;
		height: 1.25em;
		overflow: hidden;
	}

	.bonus-digit {
		width: 100%;
		height: 0;
		line-height: 0;
		text-align: center;
		font-weight: var(--fontWeightNormal);
	}

	.plus {
		display: block;
		margin-left: -0.25em;
		font-size: 0.875em;
		font-weight: var(--fontWeightSemiBold);
	}
}
</style>