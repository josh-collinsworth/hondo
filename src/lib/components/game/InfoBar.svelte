<script lang="ts">
import ShuffleButton from './ShuffleButton.svelte'
import SkipButton from './SkipButton.svelte'
import Toast from '../Toast.svelte'
import StatusBurst from './StatusBurst.svelte'
import MenuButton from '../MenuButton.svelte'
import PowerBar from './PowerBar.svelte'
import ScoreDisplay from './ScoreDisplay.svelte'

import BonusDisplay from './BonusDisplay.svelte'
</script>


<div class="info-bar">
	<!-- Hidden stuff -->
	<StatusBurst />
	<Toast />

	<!-- First row -->
	<span class="tiny" aria-hidden="true">Shuffle</span>
	<span class="tiny" aria-hidden="true">Skip</span>
	<span class="tiny" aria-hidden="true">Score</span>
	<span class="tiny" aria-hidden="true">Bonus</span>
	<span class="tiny" aria-hidden="true">Menu</span>

	<!-- Main row -->
	<ShuffleButton />
	<SkipButton />
	<ScoreDisplay />
	<BonusDisplay />
	<MenuButton />
	<PowerBar />
</div>


<style lang="scss">
.info-bar {
	display: grid;
	grid-template-columns: var(--buttonSize) var(--buttonSize) 1fr var(--buttonSize) var(--buttonSize);
	align-items: center;
	justify-items: center;
	gap: 8px 8px;
	margin-bottom: 1rem;
	position: relative;
	z-index: 5;
	height: 4rem;
	height: 5.2rem;

	@media (min-width: 22rem) {
		gap: 8px 16px;
	}

	@media (min-width: 24rem) {
		gap: 8px 24px;
	}
}

.tiny {
	font-size: 10px;
	text-transform: uppercase;
	line-height: 1;
}
</style>