import Pageclip from 'pageclip';
const pageclipAPIKey = import.meta.env.VITE_PRIVATE_PAGECLIP;
const pageclip = new Pageclip(pageclipAPIKey);

// Verify hCaptcha
import https from 'https';
import querystring from 'querystring';
const host = 'hcaptcha.com';
const path = '/siteverify';
const verify = (secret, token) => {
	return new Promise(function verifyPromise(resolve, reject) {
		// stringify the payload
		const data = querystring.stringify({ secret, response: token });

		// set up options for the request
		// note that we're using form data here instead of sending JSON
		const options = {
			host,
			path,
			method: 'POST',
			headers: {
				'content-type': 'application/x-www-form-urlencoded',
				'content-length': Buffer.byteLength(data)
			}
		};

		// make the request, add response chunks to buffer, and finally resolve
		// with the response. if any errors arise call the promise's reject
		// function with the error.
		const request = https.request(options, (response) => {
			response.setEncoding('utf8');

			let buffer = '';

			response
				.on('error', reject)
				.on('data', (chunk) => (buffer += chunk))
				.on('end', () => resolve(JSON.parse(buffer)));
		});

		request.on('error', reject);
		request.write(data);
		request.end();
	});
};

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export const post = async (req): Promise<any> => {
	// the `slug` parameter is available because this file
	// is called [slug].json.js

	const data = JSON.parse(req.body);
	const secret = import.meta.env.VITE_PRIVATE_HCAPTCHA_SECRETKEY.toString();
	const token = data['h-captcha-response'];

	const hCaptchaVerify: any = await verify(secret, token)
		.then((data) => data)
		.catch(() => ({ success: false, error: console.error }));

	// const debug = true;
	// if (debug) {
	// 	return {
	// 		body: {
	// 			hCaptchaVerify
	// 		}
	// 	};
	// }

	if (hCaptchaVerify && hCaptchaVerify.success) {
		// put after captcha here
		const pageclipSend = await pageclip
			.send('ContactForm', {
				name: data.name,
				email: data.email,
				message: data.message
			})
			.then((response) => response);

		return {
			body: pageclipSend
		};
	}

	return {
		body: {
			status: 500
		}
	};
};
