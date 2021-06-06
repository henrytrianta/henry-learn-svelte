import { getNowPlaying } from '$lib/spotify';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get() {
	// the `slug` parameter is available because this file
	// is called [slug].json.js
	const response = await getNowPlaying();

	if (response.status === 204 || response.status > 400) {
		return { body: { isPlaying: false } };
	}

	const song = await response.json();
	const isPlaying = song.is_playing;
	const title = song.item.name;
	const artist = song.item.artists.map((_artist) => _artist.name).join(', ');
	const album = song.item.album.name;
	const albumImageUrl = song.item.album.images[2].url;
	const songUrl = song.item.external_urls.spotify;

	return {
		body: {
			album,
			albumImageUrl,
			artist,
			isPlaying,
			songUrl,
			title
		}
	};
}
