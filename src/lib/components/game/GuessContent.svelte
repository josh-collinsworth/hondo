<script lang="ts">
  import { quintOut } from 'svelte/easing'
  import { fly } from 'svelte/transition'
  import { flip } from 'svelte/animate'

  export let guess: string
  export let codeWord: string = '     '
  export let row: number
  export let previousGuesses: string[]
</script>


{#key codeWord}
  {#each {length: 5} as _, i (i)}
    <div
      class="guess-box"
      class:partial={codeWord.includes(guess[i])}
      class:full={[...guess][i] === [...codeWord][i]}
      in:fly="{{ duration: 600, easing: quintOut, y: 50, delay: 600 + ((row + 1) * (i * 1) * 16) }}"
      out:fly="{{ duration: 600, easing: quintOut, y: -50, delay: 0 }}"
      animate:flip={{ duration: 500 }}
    >
      <div class="background"  />
      <span>
        {guess[i]
          ? previousGuesses[row][i]
          : ''}
      </span>
    </div>
  {/each}
{/key}


<style lang="scss" global>
  .guess-box {
    width: 0;
    height: 0;
    border: 2px solid #999;
    font-size: 2rem;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    position: relative;
    transform: rotateY(0);
    padding: calc(50% - 2px);

    .background {
      content: '';
      width: 100%;
      height: 100%;
      display: block;
      position: absolute;
      z-index: -1;
    }

    span {
      display: block;
      line-height: 1;
      height: 0.85em;
      overflow: visible;
    }
  }

  .partial .background {
    background: lightblue;

  }

  .full .background {
    background: orange;
  }

  .current-guess-box {
    @extend .guess-box;

    border: 0;
    border-bottom: 2px solid #999;
  }
</style>