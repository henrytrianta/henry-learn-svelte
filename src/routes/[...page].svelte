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
		// If path root find homepage
		if (path && path === '/') {
			page = 'homepage';
		}
		// Fetch data
		const dataPrismic = await prismicClient.getByUID('page', page, {});

		if (!dataPrismic) {
			return {
				status: 503,
				error: new Error(`Could not load ${page} on ${path}`)
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
	// Data
	export let dataPrismic;
	// Slice
	import slicePrismic from '$lib/slice/slicePrismic';
</script>

<div class="container mx-auto">
	{#each dataPrismic.data.body as { slice_type, primary }}
		{#each slicePrismic as { slice, component }}
			{#if slice === slice_type}
				<svelte:component this={component} props={primary} />
			{/if}
		{/each}
	{/each}
</div>

<style>
</style>
