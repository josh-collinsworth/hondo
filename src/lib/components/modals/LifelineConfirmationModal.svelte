<script lang="ts">
  import { useLifeline, closeModal } from '$lib/js/mutations'
</script>


<h2>Use a lifeline?</h2>

<p>This will solve the current code word, but temporarily reduce your maximum life gauge.</p>

<div class="button-bar">
  <button on:click={closeModal}>Cancel</button>
  <button on:click={useLifeline}>OK</button>
</div>
