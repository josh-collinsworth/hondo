<script lang="ts">
  import { discoveredCodeWord } from '$lib/js/state'
  
  
  $: if ($discoveredCodeWord) {
    const duration = 500;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 18, spread: 280, ticks: 30, zIndex: 10, gravity: 0.2 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    let interval = setInterval(function() {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 60 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.1 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.1 } }));
    }, 60);
  }

</script>