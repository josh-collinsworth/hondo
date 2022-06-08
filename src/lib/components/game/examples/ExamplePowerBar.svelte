<script lang="ts">
  export let remainingAttempts: number = 10
  export let startingGuesses: number = 10
  export let maxRemainingAttempts = 10
  export let score = 0
</script>

<div class="power-bar-container example-power-bar">
  <div
    class="power-bar__divider"
    style="
      transform: translateX({maxRemainingAttempts}em);
    "
  />
  <div class="power-bar">
    <div class="score">{score}</div>
    <div
      class="power-bar__fill"
      style="
        transform: scaleX({ remainingAttempts / startingGuesses });
        background-size: {( startingGuesses / remainingAttempts) * 100}%;
      "
    />
    <div 
      class="power-bar__grid"
      style="grid-template-columns: repeat({startingGuesses}, 1fr);"
    >
      {#each Array.from({ length: startingGuesses }) as _, i}
        <div class="power-bar__grid-box" />
      {/each}
    </div>
  </div>
</div>


<style>
  .example-power-bar {
    font-size: 1.1rem;
  }
</style>