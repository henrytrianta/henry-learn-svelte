<script context="module" ssr>
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */

	import prismicClient from '$lib/prismic/prismicClient';

	export async function load({ params: { page } }) {
		// If path root find homepage
		if (page === '') {
			page = 'homepage';
		}
		// Fetch data
		try {
			const graphQuery = `
			{
				page {
					body {
						...on myproject {
							repeat {
								project {
									...on project {
										title
										description
										link
									}
								}
							}
						}
						...on hero {
							non-repeat {
								...non-repeatFields
							}
							repeat {
								...repeatFields
							}
						}
						...on form {
							non-repeat {
								...non-repeatFields
							}
							repeat {
								...repeatFields
							}
						}
					}
					meta_title
					meta_description
					social_cards
				}
			}
			`;
			const { data } = await prismicClient.getByUID('page', page, {
				graphQuery
			});

			return {
				props: {
					data
				}
			};
		} catch (error) {
			return {
				status: 404,
				error: new Error(`Not found.`)
			};
		}
	}
</script>

<script lang="ts">
	// Data
	export let data;
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
	title={data.meta_title}
	description={data.meta_description}
	openGraph={{
		title: data.social_cards[0].social_card_title,
		description: data.social_cards[0].social_card_description,
		images: [
			{
				url: data.social_cards[0].social_card_image.url,
				width: data.social_cards[0].social_card_image.dimensions.height,
				height: data.social_cards[0].social_card_image.dimensions.height,
				alt: data.social_cards[0].social_card_image.alt
			}
		]
	}}
/>

{#if data}
	<div class="container mx-auto">
		{#each data.body as { slice_type, ...rest }}
			{#each slicePrismic as { slice, component }}
				{#if slice === slice_type}
					<svelte:component this={component} props={rest} />
				{/if}
			{/each}
		{/each}
	</div>
{/if}

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
