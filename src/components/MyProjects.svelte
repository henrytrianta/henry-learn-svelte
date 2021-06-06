<script type="ts">
	import { getProjects } from '$lib/prismic/prismicClient';

	import { useQuery } from '@sveltestack/svelte-query';

	const projects = useQuery('projects', async () => {
		return getProjects();
	});

	import GoGitBranch from 'svelte-icons/go/GoGitBranch.svelte';
	import MdKeyboardArrowRight from 'svelte-icons/md/MdKeyboardArrowRight.svelte';
	import Skeleton from '$components/Skeleton.svelte';
	import DOM from 'prismic-dom';
</script>

<div class="py-16 lg:py-20">
	<div class="flex items-center pb-6">
		<div class="w-8 dark:text-white">
			<GoGitBranch />
		</div>
		<h3 class="ml-3 text-2xl font-semibold font-body text-primary dark:text-white">My Projects</h3>
	</div>
	<div>
		{#if $projects.isLoading}
			<Skeleton height="86px" />
			<div class="mb-6" />
			<Skeleton height="86px" />
			<div class="mb-6" />
			<Skeleton height="86px" />
			<div class="mb-6" />
			<Skeleton height="86px" />
		{:else if $projects.error}
			<div class="text-2xl">There was an error. Please reload.</div>
		{:else}
			{#each $projects.data as { data }}
				<a
					href={DOM.Link.url(data.link)}
					class="flex items-center justify-between px-4 py-4 mb-6 border sm:px-6 border-grey-lighter"
					target="_blank"
				>
					<span class="pr-8 w-9/10">
						<h4 class="text-lg font-semibold font-body text-primary dark:text-white">
							{DOM.RichText.asText(data.title)}
						</h4>
						<p class="font-light font-body text-primary dark:text-white">
							{DOM.RichText.asText(data.description)}
						</p>
					</span>
					<span class="w-1/10">
						<div class="w-8 dark:text-white">
							<MdKeyboardArrowRight />
						</div>
					</span>
				</a>
			{/each}
		{/if}
	</div>
</div>
