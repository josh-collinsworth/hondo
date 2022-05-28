<script lang="ts">
  import { discoveredCodeWord } from '$lib/js/state'

  $: if ($discoveredCodeWord) { confetti({
      particleCount: 80 + Math.floor(Math.random() * 80),
      spread: 90,
      scalar: 0.8,
      disableForReducedMotion: true,
      ticks: 140,
    }) }
</script>