<script type="ts">
	// get store color
	import { toogleTheme, theme } from '$stores/themeStore';
	// get store menu
	import { menuOpen, toogleMenuOpen } from '$stores/menuStore';
	// props
	export let menus;
	import DOM from 'prismic-dom';
	import linkResolver from '$lib/prismic/resolver';
	import Logo from './Logo.svelte';
	// Icons
	import IoMdMoon from 'svelte-icons/io/IoMdMoon.svelte';
	import IoMdSunny from 'svelte-icons/io/IoMdSunny.svelte';
	import IoMdClose from 'svelte-icons/io/IoMdClose.svelte';
</script>

<div class="container mx-auto">
	<div class="flex items-center justify-between py-6 lg:py-10">
		<a href="/" class="flex items-center">
			<span href="/" class="mr-2">
				<Logo width="100px" fill={$theme === 'light' ? '' : 'white'} />
			</span>
		</a>
		<div class="flex items-center lg:hidden">
			<i
				class={`text-3xl text-primary dark:text-white cursor-pointer mr-8 w-8`}
				on:click={() => {
					toogleTheme();
				}}
			>
				{#if $theme === 'light'}
					<IoMdMoon />
				{:else}
					<IoMdSunny />
				{/if}
			</i>

			<svg
				width="24"
				height="15"
				xmlns="http://www.w3.org/2000/svg"
				on:click={() => {
					toogleMenuOpen();
				}}
				class="fill-current text-primary dark:text-white"
			>
				<g fill-rule="evenodd">
					<rect width="24" height="3" rx="1.5" />
					<rect x="8" y="6" width="16" height="3" rx="1.5" />
					<rect x="4" y="12" width="20" height="3" rx="1.5" />
				</g>
			</svg>
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
							href={linkResolver(link_url)}
							class="relative z-30 block px-2 text-lg font-medium transition-colors font-body text-primary dark:text-white group-hover:text-primary-500 dark:group-hover:text-primary-500"
						>
							{DOM.RichText.asText(link_label)}
						</a>
					</li>
				{/each}
				<li>
					<div
						class={`text-3xl text-primary dark:text-white cursor-pointer w-8`}
						on:click={() => {
							toogleTheme();
						}}
					>
						{#if $theme === 'light'}
							<IoMdMoon />
						{:else}
							<IoMdSunny />
						{/if}
					</div>
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
		<div
			class="absolute top-0 right-0 mt-6 mr-4 text-4xl text-white w-8"
			on:click={() => {
				toogleMenuOpen();
			}}
		>
			<IoMdClose />
		</div>
		<ul class="justify-center text-center">
			{#each menus as { link_url, link_label }, i}
				<li>
					<a
						href={linkResolver(link_url)}
						class="block py-4 text-4xl font-medium text-white font-body"
						on:click={() => toogleMenuOpen()}
					>
						{DOM.RichText.asText(link_label)}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</div>
