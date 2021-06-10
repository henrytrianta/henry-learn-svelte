import Prismic from '@prismicio/client';
import path from 'path';
import fs from 'fs';
import { cwd } from 'process';
import dotenv from 'dotenv';
// Load env
dotenv.config();

const apiEndpoint = process.env.VITE_PRISMIC_ENDPOINT ? process.env.VITE_PRISMIC_ENDPOINT : '';

const Client = Prismic.client(apiEndpoint);

// Our link resolver that will be used to map the routes 🗺
const linkResolver = (doc) => {
	// Change homepage to /
	if (doc.type === 'page' && doc.uid === 'homepage') {
		return '/';
	}

	// Post type map
	if (doc.type === 'blog') {
		return `/blog/${doc.uid}`;
	}
	if (doc.type === 'page') {
		return `/${doc.uid}`;
	}

	return `/${doc.uid}`;
};

/**
 * This is our build function. It contains the query.
 * It uses the link resolver to build the routes.
 * It then writes it to disk in the same dir.
 */
const build = async () => {
	let query = await Client.query([
		Prismic.Predicates.at('document.type', 'page')
		// Prismic.Predicates.at('document.type', 'blog')
	]);

	/**
	 * Svelte uses the `*` to render the other pages that aren't dynamic
	 */
	let pages = ['*'];

	/**
	 * Convert the docs into the related link for Svelte to render.
	 */
	let result = query.results.map(linkResolver);

	pages.push(...result);

	/**
	 * We create a JSON file that is used to build the site.
	 */
	fs.writeFileSync(path.join(cwd(), './utils/routelist.json'), JSON.stringify(pages));

	console.log('written: ', pages);
};

build();
