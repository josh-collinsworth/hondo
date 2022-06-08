<script lang="ts">
  export let direction: string = 'left'
</script>

<svg class={direction} width="100%" height="100%" viewBox="0 0 64 64" version="1.1" style="fill-rule:evenodd;clip-rule:evenodd;stroke-miterlimit:5;"><path d="M60.669,32l-57.338,0" style="fill:none;"/><path d="M22.312,13.122l-18.981,18.981l18.774,18.775" style="fill:none;"/></svg>

<style lang="scss">
  svg {
    width: 1.5rem;
    height: auto;
    stroke-width: 5px;
    stroke: var(--lightAccent);
    display: block;
    margin: 0 auto;

    &.down {
      transform: rotate(90deg);
    }

    &.right {
      transform: rotate(180deg);
    }

    &.down {
      transform: rotate(-90deg);
    }
  }
</style>