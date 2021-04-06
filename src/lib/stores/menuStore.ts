import { writable } from 'svelte/store';

export const menuOpen = writable(false);

export const toogleMenuOpen = (): void => {
	menuOpen.update((value) => (value = !value));
};
