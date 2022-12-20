import createClient from '$modules/api/prismic.server';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import type { LinkField, RichTextField } from '@prismicio/types';

interface Navigation {
	link_label: RichTextField;
	link_url: LinkField;
}

export const load: LayoutServerLoad = async ({ fetch, request }) => {
	const client = createClient({ fetch, request });

	const navigation = await client.getSingle('option', {}).catch(() => {
		throw error(404);
	});

	return {
		navigation: navigation.data.navigation as Navigation[]
	};
};
