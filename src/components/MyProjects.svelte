<script>
	import IoMdJournal from 'svelte-icons/io/IoMdJournal.svelte';
	import IoMdArrowDropright from 'svelte-icons/io/IoMdArrowDropright.svelte';
	import IoMdArrowDroprightCircle from 'svelte-icons/io/IoMdArrowDroprightCircle.svelte';

</script>

<div class="py-16 lg:py-20">
	<div class="flex items-center pb-6">
		<div class="w-12 dark:text-white">
			<IoMdJournal />
		</div>
		<h3 class="ml-3 text-2xl font-semibold font-body text-primary dark:text-white">My Projects</h3>
	</div>
	<div>
		{#each Array(4) as item}
			<a
				href="index.html"
				class="flex items-center justify-between px-4 py-4 mb-6 border sm:px-6 border-grey-lighter"
			>
				<span class="pr-8 w-9/10">
					<h4 class="text-lg font-semibold font-body text-primary dark:text-white">TailwindCSS</h4>
					<p class="font-light font-body text-primary dark:text-white">
						Rapidly build modern websites without ever leaving your HTML.
					</p>
				</span>
				<span class="w-1/10">
					<div class="w-8 dark:text-white">
						<IoMdArrowDroprightCircle />
					</div>
				</span>
			</a>
		{/each}
	</div>
</div>
