<script lang="ts">
  import { STARTING_GUESSES } from '$lib/js/constants'

  export let close: VoidFunction
</script>

<div class="directions" on:click={close}>
  <ul class="directions__top">
    <li><strong>The goal is to guess as many code words as possible.</strong></li>
    <ul>
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
      <strong>This bar shows how many guesses you have left</strong>
      <div class="power-bar power-bar-example">
        <div class="power-bar__fill" style="transform: scaleX(0.8); background-size: 125}%; width: 100%;" />
        <div class="power-bar__grid" style="grid-template-columns: repeat({ STARTING_GUESSES }, 1fr);">
          {#each Array.from({ length: STARTING_GUESSES }) as _}
            <div class="power-bar__grid-box" />
          {/each}
        </div>
      </div>
      <ul>
        <li>You start with { STARTING_GUESSES } guesses</li>
        <li>For every code word you get, you get a guess back!</li>
        <li>The game ends when you run out of guesses.</li>
      </ul>
    </li>
    <li>
      <strong>The longer you play, the shorter the bar gets!</strong>
      <div class="power-bar power-bar-example">
        <div class="power-bar__fill" style="transform: scaleX(0.4); background-size: 200}%; width: 100%;" />
        <div class="power-bar__grid" style="grid-template-columns: repeat({ STARTING_GUESSES }, 1fr);">
          {#each Array.from({ length: STARTING_GUESSES }) as _, i}
            <div class="power-bar__grid-box" class:blackout={i + 1 > 6} />
          {/each}
        </div>
      </div>
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

  .directions__top > li:not(:first-child) {
    margin-top: 2rem;
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
    margin: 0.5rem 0;
  }

  ul {
    list-style-type: none;
    padding-left: 1rem;
  }

  strong {
    font-size: 1.2rem;
  }
</style>