<script lang="ts">
import { isMenuOpen } from '$lib/state/global'
import { toggleMenuOpen } from '$lib/state/mutations'

import DarkModeToggle from './DarkModeToggle.svelte'
import CloseMenuButton from './CloseMenuButton.svelte'
import QuestionBlock from './icon/blocks/QuestionBlock.svelte'
import StatsBlock from './icon/blocks/StatsBlock.svelte'
import HBlock from './icon/blocks/HBlock.svelte'
import Logo from './icon/Logo.svelte'
import PlayBlock from './icon/blocks/PlayBlock.svelte'
import { version } from '../../../package.json'

import { tick } from 'svelte'
import { fly, fade } from 'svelte/transition'
import { quintIn, quintOut } from 'svelte/easing'
import { goto } from '$app/navigation'
import { is_client } from 'svelte/internal'

export let currentPage: string

let iconColor = 'var(--tertiary)'
let navMenu: HTMLElement

const handleReturnToGame = (): void => {
	if (currentPage !== '/') {
		goto('/')
	}
	toggleMenuOpen()
}

const listenForClose = (e: KeyboardEvent): void => {
	if (e.key === 'Escape' && $isMenuOpen) {
		toggleMenuOpen()
	}
}

isMenuOpen.subscribe(async (isOpen) => {
	if (isOpen && is_client) {
		await tick()
		navMenu?.focus()
	}
})
</script>


<svelte:window on:keyup={listenForClose} />


{#if $isMenuOpen}
	<div
		class="menu-background"
		on:click|self={toggleMenuOpen}
		in:fade={{ duration: 240, easing: quintOut }}
		out:fade={{ duration: 240, easing: quintIn }}
	>
		<aside
			class="menu"
			class:open={$isMenuOpen}
			out:fly={{ x: 80, duration: 200, easing: quintIn }}
		>
			<nav tabindex="-1" bind:this={navMenu}>
				<ul class="menu__links" aria-labelledby="menu-heading">
					<li>
						<a href="/" on:click={toggleMenuOpen}>
							<span aria-hidden="true">
								<PlayBlock {iconColor} />
							</span>
							Back to game
						</a>
					</li>
					<li>
						<a href="/how-to-play" on:click={toggleMenuOpen}>
							<span aria-hidden="true">
								<HBlock {iconColor} />
							</span>
							How to play
						</a>
					</li>
					<li>
						<a href="/stats" on:click={toggleMenuOpen}>
							<span aria-hidden="true">
								<StatsBlock {iconColor} />
							</span>
							Stats
						</a>
					</li>
					<li>
						<a href="/faq" on:click={toggleMenuOpen}>
							<span aria-hidden="true">
								<QuestionBlock {iconColor} />
							</span>
							FAQ
						</a>
					</li>
				</ul>
			</nav>
			<div class="display-flex button-bar menu__buttons">
				<div class="button-bar__logo display-flex center-content">
					<a href="/" on:click|preventDefault={handleReturnToGame} class="display-flex center-content">
						<span aria-hidden="true" class="line-height-0">
							<Logo />
						</span>
						<span class="sr">Hondo logo - return to game</span>
					</a>
				</div>
				<div class="button-bar__buttons display-flex center-content">
					<DarkModeToggle />
					<CloseMenuButton />
				</div>
			</div>
			<span class="hondo-version">v{version}</span>
		</aside>
	</div>
{/if}



<style lang="scss">
.menu-background {
	position: fixed;
	top: 0;
	left: 0;
	min-height: 100vh;
	min-height: 100dvh;
	width: 100vw;
	background: rgba(var(--paperRGB), 0.9);
	z-index: 10;
	will-change: opacity;
}

.menu {
	position: relative;
	width: 100%;
	max-width: 28rem;
	min-height: 100vh;
	min-height: 100dvh;
	padding: 24px;
	transition: transform 0.3s cubic-bezier(0.23, 1, 0.320, 1);
	background: transparent;
	color: var(--ink);
	z-index: 10;
	margin: 0 auto;
	will-change: transform, opacity;

	:global(*:focus-within) {
		outline-color: var(--lightBlue);
	}

	.button-bar {
		position: absolute;
		top: 24px;
		right: 24px;
		gap: 1rem;
		justify-content: space-between;
		width: calc(100% - 48px);

		.button-bar__logo {
			width: 10rem;
		}

		.button-bar__buttons {
			gap: 0.5rem;
		}
	}

	.menu__links {
		margin-top: 8rem;
		padding-left: 0;
		list-style-type: none;

		li {
			will-change: transform;
			animation: zoom_in_left 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
			opacity: 0;

			@for $i from 1 through 5 {
				&:nth-of-type(#{$i}) {
					animation-delay: $i * 0.07s;
				}
			} 

			a {
				text-decoration: none;
				display: flex;
				align-items: center;

				span {
					width: 1.5em;
					margin-right: 0.75em;
					height: 100%;
					line-height: 1;
				}
			}
		}
	}

	li {
		margin-bottom: 1.5em;
	}

	a {
		color: inherit;
		font-size: 1.2rem;
	}

	.button-bar {
		margin-top: 0;
	}

	.menu__buttons {
		animation: zoom_in_left 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
		will-change: transform;
		opacity: 0;
	}
}

.hondo-version {
	font-size: 12px;
	position: absolute;
	bottom: 1rem;
	left: 1rem;
}
</style>