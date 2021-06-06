<script lang="ts">
	import Logo from './Logo.svelte';
	import { theme } from '$stores/themeStore';
	import FaGithub from 'svelte-icons/fa/FaGithub.svelte';
	import FaLinkedinIn from 'svelte-icons/fa/FaLinkedinIn.svelte';
	import FaInstagram from 'svelte-icons/fa/FaInstagram.svelte';
	import FaSpotify from 'svelte-icons/fa/FaSpotify.svelte';
	// import { useQuery } from '@sveltestack/svelte-query';

	// const queryResult = useQuery('spotify', async () => {
	// 	return fetch('/api/now-playing').then((res) => res.json());
	// });
	// console.log(queryResult);

	const data = { songUrl: '', title: '', artist: '' };
</script>

<div class="container mx-auto">
	<div
		class="flex flex-col items-center justify-between py-10 border-t sm:flex-row border-grey-lighter sm:py-12"
	>
		<div class="flex flex-col items-center mr-auto">
			<div class="flex flex-row-reverse sm:flex-row mb-8 space-x-0 sm:space-x-2 w-full">
				<div class="h-4 w-4 ml-auto mt-1">
					<FaSpotify />
				</div>
				<div class="inline-flex flex-col sm:flex-row w-full max-w-full truncate">
					{#if data.songUrl}
						<a
							class="text-gray-800 dark:text-gray-200 font-medium max-w-max truncate"
							href={data.songUrl}
							target="_blank"
							rel="noopener noreferrer"
						>
							{data.title}
						</a>
					{:else}
						<p class="text-gray-800 dark:text-gray-200 font-medium">Not Playing</p>
					{/if}

					<span class="mx-2 text-gray-500 dark:text-gray-300 hidden sm:block">
						{' – '}
					</span>

					<p class="text-gray-500 dark:text-gray-300 max-w-max truncate">
						{data.artist ?? 'Spotify'}
					</p>
				</div>
			</div>

			<div class="flex flex-row-reverse sm:flex-row mb-8 space-x-0 sm:space-x-2 w-full">
				<a href="index.html" class="mr-auto sm:mr-3">
					<Logo width="50px" fill={$theme === 'light' ? '' : 'white'} />
				</a>
				<p class="pt-5 font-light font-body text-primary dark:text-white sm:pt-0">
					©2020 Henry Trianta.
				</p>
			</div>
		</div>
		<div class="flex items-center pt-5 mr-auto sm:pt-0 sm:mr-0">
			<a href="https://github.com/henrytrianta" target="_blank">
				<div
					class="pl-5 text-4xl transition-colors text-primary dark:text-white hover:text-secondary dark:hover:text-secondary w-12"
				>
					<FaGithub />
				</div>
			</a>

			<a href="https://www.linkedin.com/in/henrytrianta" target="_blank">
				<div
					class="pl-5 text-4xl transition-colors text-primary dark:text-white hover:text-secondary dark:hover:text-secondary w-12"
				>
					<FaLinkedinIn />
				</div>
			</a>

			<a href="https://instagram.com/henrytrianta" target="_blank">
				<div
					class="pl-5 text-4xl transition-colors text-primary dark:text-white hover:text-secondary dark:hover:text-secondary w-12"
				>
					<FaInstagram />
				</div>
			</a>
		</div>
	</div>
</div>
