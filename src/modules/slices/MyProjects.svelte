<script lang="ts">
	import LogoBranch from '$modules/common/components/Logos/LogoBranch.svelte';
	import LogoRight from '$modules/common/components/Logos/LogoRight.svelte';
	import { asLink, asText } from '@prismicio/helpers';

	export let slice: any;
	const { items } = slice;
</script>

<div class="py-16 lg:py-20">
	<div class="flex items-center pb-6">
		<div class="text-[18px] dark:text-white">
			<LogoBranch />
		</div>
		<div class="ml-3 text-2xl font-semibold font-body text-primary dark:text-white">
			My Projects
		</div>
	</div>
	<div>
		{#each items as { project: { data } }}
			<a
				href={asLink(data.link)}
				class="flex items-center justify-between px-4 py-4 mb-6 border sm:px-6 border-grey-lighter"
				target="_blank"
				rel="noreferrer"
			>
				<span class="pr-8 w-9/10">
					<h4 class="text-lg font-semibold font-body text-primary dark:text-white">
						{asText(data.title)}
					</h4>
					<p class="font-light font-body text-primary dark:text-white">
						{asText(data.description)}
					</p>
				</span>
				<span class="w-1/10">
					<div class="w-8 dark:text-white">
						<LogoRight />
					</div>
				</span>
			</a>
		{/each}
	</div>
</div>
