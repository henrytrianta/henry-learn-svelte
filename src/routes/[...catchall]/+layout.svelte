<script>
	import '../../app.css';
	import Header from '$modules/common/components/Header.svelte';
	import menuOpen from '$modules/common/stores/menuStore';
	import Footer from '$modules/common/components/Footer.svelte';
	import { QueryClientProvider } from '@sveltestack/svelte-query';

	/** @type {import('./$types').LayoutData} */
	export let data;
</script>

<div
	class={`dark:bg-primary transition-colors duration-500 min-h-screen ${
		$menuOpen ? 'max-h-screen overflow-hidden relative' : ''
	}`}
>
	<QueryClientProvider>
		<Header menus={data.navigation} />
		<slot />
		<Footer />
	</QueryClientProvider>
</div>
