<script lang="ts">
  import { randomIntegerInRange } from '$lib/js/helpers'
  import { discoveredCodeWord } from '$lib/js/state'
  
  $: if ($discoveredCodeWord) {
    // confetti is loaded via CDN
    if (typeof confetti !== 'undefined') {
      const currentGuessBoxes = document.querySelectorAll('.current-guess-box')
      const windowHeight = window.innerHeight
      const windowWidth = window.innerWidth

      const origins = [...currentGuessBoxes].map(box => {
        const rect = box.getBoundingClientRect()
        return {
          x: 1 / windowWidth * (rect.left + (rect.width / 2)),
          y: 1 / windowHeight * rect.top,
        }
      })

      console.log(origins)

      const defaults = {         
        ticks: 60,
        gravity: 0.5,
        scalar: 0.8,
        shapes: ['square'],
        colors: ['#ffd100', '#7ba7bc', '#34657f', '#ff6a13'],
        disableForReducedMotion: true,
      }
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          confetti(Object.assign(
            {},
            {
              ...defaults,
              startVelocity: randomIntegerInRange(30, 50),
              spread: randomIntegerInRange(10, 26),
            },
            { origin: origins[i] }
          ))
        }, 60 + i * 40)
      }
    }
  }
</script>