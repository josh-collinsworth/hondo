<script lang="ts">
  import { quintOut } from 'svelte/easing'
  import { fly, slide } from 'svelte/transition'
  import { flip } from 'svelte/animate'
  import { previousGuesses, codeWord } from '$lib/js/state'

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


{#each {length: 5} as _, i (i)}
  <div
    class="guess-box {highlightArray[i]}"
    in:fly="{{ 
      ...defaultTransition,
      delay: (i + 1) * 40
    }}"
    out:fly="{{
      ...defaultTransition, y: -70,
      delay: (i + 1) * 30
    }}"
    animate:flip={{ duration: 500 }}
  >
    {#if highlightArray[i]}
      {#key highlightArray[i]}
        <div
          in:slide={{ duration: 420, delay: ((15 - (row * 3)) + (i * 3)) * 20, easing: quintOut }}
          out:slide={{ duration: 420, delay: ((15 - (row * 3)) + (i * 3)) * 20, easing: quintOut }}
          class="guess-box__background guess-box__background--{highlightArray[i]}"
        />
      {/key}
    {/if}
    <!-- The letter is repeated twice because VoiceOver doesn't read the letter and the status together otherwise -->
    <span aria-hidden="true" style="transition-delay: {(((row * 2) + (i * 2)) / 60) + 0.1}s">
      {guess[i]
        ? $previousGuesses[row][i]
        : ''}
    </span>
    <span class="sr">
      {guess[i]
        ? $previousGuesses[row][i]
        : ''}
      {#if highlightArray[i] === 'exact'}
        In position
      {:else if highlightArray[i] === 'partial'}
        Out of position
      {:else}
        Not in word
      {/if}
    </span>
  </div>
{/each}
