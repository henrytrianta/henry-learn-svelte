<script>
	import { onMount } from 'svelte';

	/** @type {string} gtmId - GTM ID 'GTM-F00BARS'. */
	export let gtmId = '';
	/**
	 * @type {(Object[]|Object|string)} [gtmDataPoints=[]] - Array or single object of custom data points for dataLayer. */
	export let gtmDataPoints = [];
	/** @type {number} [timeout] - The number of milliseconds to timeout intiating loading the GTM script from Google */
	export let timeout = 0;
	/** @type {boolean} [dev=false] - Set to true to give errors */
	export let dev = false;

	let scriptSrc;

	/** getFunctionScriptElementFromInitGtm - Sets global dataLayer on Window Object.
	 * @param {(Object[]|Object)} [customDataPoints=[]] - Array or single object of custom data points for dataLayer.
	 * @param {Object} [customDataPoints[]] - Custom data point Object.
	 * @param {string} [customDataPoints[]] - Custom data point property.
	 * @param {Object} [globalObject=window] E.g. a reference to the Window Object (window).
	 * @returns {getScriptSrcForGtm} - function. */
	function getScriptSrcFromInitGtm(customDataPoints = [], globalObject = window) {
		const requiredDataPoint = {
			'gtm.start': new Date().getTime(),
			event: 'gtm.js'
		};

		/** getScriptSrcForGtm - Returns script src.
		 *  @param {string} gtmId - GTM ID 'GTM-F00BARS'.
		 *  @returns {string} - Src for script element. */
		function getScriptSrcForGtm(gtmId) {
			if (!dev && (typeof gtmId !== 'string' || !gtmId.length)) {
				return;
			} else if (typeof gtmId !== 'string' || !gtmId.length) {
				console.error('Google Tag Manager.', 'Missing/wrong `gtmId`.');
			} else {
				return `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
			}
		}

		try {
			const dataLayer = [requiredDataPoint].concat(customDataPoints);
			/* Get/set global dataLayer on global Object (e.g., `window`).
			 * Custom data points should be set before GTM script loads. */
			globalObject['dataLayer'] = globalObject['dataLayer']
				? [...globalObject['dataLayer'], ...dataLayer]
				: dataLayer;
		} catch (error) {
			if (!dev) console.error('Google Tag Manager.', error);
		} finally {
			return getScriptSrcForGtm; // …no matter what, for no error.
		}
	}

	onMount(() => {
		if (!timeout) scriptSrc = getScriptSrcFromInitGtm(gtmDataPoints)(gtmId);
		else
			setTimeout(() => {
				scriptSrc = getScriptSrcFromInitGtm(gtmDataPoints)(gtmId);
			}, timeout);
	});

</script>

<svelte:head>
	{#if scriptSrc}
		<script src={scriptSrc} defer></script>
	{/if}
</svelte:head>
