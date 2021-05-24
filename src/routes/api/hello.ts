/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get() {
	// the `slug` parameter is available because this file
	// is called [slug].json.js

	return {
		body: {
			hello: `And it's you again
			Hello, hello, hello
			17 again
			Hello, hello, hello
			I said every time we talking
			And every time we meet
			The fire in me
			Still burning
			Burning, burning, burning
			So little
			So warm
			So calm
			So you should stay
			Oh, yes
			Oh, you should…
			`
		}
	};
}
