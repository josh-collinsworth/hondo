<script lang="ts">
  import { quintOut } from 'svelte/easing'
  import { fly } from 'svelte/transition'
  import { flip } from 'svelte/animate'
  import { previousGuesses, codeWord, isLoadingNewWord } from '$lib/js/state'

  export let guess: string
  export let row: number

  let remainingLetters: string[] = []
  $: if ($codeWord) remainingLetters = [...$codeWord]

  let highlightArray: string[]
  $: highlightArray = [...guess].map((letter, i) => {
    if ([...$codeWord][i] === letter) {
      remainingLetters.splice(remainingLetters.findIndex(i => i === letter), 1)
      return 'exact'
    } 
    return letter
  }).map((letter, i) => {
    if (letter === 'exact') {
      return letter
    } else if (remainingLetters.includes(letter) && letter) {
      remainingLetters.splice(remainingLetters.findIndex(i => i === letter), 1)
      return 'partial'
    }
    return ''
  })

  const defaultTransition = {
    duration: 600,
    easing: quintOut,
    y: 70
  }
</script>


{#key $codeWord}
  {#each {length: 5} as _, i (i)}
    <div
      class:loading={$isLoadingNewWord}
      class="guess-box {highlightArray[i]}"
      in:fly="{{ ...defaultTransition, delay: $isLoadingNewWord ? (700 + ((row + 1) * (i * 1) * 16)) : (i + 1) * 40 }}"
      out:fly="{{ ...defaultTransition, y: -70, delay: $isLoadingNewWord ?  0 : (i + 1) * 30 }}"
      animate:flip={{ duration: 500 }}
    >
      <div class="background"  />
      <span>
        {guess[i]
          ? $previousGuesses[row][i]
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
    min-height: 1.6em;
    
    
    @media (min-width: 32rem) {
      font-size: 2em;
      min-height: 2.6em;
    }

    .background {
      content: '';
      width: 100%;
      height: 100%;
      display: block;
      position: absolute;
      z-index: -1;
      text-align: center;
    }

    span {
      display: block;
      line-height: 1;
      height: 0.85em;
      overflow: visible;
    }
  }

  .partial .background {
    background: var(--lightBlue);
  }

  .exact .background {
    background: var(--orange);
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