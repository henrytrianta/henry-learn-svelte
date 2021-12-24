module.exports = {
	mode: 'jit',
	corePlugins: {
		// disable core plugin
		container: false
	},
	content: ['./src/**/*.{html,js,svelte,ts}'],
	// purge: {
	// 	options: {
	// 		defaultExtractor: (content) => [
	// 			// If this stops working, please open an issue at https://github.com/svelte-add/tailwindcss/issues rather than bothering Tailwind Labs about it
	// 			...tailwindExtractor(content),
	// 			// Match Svelte class: directives (https://github.com/tailwindlabs/tailwindcss/discussions/1731)
	// 			...[...content.matchAll(/(?:class:)*([\w\d-/:%.]+)/gm)].map(
	// 				([_match, group, ..._rest]) => group
	// 			)
	// 		],
	// 		keyframes: true
	// 	}
	// },
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#47494A',
					50: '#FFFFFF',
					100: '#FBFBFB',
					200: '#E1E2E2',
					300: '#C7C8C9',
					400: '#ADAEB0',
					500: '#939597', //Default normally, but decided to go to 900
					600: '#797B7E',
					700: '#606264',
					800: '#47494A',
					900: '#2E2F30'
				},
				secondary: {
					DEFAULT: '#F5DF4D',
					50: '#FFFFFF',
					100: '#FFFFFF',
					200: '#FDF9DE',
					300: '#FAF0AE',
					400: '#F8E87D',
					500: '#F5DF4D',
					600: '#F2D61D',
					700: '#D0B70C',
					800: '#A08C09',
					900: '#706206'
				}
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
