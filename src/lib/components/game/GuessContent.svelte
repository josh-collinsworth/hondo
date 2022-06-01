<script lang="ts">
  import { quintOut } from 'svelte/easing'
  import { fly } from 'svelte/transition'
  import { flip } from 'svelte/animate'
  import { previousGuesses, codeWord, isLoadingNewWord } from '$lib/js/state'

  export let guess: string
  export let row: number = 0

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
      in:fly="{{ 
        ...defaultTransition, 
        delay: $isLoadingNewWord 
          ? (700 + (row * 50) + ((i +1) * 40))
          : (i + 1) * 40
      }}"
      out:fly="{{
        ...defaultTransition, y: -70,
        delay: $isLoadingNewWord
          ?  0
          : (i + 1) * 30
      }}"
      animate:flip={{ duration: 500 }}
    >
      <span>
        {guess[i]
          ? $previousGuesses[row][i]
          : ''}
      </span>
    </div>
  {/each}
{/key}