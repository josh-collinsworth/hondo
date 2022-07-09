<script lang="ts">
import { SCORE_TICK_DURATION } from '$lib/js/constants'
import { streak } from '$lib/state/game'
import { fly } from 'svelte/transition'
import { backIn, backOut } from 'svelte/easing'

export let bonusOverride: number|null = null
</script>


<div class="info-button bonus" style="font-weight: normal;">
  <div class="bonus-wrapper display-flex center-content">
    {#key $streak}
      <div
        class="bonus-digit display-flex center-content"
        out:fly={{ y: -36, duration: SCORE_TICK_DURATION, opacity: 1, easing: backIn }}
        in:fly={{ y: 36, duration: SCORE_TICK_DURATION, opacity: 1, easing: backOut, delay: SCORE_TICK_DURATION }}
      >
        {bonusOverride ? bonusOverride : $streak}
      </div>
    {/key}
  </div>
</div>


<style lang="scss">
.bonus {
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 100%;
  align-items: center;
  line-height: 1;

  .bonus-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .bonus-digit {
    width: 100%;
    height: 0;
    line-height: 0;
    text-align: center;
  }

  &::after {
    content: '+';
    font-weight: var(--fontWeightSemiBold);
    font-size: 0.875rem;
    position: absolute;
    height: 1rem;
    width: 1rem;
    background: var(--paper);
    line-height: 1rem;
    left: -14%;
    top: calc(50% - 0.5rem);
    z-index: 200;
  }
}
</style>