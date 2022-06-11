<script lang="ts">
  import { randomIntegerInRange } from '$lib/js/helpers'
  import { discoveredCodeWord } from '$lib/js/state'

  $: if ($discoveredCodeWord) {
    // confetti is loaded via CDN
    if (typeof confetti !== 'undefined') {
      confetti(Object.assign(
        {},
        {
          ticks: 60,
          gravity: 0.5,
          scalar: 0.8,
          shapes: ['square'],
          colors: ['#ffd100', '#7ba7bc', '#34657f', '#ff6a13'],
          disableForReducedMotion: true,
          startVelocity: randomIntegerInRange(40, 50),
          spread: randomIntegerInRange(40, 70),
          particleCount: 200,
          angle: randomIntegerInRange(85, 105),
          origin: { x: 0.5, y: 0.65 }
        },
      ))
    }
  }
</script>