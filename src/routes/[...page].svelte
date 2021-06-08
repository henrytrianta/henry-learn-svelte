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
	// SEO
	import SvelteSeo from 'svelte-seo';
	// Toast
	// This is strange, toast need to be here because rollup-plugin-dynamic-import-variables is fail to build on vite.js
	import Toast from '$components/Toast.svelte';
	import { dismissToast, toasts } from '$stores/toast';

</script>

<SvelteSeo
	title={dataPrismic.data.meta_title}
	description={dataPrismic.data.meta_title}
	openGraph={{
		title: dataPrismic.data.social_cards[0].social_card_title,
		description: dataPrismic.data.social_cards[0].social_card_description,
		images: [
			{
				url: dataPrismic.data.social_cards[0].social_card_image.url,
				width: dataPrismic.data.social_cards[0].social_card_image.dimensions.height,
				height: dataPrismic.data.social_cards[0].social_card_image.dimensions.height,
				alt: dataPrismic.data.social_cards[0].social_card_image.alt
			}
		]
	}}
/>

<div class="container mx-auto">
	{#each dataPrismic.data.body as { slice_type, primary }}
		{#each slicePrismic as { slice, component }}
			{#if slice === slice_type}
				<svelte:component this={component} props={primary} />
			{/if}
		{/each}
	{/each}
</div>

<!-- This is strange, toast need to be here because rollup-plugin-dynamic-import-variables is fail to build on vite.js -->

{#if $toasts}
	<section class="toast">
		{#each $toasts as toast (toast.id)}
			<Toast
				type={toast.type}
				dismissible={toast.dismissible}
				on:dismiss={() => dismissToast(toast.id)}>{toast.message}</Toast
			>
		{/each}
	</section>
{/if}

<style lang="postcss">
	.toast {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		width: 100%;
		display: flex;
		margin-top: 1rem;
		justify-content: center;
		flex-direction: column;
		z-index: 1000;
	}

</style>
