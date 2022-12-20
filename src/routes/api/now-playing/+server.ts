import { getNowPlaying } from '$modules/api/spotify.server';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	const response = await getNowPlaying();

	if (response.status === 204 || response.status > 400) {
		return json({ isPlaying: false });
	}

	const song = await response.json();

	const isPlaying = song.is_playing;
	const title = song.item.name;
	const artist = song.item.artists.map((_artist: { name: string }) => _artist.name).join(', ');
	const album = song.item.album.name;
	const albumImageUrl = song.item.album.images[2].url;
	const songUrl = song.item.external_urls.spotify;

	return json({
		album,
		albumImageUrl,
		artist,
		isPlaying,
		songUrl,
		title
	});
};
