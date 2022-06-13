<script lang="ts">
  import { pointsScoredForLastGuess, discoveredCodeWord } from '$lib/js/state'
  import { fade } from 'svelte/transition'

  let codeWordToShow: string = ''

  $: if ($discoveredCodeWord) {
    codeWordToShow = $discoveredCodeWord
    setTimeout(() => {
      codeWordToShow = ''
    }, 1300)
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
        {#if $pointsScoredForLastGuess > 1}
          <strong>Bonus!</strong>
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
    width: 100vw;
    align-items: flex-start;
    justify-content: center;
    padding-top: 5rem;
    top: 0;
    left: 0;

    .status-burst__inner {
      width: 100%;
      background: rgba(var(--paperRGB), 0.95);
      padding: 2rem;
      position: relative;

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
        bottom: 8px;
        transform-origin: right;
      }
    }

    h2 {
      font-size: 2.6rem;
      text-transform: uppercase;
      font-weight: normal;
      width: 100%;
      text-align: center;
      margin: 0;
    }

    p {
      font-size: 1rem;
      width: 100%;
      text-align: center;
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
  }
</style>