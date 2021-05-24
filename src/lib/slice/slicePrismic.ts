// Component
import Hero from '$components/Hero.svelte';
import MyProjects from '$components/MyProjects.svelte';
import MyStories from '$components/MyStories.svelte';
import MyStory from '$components/MyStory.svelte';
import Form from '$components/Form.svelte';

const slicePrismic = [
	{ slice: 'hero', component: Hero },
	{ slice: 'myproject', component: MyProjects },
	{ slice: 'mystories', component: MyStories },
	{ slice: 'mystory', component: MyStory },
	{ slice: 'form', component: Form }
];

export default slicePrismic;
