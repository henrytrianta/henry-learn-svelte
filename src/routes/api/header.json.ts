// TODO: need to create an interface for the instance.

export const get = async (): Promise<unknown> => {
	return {
		body: [
			{
				link: '/',
				title: 'Home'
			},
			{
				link: '/blog',
				title: 'Blog'
			},
			{
				link: '/uses',
				title: 'Uses'
			},
			{
				link: '/work',
				title: 'Work'
			},
			{
				link: '/contact',
				title: 'Contact'
			}
		]
	};
};
