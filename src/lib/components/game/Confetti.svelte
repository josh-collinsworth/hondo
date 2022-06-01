<script lang="ts">
  import { discoveredCodeWord } from '$lib/js/state'
  
  
  $: if ($discoveredCodeWord ) {
    if (typeof confetti !== 'undefined') {
    //   // const duration = 400
    //   // const animationEnd = Date.now() + duration
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

      // function randomInRange(min, max) {
      //   return Math.random() * (max - min) + min
      // }

      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          confetti(Object.assign({}, defaults, { origin: { x: i / 5 + 0.1, y: 0.55 } }))
        }, 80 + i * 60)
      }
      
      // const interval = setInterval(() => {
      //   var timeLeft = animationEnd - Date.now()
        
      //   if (timeLeft <= 0) {
      //     return clearInterval(interval)
      //   }

      //   const particleCount = 50 * (timeLeft / duration)
      //   // since particles fall down, start a bit higher than random
      //   confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.1 } }))
      //   confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.1 } }))
      //   // confetti(Object.assign({}, defaults, { particleCount, origin: { x: 0.5, y: 0.5 } }))

      // }, 30)
    }
  }

</script>