<script lang="ts">
  import { backIn, backOut } from 'svelte/easing'
  import { fly } from 'svelte/transition'
  import { previousGuesses, codeWord } from '$lib/js/state'

  export let guess: string
  export let row: number = 0

  const transitionDuration = 360

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
</script>


{#each {length: 5} as letter, i (i)}
  <div
    class="guess-box {highlightArray[i]}"
  >
    <div class="guess-box__background guess-box__background--partial" />
    <div class="guess-box__background guess-box__background--exact" />
    <!-- The letter is repeated because VoiceOver doesn't read the letter and the status together if they're in separate elements -->
    {#key $previousGuesses}
      <div
        class="guess-letter display-flex center-content"
        aria-hidden="true"
        in:fly="{{ 
          y: 70,
          delay: transitionDuration + ((5 - row) * 20) + ((i + 1) * 30),
          easing: backOut,
          duration: transitionDuration,
        }}"
        out:fly="{{
          y: -70,
          delay: row ? ((5 - row) * 20) + ((i + 1) * 30) : 0,
          easing: backIn,
          duration: transitionDuration,
        }}"
    >
        {guess[i]
          ? $previousGuesses[row][i]
          : ''}
      </div>
    {/key}
    <div class="sr">
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
    </div>
  </div>
{/each}
