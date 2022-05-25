<script lang="ts">
  import { score, runningScore } from '$lib/js/state'
  import { MAX_SCORE } from '$lib/js/constants'
</script>

<div class="power-bar">
  <div
    class="power-bar__fill"
    style="transform: scaleX({$score / MAX_SCORE})"
  >
  </div>
  <div class="power-bar__score">
    {$runningScore}
  </div>
</div>