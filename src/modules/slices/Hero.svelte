<script lang="ts">
	export let slice: any;
	const { primary } = slice;
	import { asLink, asText } from '@prismicio/helpers';
	import { is_empty } from 'svelte/internal';
</script>

{#if !is_empty(slice) && !is_empty(primary)}
	<div class="py-16 border-b border-grey-lighter lg:py-20">
		{#if primary.icon.url}
			<div>
				<img
					src={`${primary.icon.url}`}
					width="64px"
					height="64px"
					class="rounded-full"
					alt="author"
				/>
			</div>
		{/if}
		{#if asText(primary.title)}
			<h1
				class="pt-3 text-4xl font-semibold font-body text-primary dark:text-white md:text-5xl lg:text-6xl"
			>
				{asText(primary.title)}
			</h1>
		{/if}
		{#if asText(primary.description)}
			<p class="pt-3 text-xl font-light font-body text-primary dark:text-white">
				{asText(primary.description)}
			</p>
		{/if}
		{#if asText(primary.cta_label)}
			<a
				href={asLink(primary.cta_link)}
				class="block px-10 py-4 mt-12 text-xl font-semibold text-center text-primary-800 transition-colors sm:inline-block bg-secondary hover:bg-green font-body sm:text-2xl sm:text-left"
			>
				{asText(primary.cta_label)}
			</a>
		{/if}
	</div>
{/if}
