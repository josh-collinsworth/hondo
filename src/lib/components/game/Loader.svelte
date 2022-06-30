<div class="loader display-flex center-content">
  <h2 class="sr">Loading…</h2>
  <div class="dots display-flex center-content">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  </div>
</div>


<style lang="scss">
.loader {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(var(--paperRGB), 0.8);
  min-height: 100vh;
  min-height: 100dvh;
  width: 100vw;
  padding: 1rem;
  z-index: 10;
}

.dots {
  
  .dot {
    width: 2rem;
    height: 2rem;
    background: var(--darkBlue);
    animation: loader_bounce 0.9s ease-in-out infinite;
    border-radius: 0.5rem;
    
    + .dot {
      margin-left: 0.25rem;
    }
    
    &:nth-of-type(2) {
      background: var(--yellow);
      animation-delay: 0.08s;
    }
    
    &:nth-of-type(3) {
      animation-delay: 0.16s;
      background: var(--primary);
    }
    
    &:nth-of-type(4) {
      background: var(--secondary);
      animation-delay: 0.24s;
    }

    &:nth-of-type(5) {
      background: var(--darkAccent);
      animation-delay: 0.32s;
    }
  }
}

@keyframes loader_bounce {
  0% {
    transform: translateY(0)
  }
  20% {
    transform: translateY(-2rem)
  }
  25% {
    transform: translateY(0.25rem)
  }
  30% {
    transform: translateY(-0.1rem)
  }
  35%, 100% {
    transform: translateY(0rem)
  }
}
</style>