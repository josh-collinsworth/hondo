<script lang="ts">
  import { onMount } from 'svelte'
  import { shuffleCooldown } from '$lib/js/state'
  import { DEFAULT_SHUFFLE_COOLDOWN } from '$lib/js/constants'

  let border: SVGPathElement
  let borderRadius: number = 0

  onMount(() => {
    borderRadius = parseFloat(border.getTotalLength().toFixed(2))
  })
</script>

<svg
  viewBox="0 0 48 48"
  style="fill-rule:evenodd;clip-rule:evenodd;stroke-miterlimit:1.5;"
>
  <path 
    class="arrow arrow-top"
    class:ready={!$shuffleCooldown}
    d="M30.591,18.359l-3.695,-0.504l-0.541,3.963l8.824,1.203l4.503,-7.683l-3.45,-2.022l-1.94,3.308l-0.028,-0.058l-0.111,-0.15c-1.555,-2.097 -3.772,-3.731 -6.461,-4.545c-6.127,-1.857 -12.581,1.187 -15.145,6.873l3.647,1.644c1.75,-3.881 6.156,-5.957 10.338,-4.689c1.641,0.497 3.025,1.442 4.059,2.66Z"
  />
  <path
    class="arrow arrow-bottom"
    class:ready={!$shuffleCooldown}
    d="M13.708,31.376l0.028,0.058l0.111,0.15c1.555,2.097 3.772,3.731 6.461,4.545c6.127,1.857 12.581,-1.187 15.145,-6.873l-3.647,-1.644c-1.75,3.881 -6.156,5.957 -10.338,4.689c-1.641,-0.497 -3.025,-1.442 -4.059,-2.66l3.695,0.504l0.541,-3.963l-8.824,-1.203l-4.503,7.683l3.45,2.022l1.94,-3.308Z"
  />
  <path
    d="M45.998,24c0,12.141 -9.857,21.998 -21.998,21.998c-12.141,0 -21.998,-9.857 -21.998,-21.998c-0,-12.141 9.857,-21.998 21.998,-21.998c12.141,-0 21.998,9.857 21.998,21.998Z"
    class="border"
    bind:this={border}
    style="
      stroke-dasharray: {borderRadius};
      stroke-dashoffset: {borderRadius / DEFAULT_SHUFFLE_COOLDOWN * $shuffleCooldown};
    "
  />
</svg>

<style>
  svg {
    transition: all 1s cubic-bezier(0.23, 1, 0.320, 1);
    position: absolute;
    width: calc(100% + 1px);
    height: calc(100% + 1px);
    top: -0.5px;
    left: -0.5px;
  }

  path {
    transition: inherit;
  }

  .arrow {
    fill: var(--lighterGray);
  }

  .arrow-top.ready {
    fill: var(--darkBlue);
  }
  
  .arrow-bottom.ready {
    fill: var(--secondary);
  }

  :global([disabled] .arrow) {
    fill: var(--lightGray)
  }

  .border {
    stroke-width: 0.15em;
    stroke: var(--darkBlue);
    fill: none;
    transform: rotate(-90deg);
    transform-origin: center;
  }
</style>