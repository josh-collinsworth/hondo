<script lang="ts">
let { flipped = false }: { flipped?: boolean } = $props()
</script>


<svg class:flipped width="100%" height="100%" viewBox="0 0 30 30" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><path d="M21.619,13.396l-0,-9.085l3,0l-0,21.378l-3,-0l-0,-9.085l-16.989,9.085l-0,-21.378l16.989,9.085Zm-13.989,-4.079l10.627,5.683c-0,0 -10.627,5.683 -10.627,5.683l-0,-11.366Z"/></svg>


<style>
svg,
svg * {
	touch-action: manipulation;
}

.flipped {
	transform: rotateY(180deg);
}
</style>