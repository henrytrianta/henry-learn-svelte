import Prismic from '@prismicio/client';

const apiEndpoint = import.meta.env.VITE_PRISMIC_ENDPOINT.toString() || '';
const accessToken = import.meta.env.VITE_PRISMIC_TOKEN.toString() || '';

const prismicClient = Prismic.client(apiEndpoint, { accessToken });
export default prismicClient;

// Custom Function Prismic
export async function loadNav(): Promise<Record<string, unknown>> {
	return prismicClient.getSingle('option', {}).then((option) => option.data.navigation);
}

export const fetchByDocType = async (
	type: string,
	options = {},
  ): Promise<any> =>
	prismicClient.query(Prismic.Predicates.at(`document.type`, type), options);
  
export async function getProjects(): Promise<Record<string, unknown>> {
	return await fetchByDocType('project', {}).then((data) => data.results);
}
