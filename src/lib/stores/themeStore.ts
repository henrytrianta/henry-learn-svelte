import { localStore } from './localStore';
import { browser } from '$app/env';

// Need to save to local storage to keep the settings when refresh
export const theme = localStore('theme', 'light');

export const toogleTheme = (): void => {
	theme.update((value) => (value = value === 'dark' ? 'light' : 'dark'));
	if (browser) {
		window.document.body.classList.toggle('dark');
	}
};
