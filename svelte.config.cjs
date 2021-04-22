const sveltePreprocess = require('svelte-preprocess');
// const node = require('@sveltejs/adapter-node');
const static = require('@sveltejs/adapter-static');
const pkg = require('./package.json');
// Add resover to use absolute import
const path = require('path');
// Add static path
const staticPath = require('./utils/routelist.json');

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: sveltePreprocess(),
	kit: {
		// By default, `npm run build` will create a standard Node app.
		// You can create optimized builds for different platforms by
		// specifying a different adapter
		adapter: static({ output: './build' }),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#henry-portofolio',

		prerender: {
			crawl: true,
			enabled: true,
			force: true,
			pages: [...staticPath]
		},

		vite: {
			ssr: {
				noExternal: Object.keys(pkg.dependencies || {})
			},
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
