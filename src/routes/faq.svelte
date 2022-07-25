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
    <p>Hondo is a word guessing game. You score points by guessing five-letter code words. The more you guess in a row, the higher your score.</p>
    <p>The goal is to get to 100, in as few guesses as possible (hence the name).</p>


    <h2>Is Hondo like Wordle?</h2>
    <p>Yes, in the sense that they both use five-letter words, and a color-based hint system. If you know the rules to Wordle already, this isn't a big jump.</p>
    <p>However, in Hondo, you guess a continuous stream of words. Old guesses and code words become hints for new code words.</p>
    <p>You also have special abilities you can use as the situation calls for it; see <a href="/how-to-play">how to play</a> for more.</p>
    <p><small><i>(Legal disclaimer: the comparison is for illustrative purposes only; Hondo is not in any way affiliated with or related to Wordle.)</i></small></p>


    <h2>How hard is Hondo?</h2>
    <p>Players will likely find Hondo about as easy to play as Wordle, but a bit more difficult to excel at. Hondo is longer, more complex, and the code words can sometimes be more advanced than you’d be likely to find in a game like Wordle. (I tried to avoid any <em>extremely</em> obscure words, however.)</p>
    <p>That said, with the use of shuffles, skips, and good strategy, I think any player fluent in English should be able to enjoy the game on their own individual level.</p>


    <h2>Are plurals included as code words? Non-US words/spellings? Proper nouns?</h2>
    <p>There are <em>some</em> four-letter plurals included as code words (e.g., “books”), but the number is purposely low. The possibility of a plural makes things more interesting, but limiting the number keeps “s” from being artificially common.</p>
    <p>Where there is a discrepancy between UK or Canadian spelling, Hondo uses American English. (For example: you might get “liter” as a code word, but not “litre.”)</p>
    <p>Some proper nouns are legal as guesses, but none are included as potential code words.</p>
    <p>Just about all code words are English, but a few non-English words commonly used by English are present. (For example, “adieu.”)</p>


    <h2>Why is it called Hondo?</h2>
    <p>This is a bit of a chicken-and-egg answer, but: as I was experimenting with game mechanics, I didn’t know what the goal of the game would be, or what its name would be. I considered making this word guessing game infinite, with no limit on high score. I also considered making the game shorter, in various ways.</p>
    <p>However, similar to my other game, <a href="https://quina.app">Quina</a>, I wanted the name itself to be a five-letter “word.”</p>
    <p>When I came up with the idea of stopping the game at 100, the name “Hondo” (meaning “100” in gamer slang) jumped out at me, and it just felt right.</p>


    <h2>How do bonus points work?</h2>
    <p>The “bonus” display at the top shows how many extra points you’ll get (beyond the first) for correctly guessing the current code word with your next attempt. It goes up by one every time you correctly guess the code word, and resets to zero on an incorrect guess.</p>
    <p>A simpler way to think of it might be: you get a point for every correct guess in a row.</p>

    <h2>What is a “perfect game?”</h2>
    <p>While very difficult to pull off, it is possible to score 100 points in just 14 turns.</p>
    <p>This is considered a perfect game because it requires 14 consecutive correct guesses, without a single miss.</p>
    <p>To achieve a perfect game, you'll need a lot of luck, and you'll also need make good use of shuffles and skips (starting on your first turn).</p>
    <p>Incidentally, this also means 14 is the highest possible streak.</p>


    <h2>Why doesn’t Hondo have a colorblind mode?</h2>
    <p>I myself have color vision deficiency, and often benefit from the so-called colorblind modes in other games (particularly Wordle, whose yellows and greens are indistinguishable to my eye).</p>
    <p>However, although I appreciate those options, they’re still locked away in a non-default setting, which effectively shuffles the player off to a secondary, “other” experience.</p>
    <p>While I recognize some games might be complex enough to require mechanisms like this, I don't think word games like this one meet that criteria. And while I do appreciate consideration—certainly, a colorblind mode toggle is better than nothing—I believe accessibility should be the default, not an opt-in.</p>
    <p>That's why “exact” letters are always underlined in Hondo; so that even if a player can’t distinguish between the colors at all, they can always tell which type of hint is which.</p>
    
    
    <h2>So…my data? Secure? Shared? What’s up?</h2>
    <p>I use privacy-respecting, GDPR-compliant analytics with no personally identifiable information, just to help me personally gauge how many people are playing. That’s it.</p>
    <p>Your game data (play history, etc.) is stored only in your device’s local storage. Never sent anywhere. Not accessible to anyone else. Contains zero information about anything but the game itself.</p>
    
    
    <h2>Who made this and why?</h2>
    <p>Hi, I’m <a href="https://joshcollinsworth.com">Josh Collinsworth</a>. I’m a front-end software engineer. I love making things and playing games. I designed and built this game, including all the design and icons.</p>
    
    
    <h2>I found a bug, what should I do?</h2>
    <p>Try my <a href="https://joshcollinsworth.com/contact?from_page=hondo_faq">contact form here</a> (thanks in advance)!</p>


    <h2>Why aren’t you trying to make money on this?</h2>
    <p>You can <a href="https://ko-fi.com/collinsworth">buy me a coffee</a> or something if you want to, but I’m not interested in dealing with advertising, subscriptions, user data, or anything else like that.</p>
    <p>Making a profit was never my goal with this project. I built Hondo just for my own enjoyment (and hopefully, yours). Have fun.


    <h2>You know the tagline should say “100 words or FEWER,” right?</h2>
    <p>Yes. “Less” sounds better.</p>
      
      
    <h2>What's this app made with?</h2>
    <p><a href="https://kit.svelte.dev/">SvelteKit</a>.<span aria-hidden="true">❤️</span></p>


    <h2>Are any of these questions actually asked frequently (or at all)?</h2>
    <p>I dunno. I just made them all up.</p>


    <h2>Is a hot dog a sandwich?</h2>
    <p>Technically, maybe, but semantically, no, and since the point of language is communication, semantics beats technicality.</p>


    <a href="/" class="back-link">Back to game</a>
  </div>
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
    margin-top: 0;

    :global(button) {
      background: var(--paper);
    }
  }

  h1 {
    font-size: 2.5rem;
    margin-top: 0;
    
    a {
      display: flex;
      align-items: center;
      height: 0.8em;
      width: auto;
      margin-right: 0.5em;
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