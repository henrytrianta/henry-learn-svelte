<script type="ts">
	export let props;
	import linkResolver from '$lib/prismic/resolver';
	import DOM from 'prismic-dom';
	import { is_empty } from 'svelte/internal';

</script>

{#if !is_empty(props)}
	<div class="py-16 border-b border-grey-lighter lg:py-20">
		{#if props.icon.url}
			<div>
				<img
					src={`${props.icon.url}`}
					width="64px"
					height="64px"
					class="rounded-full"
					alt="author"
				/>
			</div>
		{/if}
		{#if DOM.RichText.asText(props.title)}
			<h1
				class="pt-3 text-4xl font-semibold font-body text-primary dark:text-white md:text-5xl lg:text-6xl"
			>
				{DOM.RichText.asText(props.title)}
			</h1>
		{/if}
		{#if DOM.RichText.asText(props.description)}
			<p class="pt-3 text-xl font-light font-body text-primary dark:text-white">
				{DOM.RichText.asText(props.description)}
			</p>
		{/if}
		{#if DOM.RichText.asText(props.cta_label)}
			<a
				href={linkResolver(props.cta_link)}
				class="block px-10 py-4 mt-12 text-xl font-semibold text-center text-primary-800 transition-colors sm:inline-block bg-secondary hover:bg-green font-body sm:text-2xl sm:text-left"
			>
				{DOM.RichText.asText(props.cta_label)}
			</a>
		{/if}
	</div>
{/if}
