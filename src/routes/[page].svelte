<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */

	import prismicClient from '$lib/prismic/prismicClient';

	export async function load({ page }) {
		let path = page.path || '';
		let pageParam = page.params.page || '';

		if (path && path === '/') {
			pageParam = 'homepage';
		}

		const dataPrismic = await prismicClient.getByUID('page', pageParam, {});

		if (!dataPrismic) {
			return {
				status: 404,
				error: new Error(`Could not load ${page.params.page}`)
			};
		}

		return {
			props: {
				dataPrismic
			}
		};
	}
</script>

<script lang="ts">
	// Component

	import Hero from '$lib/component/Hero.svelte';
	import MyProjects from '$lib/component/MyProjects.svelte';
	import MyStories from '$lib/component/MyStories.svelte';
	import MyStory from '$lib/component/MyStory.svelte';

	// Data
	export let dataPrismic;
	let data: ArrayLike<unknown> = [];

	if (dataPrismic) {
		data = dataPrismic.data.body;
	}

	const slicePrismic = [
		{ slice: 'hero', component: Hero },
		{ slice: 'myproject', component: MyProjects },
		{ slice: 'mystories', component: MyStories },
		{ slice: 'mystory', component: MyStory }
	];
</script>

<div class="container mx-auto">
	{#if dataPrismic && data}
		{#each data as { slice_type, primary }}
			{#each slicePrismic as { slice, component }}
				{#if slice === slice_type}
					<svelte:component this={component} props={primary} />
				{/if}
			{/each}
		{/each}
	{:else}
		404
	{/if}
</div>

<style lang="scss">
</style>
