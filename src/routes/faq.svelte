<script>
import Logo from '$lib/components/icon/Logo.svelte'
import MenuButton from '$lib/components/MenuButton.svelte'
</script>


<section class="about">
  <div class="about-container">
    <div class="button-bar">
      <MenuButton />
    </div>
    <h1 class="display-flex align-center">
      <a href="/">
        <Logo />
      </a>
      FAQ
    </h1>
    
    <h2>What is Hondo?</h2>
    
    <p>Hondo is a word guessing game. You score points by guessing five-letter code words. The more you guess in a row, the higher your score. The goal is to get to 100, in as few guesses as possible.</p>


    <h2>Why is it called Hondo?</h2>

    <p>This is a bit of a chicken-and-egg answer, but: as I was experimenting with game mechanics, I didn't know what the goal of the game would be, or what its name would be. I considered making this word guessing game infinite, with the only goal to produce as high a score as possible. I also considered races to lower scores.</p>

    <p>However, similar to my other game, <a href="https://quina.app">Quina</a>, I wanted the name itself to be a five-letter word.</p>

    <p>When I came up with the idea of stopping the game at 100, the name "Hondo" (meaning "100" in gamer slang) jumped out at me, and it just felt right.</p>
    
    
    <h2>Is Hondo like Wordle?</h2>
    
    <p>Yes, in the sense that they both use five-letter words, and an almost identical color-based hint system. If you know the rules to Wordle already, you've got a head start here.</p>

    <p>However, instead of guessing just one word, in Hondo, you guess a continuous stream of words. Old guesses and code words become hints for new code words. You also have special abilities you can use as the situation calls for it; see <a href="/how-to-play">how to play</a> for more.</p>


    <h2>How hard is Hondo?</h2>

    <p>Players should find Hondo just a bit more difficult than Wordle, both because it's much longer, and because the code words can sometimes be a bit more advanced.</p>

    <p>I didn't allow any exceptionally obscure words to be added to the list of potential code words (there are around 2,000, and I made sure I personally knew each of them), but several are less common than you'd be likely to find in a game like Wordle.</p>

    <p>That said, with the use of shuffles and good strategy, I think any player fluently familiar with English should be able to enjoy the game.</p>


    <h2>Are plurals included? Non-US spellings? Proper nouns?</h2>

    <p>There are <em>some</em> four-letter plurals included (e.g., "books"), but the number is purposely low. The possibility of a plural makes things more interesting, but limiting the number keeps "s" from being artificially likely as a letter to guess.</p>

    <p>Where there is a discrepancy between UK or Canadian spelling, Hondo uses American English. (For example: you might get "liter" as a code word, but not "litre.")</p>

    <p>Some proper nouns are legal as guesses, but none are included as potential code words.</p>
    

    <h2>Why doesn't Hondo have a colorblind mode?</h2>
    
    <p>I myself have color vision deficiency, and often benefitted from the so-called colorblind modes in other games—particularly Wordle, whose yellows and greens are indistinguishable to my eye.</p>
    
    <p>However, although I appreciate the functional attempt at inclusion, it's still locked away in a setting, and it effectively shuffles the player off to a secondary, "other" experience.</p>
    
    <p>While I recognize some games might require some mechanism like this, I don't want that, for myself, or for my players. There's no reason all players can't be included by default in the case of a game like Hondo. Therefore, "exact" letters are always underlined in Hondo, so that even if a player can't distinguish between the colors at all, they can always tell which type of mark is which.</p>


    <h2>So…my data?</h2>

    <p>Stored only in your browser's local storage. Never sent anywhere. Not accessible to anyone else. Contains zero information about anything but the game itself.</p>

    <p>I use analytics, but it's privacy-respecting, GDPR-compliant tracking with no personally identifiable information. It's just to help me see how many people are playing.</p>


    <h2>Who made this and why?</h2>

    <p>Hi, I'm <a href="https://joshcollinsworth.com">Josh Collinsworth</a>. I'm a front-end software engineer. I love making things and playing games.</p>


    <h2>Dude, you should charge for this!</h2>

    <p>Thanks. (Also, that wasn't a question.)</p>
    
    <p>You can <a href="https://ko-fi.com/collinsworth">buy me a coffee</a> or something if you want to, but making a profit was never my goal with this project. Besides, I'm not interested in dealing with advertising, subscriptions, user data, or anything else like that.</p>
    
    <p>I built Hondo just for my own enjoyment (and hopefully, yours). Have fun.
  </div>

  <a href="/" class="back-link">Back to game</a>
</section>


<style lang="scss">
  .about {
    padding: 24px;

    .about-container {
      width: 100%;
      max-width: 34rem;
      margin: auto;
    }

    .button-bar {
      position: fixed;
      top: 24px;
      right: 24px;

      :global(button) {
        background: var(--paper);
      }
    }

    h1 {
      font-size: 2.5rem;
      margin-top: 0;

      a {
        height: 1em;
        width: auto;
        margin-right: 0.5em;
        display: block;
      }
    }

    h2 {
      margin-top: 4rem;
    }

    .back-link {
      display: block;
      font-size: 1.2rem;
      margin-top: 4rem;
    }
  }
</style>