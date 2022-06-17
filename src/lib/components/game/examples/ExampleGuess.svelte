<script lang="ts">
  export let guess: string
  export let codeWord: string

  // All this logic is copied directly from the GuessContent modal. Seemed easier to copy than to make the modal work for both purposes, with all the animation and such in the real one.
  let remainingLetters: string[] = []
  $: if (codeWord) remainingLetters = [...codeWord]

  let highlightArray: string[]
  $: highlightArray = [...guess].map((letter, i) => {
    if ([...codeWord][i] === letter) {
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


<div class="example-guess guess">
  {#each guess as letter, i}
    <div class="guess-box {highlightArray[i]}">
      <div class="guess-box__slider">
        <div
          class="guess-letter display-flex center-content {highlightArray[i]}"
          aria-hidden="true"
        >
          {letter}
        </div>
      </div>
    </div>
  {/each}
</div>


<style lang="scss">
  .example-guess {
    display: grid;
    font-size: 1.2rem;
    grid-template-columns: repeat(5, 2em);
    gap: 2px;
    margin: 0 auto 2px;
    width: max-content;

    .guess-box {
      width: 2em;
      height: 2em;
      min-height: unset;
    }

    .guess-box__slider {
      animation: none;
    }
  }
</style>