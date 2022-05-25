<script lang="ts">
  import { remainingAttempts } from '$lib/js/state'
  import { MAX_SCORE } from '$lib/js/constants'
</script>

<div class="power-bar">
  <div
    class="power-bar__fill"
    style="
      transform: scaleX({ $remainingAttempts / MAX_SCORE });
      background-size: {(MAX_SCORE / $remainingAttempts) * 100}%;
    "
  />
  <div class="power-bar__grid" style="grid-template-columns: repeat({MAX_SCORE}, 1fr);">
    {#each Array.from({ length: MAX_SCORE }) as _}
      <div class="power-bar__grid-box" />
    {/each}
  </div>
</div>


<style lang="scss">
  .power-bar {
    width: 100%;
    border: 0;
    border-radius: 2rem;
    height: 1.5rem;
    display: flex;
    align-content: stretch;
    overflow: hidden;
    position: relative;
    background: var(--lighterGray);

    .power-bar__grid {
      display: grid;
      width: 100%;
      position: absolute;
      height: 100%;
      left: 0;
      top: 0;
      z-index: 2;

      &-box {
        border-right: 2px solid var(--paper);

        &:last-of-type {
          border: 0;
        }
      }
    }

    .power-bar__fill {
      transform-origin: left;
      background: linear-gradient(90deg, #e4002b, #e82028, #f1461d, #fb6c07, #ff9100, #ffb100, #ffc800, #ffd100);
      width: 100%;
      transition: all 1s cubic-bezier(0.165, 0.84, 0.44, 1);
      display: flex;
      justify-content: center;
      align-items: center;
      height: inherit;
      overflow: hidden;
    }
  }
</style>