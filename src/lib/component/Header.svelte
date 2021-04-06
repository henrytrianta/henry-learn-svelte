<script type="ts">
	// get store color
	import { toogleTheme, theme } from '$lib/stores/themeStore';
	// get store menu
	import { menuOpen, toogleMenuOpen } from '$lib/stores/menuStore';
	// props
	export let menus: { link: string; title: string }[];
</script>

<div class="container mx-auto">
	<div class="flex items-center justify-between py-6 lg:py-10">
		<a href="/" class="flex items-center">
			<span href="/" class="mr-2">
				<img src="assets/img/logo.svg" alt="logo" />
			</span>
		</a>
		<div class="flex items-center lg:hidden">
			<i
				class={`bx text-3xl text-primary dark:text-white cursor-pointer mr-8 ${
					$theme === 'light' ? 'bxs-sun' : 'bxs-moon'
				}`}
				on:click={() => {
					toogleTheme();
				}}
			/>

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
				{#each menus as { link, title }, i}
					<li class="relative mb-1 mr-6 group">
						<div
							id={`menu-${i}`}
							class="absolute bottom-0 left-0 z-20 w-full h-0 transition-all opacity-75 group-hover:h-2 group-hover:bg-yellow"
						/>
						<a
							href={link}
							class="relative z-30 block px-2 text-lg font-medium transition-colors font-body text-primary dark:text-white group-hover:text-green dark:group-hover:text-secondary"
							>{title}</a
						>
					</li>
				{/each}
				<li>
					<i
						class={`bx text-3xl text-primary dark:text-white cursor-pointer ${
							$theme === 'light' ? 'bxs-sun' : 'bxs-moon'
						}`}
						on:click={() => {
							toogleTheme();
						}}
					/>
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
	<div class="w-2/3 p-4 ml-auto bg-green md:w-1/3">
		<i
			class="absolute top-0 right-0 mt-4 mr-4 text-4xl text-white bx bx-x"
			on:click={() => {
				toogleMenuOpen();
			}}
		/>
		<ul class="flex flex-col mt-8">
			{#each menus as { link, title }, i}
				<li class="">
					<a href={link} class="block px-2 mb-3 text-lg font-medium text-white font-body">{title}</a
					>
				</li>
			{/each}
		</ul>
	</div>
</div>
