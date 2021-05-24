<script context="module">
	export function load({ error, status }) {
		return {
			props: {
				error: status,
				message: error.message
			}
		};
	}

</script>

<script>
	export let error;
	export let message;

</script>

<div class="container mx-auto">
	<div class="flex flex-col items-center justify-center py-6 lg:py-10 dark:text-white">
		<h1 class="text-3xl">{error}</h1>
		<p>{message}</p>
	</div>
</div>
