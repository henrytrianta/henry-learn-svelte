<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ fetch }) {
		const url = `/api/header.json`;
		const res = await fetch(url);

		if (res.ok) {
			return {
				props: {
					menus: await res.json()
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	}
</script>

<script type="ts">
	export let menus: any;

	// TODO: Strange when it's going to 404, load function is not invoke so static aja. LOL
	if (!menus) {
		menus = [
			{
				link: '/',
				title: 'Home'
			},
			{
				link: '/blog',
				title: 'Blog'
			},
			{
				link: '/uses',
				title: 'Uses'
			},
			{
				link: '/work',
				title: 'Work'
			},
			{
				link: '/contact',
				title: 'Contact'
			}
		];
	}

	// get store menu
	import { menuOpen } from '$lib/stores/menuStore';

	// check theme color in local storage when refresh
	import { theme } from '$lib/stores/themeStore';
	import { onMount } from 'svelte';

	// component
	import '../app.scss';

	import Header from '$lib/component/Header.svelte';
	import Footer from '$lib/component/Footer.svelte';

	onMount(() => {
		if ($theme === 'dark') {
			window.document.body.classList.add('dark');
		}
	});
</script>

<div
	class={`dark:bg-primary transition-colors duration-500 ${
		$menuOpen ? 'max-h-screen overflow-hidden relative' : ''
	}`}
>
	<Header {menus} />
	<slot />
	<Footer />
</div>
