<script>
	export let status;
	export let error;
</script>

<div class="container mx-auto">
	<div class="flex flex-col items-center justify-center py-6 lg:py-10">
		<h1 class="text-3xl">{status}</h1>
		<p>{error}</p>
	</div>
</div>
