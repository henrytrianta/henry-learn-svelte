<script>
	import { SliceZone } from '@prismicio/svelte';
	import { dev } from '$app/environment';
	import * as components from '$modules/slices/index';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
	<title>{data.seo.title}</title>
	<meta name="description" content={data.seo.description} />
</svelte:head>

<div class="container mx-auto">
	<!-- should use key to force render the components -->
	{#key data}
		<SliceZone slices={data.page.data.body} {components} {dev} />
	{/key}
</div>
