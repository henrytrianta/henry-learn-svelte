import Pageclip from 'pageclip';
const pageclipAPIKey = import.meta.env.VITE_PRIVATE_PAGECLIP;
const pageclip = new Pageclip(pageclipAPIKey);

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export const post = async (req): Promise<any> => {
	// the `slug` parameter is available because this file
	// is called [slug].json.js

	// const debug = true;
	// if (debug) {
	// 	console.log(req);
	// }

	const data = JSON.parse(req.body);
	const secret = import.meta.env.VITE_PRIVATE_GOOGLE_CAPTCHA_SECRET.toString();
	const resCaptcha = await fetch(
		'https://www.google.com/recaptcha/api/siteverify?' +
			new URLSearchParams({
				secret: secret,
				response: data['g-recaptcha-response']
			})
	)
		.then((response) => response.json())
		.then((json) => json);

	// const debug = true;
	// if (debug) {
	// 	console.log(res);
	// }

	if (resCaptcha.success) {
		// put after captcha here
		let resEnd;
		pageclip
			.send('ContactForm', {
				name: data.name,
				email: data.email,
				message: data.message
			})
			.then((response) => {
				console.log(response.status, response.data); // => 200, [Item, Item]
			})
			.then(() => {
				return pageclip.fetch();
			})
			.then((response) => {
				console.log(response.status, response.data); // => 200, [Item, Item]
			});
	}

	return {
		body: {
			resCaptcha
		}
	};
};
