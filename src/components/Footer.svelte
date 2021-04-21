<script lang="ts">
	import Logo from './Logo.svelte';
	import { theme } from '$stores/themeStore';
</script>

<div class="container mx-auto">
	<div
		class="flex flex-col items-center justify-between py-10 border-t sm:flex-row border-grey-lighter sm:py-12"
	>
		<div class="flex flex-col items-center mr-auto sm:flex-row">
			<a href="index.html" class="mr-auto sm:mr-3">
				<Logo width="50px" fill={$theme === 'light' ? '' : 'white'} />
			</a>
			<p class="pt-5 font-light font-body text-primary dark:text-white sm:pt-0">
				©2020 Henry Trianta.
			</p>
		</div>
		<div class="flex items-center pt-5 mr-auto sm:pt-0 sm:mr-0">
			<a href="https://github.com/henrytrianta" target="_blank">
				<i
					class="pl-5 text-4xl transition-colors text-primary dark:text-white hover:text-secondary dark:hover:text-secondary bx bxl-github"
				/>
			</a>

			<a href="https://www.linkedin.com/in/henrytrianta" target="_blank">
				<i
					class="pl-5 text-4xl transition-colors text-primary dark:text-white hover:text-secondary dark:hover:text-secondary bx bxl-linkedin"
				/>
			</a>

			<a href="https://instagram.com/henrytrianta" target="_blank">
				<i
					class="pl-5 text-4xl transition-colors text-primary dark:text-white hover:text-secondary dark:hover:text-secondary bx bxl-instagram-alt"
				/>
			</a>
		</div>
	</div>
</div>
