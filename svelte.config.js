import sveltePreprocess from 'svelte-preprocess';

// Prepare adapter
// import node from '@sveltejs/adapter-node';
import adapter from '@sveltejs/adapter-static';

// Add resover to use absolute import
import path from 'path';

// Add static path
// TODO: fix static path
// import route from path.resolve('./utils/routelist.js');

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: sveltePreprocess({ script: 'typescript', style: 'postcss' }),
	kit: {
		// By default, `npm run build` will create a standard Node app.
		// You can create optimized builds for different platforms by
		// specifying a different adapter

		// Adapter static
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: null
		}),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#henry-portofolio',

		prerender: {
			crawl: true,
			enabled: true,
			force: true,
			pages: ['*']
		},

		vite: {
			// Start adding some resolver so we can use absolute import
			resolve: {
				alias: {
					$components: path.resolve('./src/components'),
					$stores: path.resolve('./src/stores')
				}
			}
		}
	}
};

export default config;
