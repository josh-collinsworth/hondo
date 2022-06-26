import { writable } from 'svelte/store'
import type { ToastMessage } from '../js/types'
import type { SvelteComponent } from 'svelte'

export const isLoading = writable<boolean>(false)
export const toast = writable<ToastMessage>({ message: '' })
export const shownModal = writable<SvelteComponent|null>(null)
export const isMenuOpen = writable<boolean>(false)
export const hasViewedTutorial = writable<boolean>(false)
