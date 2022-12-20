<script lang="ts">
	import { onMount } from 'svelte';
	import { initContainer } from 'typebot-js';

	onMount(() => {
		initContainer('typebot-container', {
			url: 'https://bot.henrytrianta.com/contact'
		});
	});
</script>

<div id="typebot-container" />

<style>
	#typebot-container {
		width: 100%;
		height: 600px;
	}
</style>
