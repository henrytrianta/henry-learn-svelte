const { tailwindExtractor } = require('tailwindcss/lib/lib/purgeUnusedStyles');

module.exports = {
	corePlugins: {
		// disable core plugin
		container: false
	},
	purge: {
		content: ['./src/**/*.{html,js,svelte,ts}'],
		options: {
			defaultExtractor: (content) => [
				// If this stops working, please open an issue at https://github.com/svelte-add/tailwindcss/issues rather than bothering Tailwind Labs about it
				...tailwindExtractor(content),
				// Match Svelte class: directives (https://github.com/tailwindlabs/tailwindcss/discussions/1731)
				...[...content.matchAll(/(?:class:)*([\w\d-/:%.]+)/gm)].map(
					([_match, group, ..._rest]) => group
				)
			],
			keyframes: true
		}
	},
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				primary: '#042655'
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: [
		({ addComponents, theme }) => {
			addComponents({
				'.container': {
					marginInline: 'auto',
					paddingInline: theme('spacing.4'),
					maxWidth: theme('screens.sm'),

					'@screen sm': {
						maxWidth: theme('screens.sm')
					},
					'@screen md': {
						maxWidth: theme('screens.md')
					},
					'@screen lg': {
						maxWidth: '850px'
					}
				}
			});
		}
	]
};
