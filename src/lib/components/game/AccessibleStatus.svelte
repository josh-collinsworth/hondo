<script lang="ts">
import { codeWord, currentGuesses } from '$lib/state/game'

let lastGuess: string 
$: lastGuess = [...$currentGuesses].pop() || ''

let remainingLetters: string[] = []
$: if ($codeWord) remainingLetters = [...$codeWord]

let highlightArray: string[]
$: highlightArray = [...lastGuess].map((letter, i) => {
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

let accessibleGuessMessage: string
$: accessibleGuessMessage = highlightArray.map((type, i) => {
  if (type === 'exact') {
    return lastGuess[i].toUpperCase() + ' exact'
  } else if (type === 'partial') {
    return lastGuess[i].toUpperCase() + ' out of position'
  } 
  return lastGuess[i].toUpperCase()
}).join('; ')
</script>

<p
  class="sr"
  role="status"
  aria-live="polite"
  aria-label={lastGuess + ': ' + accessibleGuessMessage}
/>


