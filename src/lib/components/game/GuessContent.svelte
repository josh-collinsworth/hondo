<script lang="ts">
  import { previousGuesses, codeWord } from '$lib/js/state'

  export let guess: string
  export let previousGuess: string = ''

  let remainingGuessLetters: string[] = []
  let remainingPreviousGuessLetters: string[] = []

  $: if ($codeWord) {
    remainingGuessLetters = [...$codeWord]
    remainingPreviousGuessLetters = [...$codeWord]
  }

  // TODO: this is SOOO tedious and probably really bad, but also, it lets me get both letters in and highlight both for smooth transitions, so…not really sure how else to do it better, other than maybe just figuring out a little less verbose way to do the logic. Kinda sucks to run this 60 times every guess.
  let highlightArray: string[]
  $: highlightArray = [...guess].map((letter, i) => {
    if ([...$codeWord][i] === letter) {
      remainingGuessLetters.splice(remainingGuessLetters.findIndex(i => i === letter), 1)
      return 'exact'
    } 
    return letter
  }).map((letter, i) => {
    if (letter === 'exact') {
      return letter
    } else if (remainingGuessLetters.includes(letter) && letter) {
      remainingGuessLetters.splice(remainingGuessLetters.findIndex(i => i === letter), 1)
      return 'partial'
    }
    return ''
  })

  let previousHighlightArray: string[]
  $: previousHighlightArray = [...previousGuess].map((letter, i) => {
      if ([...$codeWord][i] === letter) {
        remainingPreviousGuessLetters.splice(remainingPreviousGuessLetters.findIndex(i => i === letter), 1)
      return 'exact'
    } 
    return letter
  }).map((letter, i) => {
    if (letter === 'exact') {
      return letter
    } else if (remainingPreviousGuessLetters.includes(letter) && letter) {
      remainingPreviousGuessLetters.splice(remainingPreviousGuessLetters.findIndex(i => i === letter), 1)
      return 'partial'
    }
    return ''
  })
</script>


{#each {length: 5} as _, i (i)}
  <div class="guess-box">
    <!-- The letter is repeated because VoiceOver doesn't read the letter and the status together if they're in separate elements -->
    {#key $previousGuesses}
      <div class="guess-box__slider">
        <div
          class="guess-letter display-flex center-content {previousHighlightArray[i]}"
          aria-hidden="true"
        >
          {previousGuess[i] || ''}
        </div>
        <div
          class="guess-letter guess-letter--next display-flex center-content {highlightArray[i]}"
          aria-hidden="true"
        >
          {guess[i] || ''}
        </div>
      </div>
    {/key}
    <div class="sr">
      {guess[i] || ''}
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
