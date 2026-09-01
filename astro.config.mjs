// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

// Vercel injects VERCEL_URL at build time (the deployment's own domain, prod or preview) —
// used so the static home page's og:image tag has a real absolute URL without manual config.
const site = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined;

// https://astro.build/config
export default defineConfig({
	site,
	adapter: vercel(),
	vite: {
		plugins: [tailwindcss()],
	},
});