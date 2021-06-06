<script lang="ts">
	export let width = '100%';
	export let height = '86px';
	export let background = '#ccc';
</script>

<div class="skeleton" style="height: {height}; width: {width}; background: {background}" />

<style style type="postcss">
	.skeleton {
		position: relative;
		overflow: hidden;
		/* width: 100%; */
		/* height: 20px; */
		/* background: #ccc; */
	}
	.skeleton::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, #ccc, #dedede, #ccc);
		animation: progress 1s ease-in-out infinite;
	}

	@keyframes progress {
		0% {
			transform: translate3d(-100%, 0, 0);
		}
		100% {
			transform: translate3d(100%, 0, 0);
		}
	}
</style>
