<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	import { loadNav } from '$lib/prismic/prismicClient';

	export async function load() {
		const res = await loadNav();

		if (!res) {
			return {
				status: 500,
				error: new Error(`Could not load Navigation`)
			};
		}

		return {
			props: {
				menus: res
			}
		};
	}

</script>

<script type="ts">
	export let menus: any;

	// get store menu
	import menuOpen from '$stores/menuStore';
	// check theme color in local storage when refresh
	import theme from '$stores/themeStore';
	import { onMount } from 'svelte';
	// styles
	import '../app.postcss';
	// component
	import Header from '$components/Header.svelte';
	import Footer from '$components/Footer.svelte';
	// provider svelte query
	import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';
	import Gtm from '$components/GTM.svelte';
	const queryClient = new QueryClient();

	onMount(() => {
		if ($theme === 'dark') {
			window.setTimeout(() => {
				window.document.body.classList.add('dark');
			}, 0);
		}
	});

</script>

<Gtm gtmId="GTM-MGP5K7S" />

<div
	class={`dark:bg-primary transition-colors duration-500 min-h-screen ${
		$menuOpen ? 'max-h-screen overflow-hidden relative' : ''
	}`}
>
	<QueryClientProvider client={queryClient}>
		<svelte:component this={Header} {menus} />
		<slot />
		<svelte:component this={Footer} />
	</QueryClientProvider>
</div>
