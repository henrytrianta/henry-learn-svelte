import Prismic from '@prismicio/client';

const apiEndpoint = import.meta.env.VITE_PRISMIC_ENDPOINT.toString();
const accessToken = import.meta.env.VITE_PRISMIC_TOKEN.toString();

const prismicClient = Prismic.client(apiEndpoint, { accessToken });

export default prismicClient;
