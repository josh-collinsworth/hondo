<script lang="ts">
  export let remainingAttempts: number = 10
  export let startingGuesses: number = 10
  export let score = 0
</script>

<div class="power-bar-container example-power-bar">
  <div class="power-bar">
    <div class="score">{score}</div>
    <div
      class="power-bar__fill"
      style="
        transform: scaleX({ remainingAttempts / startingGuesses });
        background-size: {( startingGuesses / remainingAttempts) * 100}%;
      "
    />
  </div>
</div>


<style lang="scss">
  .example-power-bar {
    margin: 0 auto;
    font-size: calc(0.5rem + 3vw);

    .power-bar {
      height: 1.2em;
    }

    @media (min-width: 32rem) {
      font-size: 1rem;
    }
  }
</style>