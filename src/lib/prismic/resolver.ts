import type { PrismicLink } from '@stnew/prismic-types';

const linkResolver = (doc: PrismicLink): string => {
	// if another type than Document
	if (doc.link_type === 'Media' || doc.link_type === 'Web' || doc.link_type === 'Any')
		return doc.url;

	// Check if empty return null
	if (!doc.type) return '/';
	// Pretty URLs for known types
	if (doc.type === 'blog') return '/blog/' + doc.uid;
	if (doc.type === 'page') return '/' + doc.uid;

	// Fallback for other types, in case new custom types get created
	return '/doc/' + doc.id;
};

export default linkResolver;
