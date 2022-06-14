<script lang="ts">
import { previousGuesses, codeWord, remainingAttempts } from '$lib/js/state'
import { getRandomCodeWord } from '$lib/js/mutations'

const shuffle = async (): void => {
  if ($remainingAttempts < 3) {
    alert(`You don't have enough attempts to shuffle right now.`)
    return
  }
  const confirmation = confirm(`Replace the board with five new random guesses? Costs two attempts.`)

  if (!confirmation) return
  let newGuesses: string[] = []

  while (newGuesses.length < 5) {
    const wordToAdd = getRandomCodeWord()

    if (wordToAdd !== $codeWord && !newGuesses.includes(wordToAdd)) {
      newGuesses = [...newGuesses, wordToAdd]
    }
  }
  
  previousGuesses.set(newGuesses)
  remainingAttempts.set($remainingAttempts - 2)
}
</script>

<button on:click={shuffle} class="info-button shuffle-button">
  <div aria-hidden="true">🔀</div>
  <div class="sr">Shuffle board</div>
</button>


<style lang="scss">
  .shuffle-button {
    line-height: 1;
  }
</style>