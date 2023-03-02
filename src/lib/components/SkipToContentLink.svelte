<script lang="ts">
const focusMain = (): void => {
	document.getElementById('game-board')?.focus()
}
</script>

<a href="#game-board" id="skip-to-content-link" on:click={focusMain}>
	Skip to board
</a>


<style lang="scss">
#skip-to-content-link {
	position: absolute;
	top: -6rem;
	width: max-content;
	display: flex;
	padding: 1rem;
	line-height: 1rem;
	font-size: 1rem;
	background: var(--secondary);
	color: var(--ink);

	&:focus {
		top: 0;
	}
}
</style>