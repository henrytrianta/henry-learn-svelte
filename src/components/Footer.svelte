<script lang="ts">
	import Logo from './Logo.svelte';
	import { theme } from '$stores/themeStore';
	import FaGithub from 'svelte-icons/fa/FaGithub.svelte';
	import FaLinkedinIn from 'svelte-icons/fa/FaLinkedinIn.svelte';
	import FaInstagram from 'svelte-icons/fa/FaInstagram.svelte';
	import FaSpotify from 'svelte-icons/fa/FaSpotify.svelte';
	import SpotifyWidget from '$components/SpotifyWidget.svelte';
</script>

<div class="container mx-auto">
	<div class="flex flex-row-reverse sm:flex-row mb-8 space-x-0 sm:space-x-2 w-full">
		<div class="h-4 w-4 ml-auto mt-1 dark:text-white">
			<FaSpotify />
		</div>
		<div class="inline-flex flex-col sm:flex-row w-full max-w-full truncate">
			<SpotifyWidget />
		</div>
	</div>

	<div
		class="flex flex-col sm:flex-row justify-between items-center border-t border-grey-lighter py-10 sm:py-12"
	>
		<div class="flex flex-col sm:flex-row items-center mr-auto">
			<a href="/" class="mr-auto sm:mr-6">
				<Logo width="50px" fill={$theme === 'light' ? '' : 'white'} />
			</a>
			<p class="font-body font-light text-primary dark:text-white pt-5 sm:pt-0">
				©2020 Henry Trianta.
			</p>
		</div>
		<div class="flex items-center pt-5 sm:pt-0 mr-auto sm:mr-0">
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
