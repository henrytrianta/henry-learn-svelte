import sveltePreprocess from 'svelte-preprocess';

// Prepare adapter
// import node from '@sveltejs/adapter-node';
// import static from '@sveltejs/adapter-static';
import vercel from '@sveltejs/adapter-vercel';

// Add resover to use absolute import
import path from 'path';

// Add static path
// TODO: fix static path
// import route from path.resolve('./utils/routelist.js');

// Add plugin rollup

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: sveltePreprocess({ script: 'typescript', style: 'postcss' }),
	// preprocess: sveltePreprocess(),
	kit: {
		// By default, `npm run build` will create a standard Node app.
		// You can create optimized builds for different platforms by
		// specifying a different adapter

		// Adapter static config
		// adapter: static({
		// 	pages: 'build',
		// 	assets: 'build',
		// 	fallback: null
		// }),

		// Adapter node
		// adapter: node(),

		// Adapter vercel
		adapter: vercel(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#henry-portofolio',

		// prerender: {
		// 	crawl: true,
		// 	enabled: true,
		// 	force: true,
		// 	pages: ['*']
		// },

		vite: {
			// Start adding some resolver so we can use absolute import
			resolve: {
				alias: {
					$components: path.resolve('./src/components'),
					$stores: path.resolve('./src/stores')
				}
			},
			optimizeDeps: {
				// exclude: ['@sveltestack/svelte-query'],
				// include: ['detect-node', 'broadcast-channel']
				// NOTE: Broadcast Channel that is used by Svelte Query need to be forced included.
				include: ['broadcast-channel']
			}
			// build: {
			// 	minify: true,
			// 	rollupOptions: {
			// 		plugins: [analyze(), minifyHtml(true)]
			// 	}
			// },
			// plugins: [minifyHtml(true), analyze()]
			// plugins: [minifyHtml(true)]
		}
	}
};

export default config;
