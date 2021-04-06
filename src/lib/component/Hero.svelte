<script type="ts">
	export let props;
	import { default as DOM } from 'prismic-dom';
</script>

<div class="py-16 border-b border-grey-lighter lg:py-20">
	<div>
		<img src="assets/img/author.png" class="w-16 h-16" alt="author" />
	</div>
	<h1
		class="pt-3 text-4xl font-semibold font-body text-primary dark:text-white md:text-5xl lg:text-6xl"
	>
		{DOM.RichText.asText(props.title)}
	</h1>
	<p class="pt-3 text-xl font-light font-body text-primary dark:text-white">
		{DOM.RichText.asText(props.subtitle)}
	</p>
	<a
		href="index.html"
		class="block px-10 py-4 mt-12 text-xl font-semibold text-center text-white transition-colors sm:inline-block bg-secondary hover:bg-green font-body sm:text-2xl sm:text-left"
	>
		Say Hello!
	</a>
</div>
