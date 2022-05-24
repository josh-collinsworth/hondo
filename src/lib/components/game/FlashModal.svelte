<script lang="ts">
import { onMount } from "svelte";


  export let discoveredCodeWord: string

  $: if (discoveredCodeWord) { confetti({
      particleCount: 80 + Math.floor(Math.random() * 80),
      spread: 90,
      scalar: 0.8,
      disableForReducedMotion: true,
      ticks: 140,
    }) }
</script>


<!-- {#key discoveredCodeWord}
  <div class="correct-word">
    <p>{discoveredCodeWord}</p>
    <br/>
    <p>New word incoming…</p>
  </div>
{/key} -->


<style lang="scss">
  .correct-word {
    position: fixed;
    pointer-events: none;
    height: 150vh;
    width: 150vw;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.5));
    left: -25vw;
    top: -25vh;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    flex-wrap: wrap;
    animation: reveal 1.5s cubic-bezier(0, 0, 0, 1);
    opacity: 0;
    z-index: 10;

    p {
      width: 100%;
      text-align: center;
    }
    
    p:first-child {
      text-transform: uppercase;
      font-size: 3rem; 
      margin: 0;
    }
  }

  @keyframes reveal {
    0% {
      opacity: 0;
      transform: scale(0.5);
    }
    70% {
      opacity: 1;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(4);
    }
  }
</style>