import { writable } from 'svelte/store';
import type { ToastMessage } from '../js/types';
import type { Component } from 'svelte';

export const isLoading = writable<boolean>(false);
export const isScoring = writable<boolean>(false);
export const toast = writable<ToastMessage>({ message: '' });
export const shownModal = writable<Component | null>(null);
export const isMenuOpen = writable<boolean>(false);
export const hasViewedTutorial = writable<boolean>(false);
