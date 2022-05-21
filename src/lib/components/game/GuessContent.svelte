<script lang="ts">
  import { stringContainsLetter } from '$lib/helpers'
  import { quintOut } from 'svelte/easing'
  import { fly } from 'svelte/transition'

  export let guess: string
  export let codeWord: string = '     '
  export let row: number
  export let previousGuesses: string[]

  $: partiallyCorrect = [...guess].filter(letter => codeWord.includes(letter)).length
  $: fullyCorrect = [...guess].filter((letter, i) => codeWord[i] === letter).length
</script>

{#each {length: 5} as _, col}
  <div class="guess-box" in:fly="{{duration: 500, easing: quintOut, y: 40, delay: col * 40 }}">
    <span>
      {guess[col]
        ? previousGuesses[row][col]
        : ''}
    </span>
  </div>
{/each}

{#if stringContainsLetter(guess)}
  <div
    class="guess-box hint partial"
    in:fly="{{duration: 240, easing: quintOut, y: 40, delay: 300 }}"
    out:fly="{{duration: 240, easing: quintOut, y: 40 }}"
  >
    {#key codeWord}  
      <span
        in:fly="{{duration: 340, easing: quintOut, y: 40, delay: (row + 1) * 120 }}"
        out:fly="{{duration: 340, easing: quintOut, y: -40 }}"
      >
        {partiallyCorrect}
      </span>
    {/key}
  </div>
  <div
    class="guess-box hint full"
    in:fly="{{duration: 240, easing: quintOut, y: 40, delay: 340 }}"
    out:fly="{{duration: 240, easing: quintOut, y: 40 }}"
  >
    {#key codeWord}
      <span
        in:fly="{{duration: 340, easing: quintOut, y: 40, delay: (row + 1) * 120 + 60 }}"
        out:fly="{{duration: 340, easing: quintOut, y: -40}}"
      >
        {fullyCorrect}
      </span>
    {/key}
  </div>
{/if}


<style lang="scss" global>
  .guess-box {
    width: 0;
    height: 0;
    padding: 50%;
    border: 2px solid #999;
    font-size: 2rem;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;

    span {
      display: block;
      line-height: 1;
      height: 0.85em;
      overflow: visible;
    }
    
    &.hint {
      font-weight: bold;
      background: skyblue;
      color: #fff;
      border: 0;
      border-radius: 5em;
    }

    &.full {
      background: orange;
    }
  }

  .current-guess-box {
      @extend .guess-box;

      border: 0;
      border-bottom: 2px solid #999;
    }
</style>