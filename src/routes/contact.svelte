<script lang="ts">
import MenuButton from "$lib/components/MenuButton.svelte"


	let isSubmitted = false
	let showError = false

	let formData = {
		name: '',
		email: '',
		message: ''
	}

	const encode = (data: object): string => {
		return Object.keys(data)
			.map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
			.join('&')
	}

	const handleSubmit = (e: Event): void => {
		const { name, email, message } = formData

		if (!name || !email || !message) {
			showError = true
			return
		}
		
		const target = e.target as HTMLFormElement
		fetch('/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: encode({
					'form-name': target.getAttribute('name'),
					...formData,
				}),
			})
			.then(() => { isSubmitted = true })
			.catch(error => alert(error))
	}
</script>


<svelte:head>
	<title>Hondo | Contact</title>
</svelte:head>


<div class="container">
  <MenuButton floating={true} />
  <h2>Contact the author</h2>

  {#if !isSubmitted}
    <noscript>
      <h3>Sorry, this contact form won't work without JavaScript enabled.</h3>
      <p>I don't do any tracking or anything like that though (except some <a href="https://plausible.io">privacy-respecting analytics</a>), if that's your concern.</p>
    </noscript>

    <form
      id="contact-form"
      name="contact"
      method="post"
      on:submit|preventDefault={handleSubmit}
      action="/success/"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
    >
      <input type="hidden" name="form-name" value="contact" />
      <p hidden>
        <label>
          Don’t fill this out: <input name="bot-field" />
        </label>
      </p>
      <div class="sender-info">
        <div>
          <label for="name" class="label" >Your name</label>
          <input type="text" name="name" bind:value={formData.name} placeholder="What should I call you?" />
        </div>
        <div>
          <label for="email">
            Your email address
          </label>
          <input type="email" name="email" bind:value={formData.email} placeholder="Where can I send my response?" />
        </div>
      </div>

      <div class="message-wrapper">
        <label for="message">What's on your mind?</label>
        <textarea name="message" bind:value={formData.message} rows="6" placeholder="What would you like to talk about?"></textarea>
      </div>

      {#if showError}
        <div class="error">
          Please be sure all above fields are filled out. Thanks!
        </div>
      {/if}

      <p class="small-print">Your email address will only be used for the purpose of responding to this message.</p>

      <button type="submit">
        Send
      </button>
    </form>
  {:else}
    <h3>Thanks for your message!</h3>

    <p>I'll follow up by email soon.</p>

    <a href="/">Back to game</a>
  {/if}
</div>

<style lang="scss">
	h2 {
		margin: 0;
	}

	#contact-form {
		width: 100%;
		margin-top: 4rem;
		
		label {
			font-weight: var(--fontWeightSemiBold);
		}

    input, textarea {
      color: inherit;
      font: inherit;
      background: transparent;
      width: 100%;
      margin-bottom: 2rem;
    }

    input {
      background: transparent;
      border: 0;
      border-bottom: 1px solid var(--ink);
      padding: 0.25rem 0;
    }

    textarea {
      border: 1px solid var(--ink);
      padding: 0.25rem;
    }

		.error {
			background-color: var(--red);
			color: var(--white);
			padding: calc(var(--quarterNote) * 0.5) var(--quarterNote);
			margin: var(--quarterNote) 0;
			font-style: italic;
		}

    .small-print {
      font-size: 0.75rem;
      line-height: 1.2;
      font-style: italic;
    }
	}
</style>
