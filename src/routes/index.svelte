<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */

	import prismicClient from '$lib/prismic/prismicClient';

	export async function load({
		page: {
			path,
			params: { page }
		}
	}) {
		if (path && path === '/') {
			page = 'homepage';
		}

		const dataPrismic = await prismicClient.getByUID('page', page, {});

		if (!dataPrismic) {
			return {
				status: 404,
				error: new Error(`Could not load ${page}`)
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

	import Hero from '$components/Hero.svelte';
	import MyProjects from '$components/MyProjects.svelte';
	import MyStories from '$components/MyStories.svelte';
	import MyStory from '$components/MyStory.svelte';

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

	console.log(slicePrismic);
</script>

<div class="container mx-auto">
	{#await data}
		Loading.
		{data}
	{:then data}
		{#each data as { slice_type, primary }}
			{#each slicePrismic as { slice, component }}
				{#if slice === slice_type}
					<svelte:component this={component} props={primary} />
				{/if}
			{/each}
		{/each}
	{/await}
	<!-- {#if dataPrismic && data}
		{#each data as { slice_type, primary }}
			{#each slicePrismic as { slice, component }}
				{#if slice === slice_type}
					<svelte:component this={component} props={primary} />
				{/if}
			{/each}
		{/each}
	{:else}
		404
	{/if} -->
</div>

<style>
</style>
