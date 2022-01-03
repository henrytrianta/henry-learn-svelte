import * as prismic from '@prismicio/client';

const apiEndpoint = import.meta.env.VITE_PRISMIC_ENDPOINT.toString() || '';
const accessToken = import.meta.env.VITE_PRISMIC_TOKEN.toString() || '';

const prismicClient = prismic.createClient(apiEndpoint, { accessToken });

export default prismicClient;

// Custom Function Prismic
export async function loadNav() {
	return prismicClient.getSingle('option', {}).then((option) => option.data.navigation);
}

export const fetchByDocType = async (type: string) =>
	prismicClient.get({ predicates: prismic.predicates.at(`document.type`, type) });

export const getProjects = async () => await fetchByDocType('project').then((data) => data.results);
