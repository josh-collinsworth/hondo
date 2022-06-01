<script lang="ts">
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
        startVelocity: 32,
        spread: 30,
        ticks: 60,
        gravity: 0.5,
        scalar: 0.8,
        shapes: ['square'],
        colors: ['#ffd100', '#7ba7bc', '#34657f', '#ff6a13'],
        disableForReducedMotion: true,
      }
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          confetti(Object.assign({}, defaults, { origin: origins[i] }))
        }, 60 + i * 40)
      }
    }
  }
</script>