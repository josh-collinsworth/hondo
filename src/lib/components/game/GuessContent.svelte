<script lang="ts">
  import { quintOut } from 'svelte/easing'
  import { fly } from 'svelte/transition'
  import { flip } from 'svelte/animate'

  export let guess: string
  export let codeWord: string = '     '
  export let row: number
  export let previousGuesses: string[]
  export let isLoadingNewWord: boolean

  let remainingLetters = [...codeWord]

  $: highlightArray = [...guess].map((letter, i) => {
    if ([...codeWord][i] === letter) {
      remainingLetters.splice(remainingLetters.findIndex(i => i === letter), 1)
      return 'exact'
    } 
    return letter
  }).map((letter, i) => {
    console.log(letter, i)
    if (letter === 'exact') {
      return letter
    } else if (remainingLetters.includes(letter)) {
      remainingLetters.splice(remainingLetters.findIndex(i => i === letter), 1)
      return 'partial'
    }
    return ''
  })

  const defaultTransition = {
    duration: 500,
    easing: quintOut,
    y: 50
  }
</script>


{#key codeWord}
  {#each {length: 5} as _, i (i)}
    <div
      class:loading={isLoadingNewWord}
      class="guess-box {highlightArray[i]}"
      in:fly="{{ ...defaultTransition, delay: isLoadingNewWord ? (600 + ((row + 1) * (i * 1) * 16)) : (i + 1) * 40 }}"
      out:fly="{{ ...defaultTransition, y: -50, delay: isLoadingNewWord ?  0 : (i + 1) * 30 }}"
      animate:flip={{ duration: 500 }}
    >
      <div class="background"  />
      <div class="ascender">
        {#if [...guess][i] === [...codeWord][i]}
          +2
        {:else if codeWord.includes(guess[i])}
          +1
        {/if}
      </div>
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
    border: 2px solid #999;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    position: relative;
    transform: rotateY(0);
    
    
    @media (min-width: 32rem) {
      font-size: 2em;
      min-height: 2.6em;
    }

    .background,
    .ascender {
      content: '';
      width: 100%;
      height: 100%;
      display: block;
      position: absolute;
      z-index: -1;
      text-align: center;
    }
    
    .ascender {
      z-index: 2;
      animation: ascend 0.6s ease-out forwards;
      opacity: 0;
    }

    @for $i from 1 through 5 {
      &:nth-of-type(#{$i}) .ascender {
        animation-delay: 0.1s + ($i * 0.06s); 
      }
    }

    span {
      display: block;
      line-height: 1;
      height: 0.85em;
      overflow: visible;
    }
  }

  .loading .ascender {
    animation: none;
    animation-duration: 0;
  }

  .partial .background {
    background: lightblue;
  }

  .exact .background {
    background: orange;
  }

  .current-guess-box {
    @extend .guess-box;

    border: 0;
    border-bottom: 2px solid #999;
  }

  @keyframes ascend {
    from {
      transform: translateY(-1em);
      opacity: 1;
    }
    to { 
      transform: translateY(-2.5em); 
      opacity: 0;
    }
  }
</style>