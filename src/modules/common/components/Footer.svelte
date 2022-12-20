<script lang="ts">
	import Logo from './Logos/Logo.svelte';
	import LogoGithub from './Logos/LogoGithub.svelte';
	import LogoInstagram from './Logos/LogoInstagram.svelte';
	import LogoLinkedIn from './Logos/LogoLinkedIn.svelte';
	import LogoSpotify from './Logos/LogoSpotify.svelte';
	import SpotifyWidget from './SpotifyWidget.svelte';

	const datas = [
		{
			link: 'https://github.com/henrytrianta',
			logo: LogoGithub
		},
		{
			link: 'https://www.linkedin.com/in/henrytrianta',
			logo: LogoLinkedIn
		},
		{
			link: 'https://instagram.com/henrytrianta',
			logo: LogoInstagram
		}
	];
</script>

<div class="container mx-auto">
	<div class="flex flex-row-reverse sm:flex-row mb-8 space-x-0 sm:space-x-2 w-full">
		<div class="text-[18px] ml-auto mt-1 dark:text-white">
			<LogoSpotify />
		</div>
		<div class="inline-flex flex-col sm:flex-row w-full max-w-full truncate">
			<SpotifyWidget />
		</div>
	</div>

	<div
		class="flex flex-col sm:flex-row justify-between items-center border-t border-grey-lighter py-10 sm:py-12"
	>
		<div class="flex flex-col sm:flex-row items-center mr-auto">
			<a href="/" class="mr-auto sm:mr-6 text-primary dark:text-white text-[69px]">
				<Logo />
			</a>
			<p class="font-body font-light text-primary dark:text-white pt-5 sm:pt-0 text-sm">
				©2020 Henry Trianta.
			</p>
		</div>
		<div class="flex items-center pt-5 sm:pt-0 mr-auto sm:mr-0">
			{#each datas as { link, logo }}
				<a href={link} target="_blank" rel="noreferrer">
					<div
						class="pl-2 text-2xl transition-colors text-primary dark:text-white hover:text-secondary dark:hover:text-secondary"
					>
						<svelte:component this={logo} />
					</div>
				</a>
			{/each}
		</div>
	</div>
</div>
