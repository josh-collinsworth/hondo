<script lang="ts">
  const focusMain = (): void => {
    document.querySelector('main')?.focus()
  }
</script>

<a href="#main" id="skip-to-content-link" on:click={focusMain}>
  Skip to main content
</a>


<style lang="scss">
  #skip-to-content-link {
    position: absolute;
    top: -3rem;
    width: max-content;
    display: flex;
    padding: 1rem;
    line-height: 1rem;
    font-size: 1rem;
    background: var(--secondary);
    color: var(--ink);

    &:focus {
      top: 0;
    }
  }
</style>