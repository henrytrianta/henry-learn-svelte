import createClient from '$modules/api/prismic.server';
import { pageQuery } from '$modules/api/queries.server';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params, request }) => {
	const catchall = params.catchall.split('/');

	if (catchall.length < 1) throw error(404);

	// force to use index 0 to only accept one level
	const slug = catchall[0] !== '' ? catchall[0] : 'homepage';
	const client = createClient({ fetch, request });

	const document = await client.getByUID('page', slug, { graphQuery: pageQuery }).catch(() => {
		throw error(404);
	});

	console.log(document);

	return {
		page: document,
		seo: {
			title: document.data.meta_title || '',
			description: document.data.meta_description || ''
		}
	};
};
