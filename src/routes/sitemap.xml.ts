import prismicClient from '$lib/prismic/prismicClient';
import linkResolver from '$lib/prismic/resolver';
import * as prismic from '@prismicio/client';

/**
 * This is our build function. It contains the query.
 * It uses the link resolver to build the routes.
 */
const build = async () => {
	const query = await prismicClient.get({
		predicates: prismic.predicates.at('document.type', 'page')
		// Prismic.Predicates.at('document.type', 'blog')
	});

	/**
	 * Svelte uses the `*` to render the other pages that aren't dynamic
	 */
	const pages = [];

	/**
	 * Convert the docs into the related link for Svelte to render.
	 */
	const result = query.results.map((e: any) => ({
		url: linkResolver(e),
		date: e.last_publication_date
	}));

	pages.push(...result);

	return pages;
};

const render = (links) => `<?xml version="1.0" encoding="UTF-8" ?>
  <urlset
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
    xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
    xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
    xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
    xmlns:pagemap="http://www.google.com/schemas/sitemap-pagemap/1.0"
    xmlns:xhtml="http://www.w3.org/1999/xhtml"
  >
    ${links
			.map(
				(link) => `<url>
  <loc>https://www.henry.pm${link.url}</loc>
  <lastmod>${new Date(link.date).toISOString()}</lastmod>
  <changefreq>daily</changefreq>
  </url>`
			)
			.join('')}
  </urlset>
  `;

export async function get() {
	// RouteList
	const data = await build();
	const body = render(data);

	// const debug = true;
	// if (debug) return { body: '' };

	const headers = {
		'Cache-Control': `max-age=0, s-max-age=${600}`,
		'Content-Type': 'application/xml'
	};
	return {
		body,
		headers
	};
}
