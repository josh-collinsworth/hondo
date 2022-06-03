<script lang="ts">
  import { discoveredCodeWord } from '$lib/js/state'
</script>


{#key $discoveredCodeWord}
  <div class="burst">
    <div class="burst-container">
      {#each Array.from({length: 5}) as _, i}
        <div class="ring ring-{i}"/>
      {/each}
    </div>
  </div>
{/key}


<style lang="scss">
  .burst {
    position: absolute;
    width: 100vw;
    left: calc(50% - 50vw);
    bottom: 0.85em;
    overflow: hidden;
    padding: 5rem 0;
    pointer-events: none;
    z-index: -1;
  }

  .burst-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0.25rem;
    width: 100%;
    max-width: 30rem;
    margin: 0 auto;
  }

  .ring {
    animation: burst 1.2s cubic-bezier(0.23, 1, 0.320, 1) forwards;
    width: 2.4em;
    height: 2.4em;
    border-radius: 0.5em;
    border: 1em solid var(--primary);
    opacity: 0;
  }

  @for $i from 1 through 5 {
    .ring:nth-of-type(#{$i}) {
      animation-delay: 0.05s + $i * 0.06s;
    }
  }

  @keyframes burst {
    0% {
      transform: scale(3);
      opacity: 0;
    }
    70% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(3);
      opacity: 0;
    }
  }
</style>