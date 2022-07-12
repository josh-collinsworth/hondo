<script lang="ts">
export let remainingAttempts: number = 10
export let startingGuesses: number = 10
</script>

<div class="power-bar-container example-power-bar">
  <div class="power-bar">
    <div
      class="power-bar__fill"
      style="
        transform: scaleX({ remainingAttempts / startingGuesses });
        background-size: {( startingGuesses / remainingAttempts) * 100}%;
      "
    />
    <div class="power-bar__grid">
      {#each { length: 10 } as _, i}
        <div class="power-bar__grid-box" />
      {/each}
    </div>
  </div>
</div>
