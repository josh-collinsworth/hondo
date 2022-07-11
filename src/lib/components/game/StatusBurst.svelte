<script lang="ts">
import { pointsScoredForLastGuess, discoveredCodeWord } from '$lib/state/game'
import { isStreakAllowed } from '$lib/state/powerups';
import { fade } from 'svelte/transition'

let codeWordToShow: string = ''

$: if ($discoveredCodeWord) {
  codeWordToShow = $discoveredCodeWord
  setTimeout(() => {
    codeWordToShow = ''
  }, 1500)
}
</script>


{#if codeWordToShow}
  <div 
    class="status-burst display-flex"
    transition:fade={{ duration: 300 }}
  >
    <div class="status-burst__inner display-flex center-content">
      <h2>
        {codeWordToShow}
      </h2>
      <p>
        {#if $pointsScoredForLastGuess > 1 && $isStreakAllowed}
          <strong>Streak bonus</strong>
        {/if}
        +{$pointsScoredForLastGuess}
      </p>
    </div>
  </div>
{/if}

<style lang="scss">
.status-burst {
  position: fixed;
  z-index: 9;
  min-height: 100vh;
  min-height: 100dvh;
  width: 100vw;
  align-items: flex-end;
  justify-content: center;
  top: 0;
  left: 0;

  .status-burst__inner {
    width: 100%;
    background: var(--paper);
    padding: 2rem;
    position: relative;
    margin-bottom: 2rem;

    &::before,
    &::after {
      content: '';
      position: absolute;
      height: 8px;
      width: 100%;
      background: var(--orange);
      top: -8px;
      left: 0;
      animation: burst_right 1.3s cubic-bezier(0.86, 0, 0.07, 1) forwards;
      transform: scaleX(0);
      transform-origin: left;
    }

    &::after {
      animation-name: burst_left;
      top: unset;
      bottom: -8px;
      transform-origin: right;
    }
  }

  h2 {
    font-size: 2.6rem;
    text-transform: uppercase;
    font-weight: var(--fontWeightNormal);
    width: 100%;
    text-align: center;
    margin: 0;
    animation: slide_right 1.9s cubic-bezier(0.23, 1, 0.320, 1) forwards;
  }

  p {
    font-size: 0.875rem;
    margin: 1rem 0 0;
    width: 100%;
    text-align: center;
    animation: slide_left 1.9s cubic-bezier(0.23, 1, 0.320, 1) forwards;

    strong {
      font-weight: var(--fontWeightSemiBold);
      text-transform: uppercase;
    }
  }

  @keyframes burst_right {
    0% { transform: scaleX(0) }
    20% { transform: scaleX(1) }
    80% { transform: scaleX(1); transform-origin: right; }
    100% { transform: scaleX(0);  transform-origin: right; }
  }

  @keyframes burst_left {
    0% { transform: scaleX(0) }
    20% { transform: scaleX(1) }
    80% { transform: scaleX(1); transform-origin: left; }
    100% { transform: scaleX(0);  transform-origin: left; }
  }

  @keyframes slide_right {
    0% { transform: translateX(-3rem) }
    20% { transform: translateX(0) }
    75% { transform: translateX(0); opacity: 1 }
    100% { transform: translateX(3rem); opacity: 0 }
  }
  
  @keyframes slide_left {
    0% { transform: translateX(3rem) }
    20% { transform: translateX(0) }
    75% { transform: translateX(0); opacity: 1 }
    100% { transform: translateX(-3rem); opacity: 0 }
  }
}
</style>