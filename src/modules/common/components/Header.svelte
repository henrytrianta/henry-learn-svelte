<script lang="ts">
	// get store color
	import { toogleTheme, theme } from '$modules/common/stores/themeStore';
	// get store menu
	import { menuOpen, toogleMenuOpen } from '$modules/common/stores/menuStore';
	// props
	import type { LinkField, RichTextField } from '@prismicio/types';
	interface Navigation {
		link_label: RichTextField;
		link_url: LinkField;
	}
	export let menus: Navigation[];
	import { asText, asLink } from '@prismicio/helpers';
	import Logo from './Logos/Logo.svelte';
	// icons
	import LogoMoon from './Logos/LogoMoon.svelte';
	import LogoSunny from './Logos/LogoSunny.svelte';
	import LogoMenu from './Logos/LogoMenu.svelte';
	import LogoClose from './Logos/LogoClose.svelte';
	import isStartWithHost from '../utils/isStartWithHost';
</script>

<div class="container mx-auto">
	<div class="flex items-center justify-between py-6 lg:py-10">
		<a href="/" class="flex items-center" aria-label="Go to homepage">
			<span class="mr-2 text-primary dark:text-white text-[100px]">
				<Logo />
			</span>
		</a>
		<div class="flex items-center lg:hidden">
			<button
				aria-label="Theme button"
				class={`text-3xl text-primary dark:text-white cursor-pointer mr-4 w-8`}
				on:click={() => {
					toogleTheme();
				}}
			>
				{#if $theme === 'light'}
					<LogoMoon />
				{:else}
					<LogoSunny />
				{/if}
			</button>

			<button
				aria-label="Menu button"
				on:click={() => {
					toogleMenuOpen();
				}}
				class="text-3xl text-primary dark:text-white cursor-pointer w-8"
			>
				<LogoMenu />
			</button>
		</div>
		<div class="hidden lg:block">
			<ul class="flex items-center">
				{#each menus as { link_url, link_label }, i}
					<li class="relative mb-1 mr-6 group">
						<div
							id={`menu-${i}`}
							class="absolute bottom-0 left-0 z-20 w-full h-0 transition-all opacity-75 group-hover:h-2 group-hover:bg-secondary"
						/>
						<a
							href={asLink(link_url)}
							target={isStartWithHost(asLink(link_url)) ? '_blank' : undefined}
							class="relative z-30 block px-2 text-lg font-medium transition-colors font-body text-primary dark:text-white group-hover:text-primary-500 dark:group-hover:text-primary-500"
						>
							{asText(link_label)}
						</a>
					</li>
				{/each}
				<li>
					<button
						aria-label="Theme button"
						class={`text-3xl text-primary dark:text-white cursor-pointer w-8`}
						on:click={() => {
							toogleTheme();
						}}
					>
						{#if $theme === 'light'}
							<LogoMoon />
						{:else}
							<LogoSunny />
						{/if}
					</button>
				</li>
			</ul>
		</div>
	</div>
</div>

<div
	class={`bg-black bg-opacity-80 fixed inset-0 z-20 flex opacity-0 pointer-events-none transition-opacity lg:hidden ${
		$menuOpen ? `opacity-100 pointer-events-auto` : ``
	}`}
>
	<div class="w-full p-4 flex items-center justify-center">
		<button
			aria-label="Close button"
			class="absolute top-0 right-0 mt-6 mr-4 text-4xl text-white w-8"
			on:click={() => {
				toogleMenuOpen();
			}}
		>
			<LogoClose />
		</button>
		<ul class="justify-center text-center">
			{#each menus as { link_url, link_label }, i}
				<li>
					<a
						href={asLink(link_url)}
						target={isStartWithHost(asLink(link_url)) ? '_blank' : undefined}
						class="block py-4 text-4xl font-medium text-white font-body"
						on:click={() => toogleMenuOpen()}
					>
						{asText(link_label)}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</div>
