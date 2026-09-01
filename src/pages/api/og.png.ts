import type { APIRoute } from 'astro';
import { renderOgImage } from '../../lib/og';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
	const png = await renderOgImage(url.searchParams.get('title'));

	return new Response(png, {
		headers: {
			'Content-Type': 'image/png',
			'Cache-Control': 'public, max-age=31536000, immutable',
		},
	});
};
