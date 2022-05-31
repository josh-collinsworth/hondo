<script lang="ts">
  import { STARTING_GUESSES } from '$lib/js/constants'
  import { fade } from 'svelte/transition'

  export let close: VoidFunction
</script>

<div class="directions" on:click={close} transition:fade>
  <ul class="directions__top no-bullets">
    <li><strong>The goal is to guess as many code words as possible.</strong></li>
    <ul class="no-bullets">
      <li>
        <div class="example-guess">
          <div class="guess-box partial"><div class="background"></div>c</div>
          <div class="guess-box">h</div>
          <div class="guess-box">o</div>
          <div class="guess-box">r</div>
          <div class="guess-box">e</div>
        </div>
        <p>“C” is in the code word, but it's not the first letter.</p>
      </li>
      <li>
        <div class="example-guess">
          <div class="guess-box exact"><div class="background"></div>v</div>
          <div class="guess-box">i</div>
          <div class="guess-box">t</div>
          <div class="guess-box">a</div>
          <div class="guess-box">l</div>
        </div>
        <p>The code word starts with “V.”</p>
      </li>
    </ul>
    <li>
      <div class="power-bar power-bar-example" style="width: 100%; max-width: 18rem;">
        <div class="power-bar__fill" style="transform: scaleX(0.8); background-size: 125}%; width: 100%;" />
        <div class="power-bar__grid" style="grid-template-columns: repeat({ STARTING_GUESSES }, 1fr);">
          {#each Array.from({ length: STARTING_GUESSES }) as _}
            <div class="power-bar__grid-box" />
          {/each}
        </div>
      </div>
      <strong>This meter shows how many attempts you have left.</strong>
      <ul>
        <li>You start with { STARTING_GUESSES } attempts</li>
        <li>For every code word you get, you get an attempt back!</li>
        <li>The game ends when your meter is empty.</li>
      </ul>
    </li>
    <li>
      <div class="power-bar power-bar-example" style="width: 60%; max-width: 10.8rem;">
        <div class="power-bar__fill" style="transform: scaleX(0.67); background-size: 200%; width: 100%;" />
        <div class="power-bar__grid" style="grid-template-columns: repeat({ STARTING_GUESSES }, 1fr); width: 166.66%;">
          {#each Array.from({ length: STARTING_GUESSES }) as _, i}
            <div class="power-bar__grid-box" />
          {/each}
        </div>
      </div>
      <strong>The longer you play, the shorter the meter gets!</strong>
      <ul>
        <li>Keep playing as long as you can to get your score as high as possible!</li>
      </ul>
    </li>
  </ul>
</div>


<style lang="scss">
  .directions {
    position: fixed;
    z-index: 10;
    width: calc(100vw - 2rem);
    height: calc(100vh - 2rem);
    height: calc(100dvh - 2rem);
    top: 1rem;
    left: 1rem;
    border: 2px solid currentColor;
    background: var(--lightestGray); 
    padding: 1rem;
    font-size: 1rem;
    overflow: auto;
    
    li {
      margin-top: 0.5rem;
    }
  }

  .directions__top {
    > li:not(:first-child) {
      margin-top: 2rem;
    }
  }

  .example-guess {
    display: grid;
    grid-template-columns: repeat(5, 2rem);
    gap: 0.2rem;
    margin: 0;

    + p {
      margin-top: 0.5em;
    }

    .guess-box {
      font-size: 1rem;
      width: 2rem;
      height: 2rem;
      min-height: unset;
    }
  }

  .power-bar-example {
    height: 1rem;
    max-width: 20rem;
    margin: 1rem 0 0.5rem;
  }

  ul {
    padding-left: 1rem;
  }

  strong {
    font-size: 1.2rem;
  }
</style>