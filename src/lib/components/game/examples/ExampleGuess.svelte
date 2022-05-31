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


<div class="example-guess">
  {#each guess as letter, i}
    <div class="guess-box {highlightArray[i]}">
      <span>
        {letter}
      </span>
    </div>
  {/each}
</div>


<style lang="scss">
  .example-guess {
    display: grid;
    grid-template-columns: repeat(5, 2rem);
    gap: 2px;
    margin: 0 0 1px;

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
</style>