<script lang="ts">
	import { useQuery } from '@sveltestack/svelte-query';

	const queryResult = useQuery('spotify', async () => {
		return fetch('http://localhost:3000/api/now-playing').then((res) => res.json());
	});
</script>

{#if $queryResult.isSuccess && $queryResult.data && $queryResult.data.isPlaying}
	<a
		class="text-gray-800 dark:text-gray-200 font-medium max-w-max truncate"
		href={$queryResult.data.songUrl}
		target="_blank"
		rel="noopener noreferrer"
	>
		{$queryResult.data.title}
	</a>

	<span class="mx-2 text-gray-500 dark:text-gray-300 hidden sm:block">
		{' – '}
	</span>

	<p class="text-gray-500 dark:text-gray-300 max-w-max truncate">{$queryResult.data.artist}</p>
{:else}
	<p class="text-gray-800 dark:text-gray-200 font-medium">Not Playing</p>

	<span class="mx-2 text-gray-500 dark:text-gray-300 hidden sm:block">
		{' – '}
	</span>

	<p class="text-gray-500 dark:text-gray-300 max-w-max truncate">Spotify</p>
{/if}
