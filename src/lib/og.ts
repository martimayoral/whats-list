import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const spaceGrotesk = readFileSync(fileURLToPath(new URL('./fonts/SpaceGrotesk-Bold.ttf', import.meta.url)));
const jetBrainsMono = readFileSync(fileURLToPath(new URL('./fonts/JetBrainsMono-Bold.ttf', import.meta.url)));

const WIDTH = 1200;
const HEIGHT = 630;

function truncate(value: string, max: number): string {
	return value.length > max ? `${value.slice(0, max - 1).trimEnd()}…` : value;
}

export async function renderOgImage(rawTitle: string | null): Promise<Buffer> {
	const title = rawTitle?.trim();
	const displayTitle = truncate(title || 'whats·list', 64);
	const tag = title ? 'shared list' : 'no app · no backend';
	const footer = title ? 'Sent via WhatsApp' : 'Create a list, share it as a link in WhatsApp';

	const markup = {
		type: 'div',
		props: {
			style: {
				width: WIDTH,
				height: HEIGHT,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: '#f7f1e3',
				fontFamily: 'JetBrains Mono',
			},
			children: {
				type: 'div',
				props: {
					style: {
						display: 'flex',
						flexDirection: 'column',
						width: 1000,
						backgroundColor: '#ffffff',
						border: '5px solid #111111',
						borderRadius: 28,
						boxShadow: '14px 14px 0 0 #111111',
						padding: '56px 68px',
					},
					children: [
						{
							type: 'div',
							props: {
								style: { display: 'flex', alignItems: 'center', gap: 10 },
								children: [
									{
										type: 'div',
										props: {
											style: {
												display: 'flex',
												width: 30,
												height: 30,
												borderRadius: 8,
												border: '3px solid #111111',
												backgroundColor: '#1FAE52',
											},
										},
									},
									{
										type: 'div',
										props: {
											style: { display: 'flex', fontSize: 22, fontWeight: 700, color: '#111111b3' },
											children: 'whats·list',
										},
									},
								],
							},
						},
						{
							type: 'div',
							props: {
								style: {
									display: 'flex',
									marginTop: 30,
									backgroundColor: '#111111',
									color: '#ffffff',
									fontSize: 18,
									fontWeight: 700,
									letterSpacing: 2,
									textTransform: 'uppercase',
									padding: '7px 16px',
									borderRadius: 6,
								},
								children: tag,
							},
						},
						{
							type: 'div',
							props: {
								style: {
									display: 'flex',
									marginTop: 24,
									fontFamily: 'Space Grotesk',
									fontSize: displayTitle.length > 26 ? 58 : 76,
									fontWeight: 700,
									color: '#111111',
									lineHeight: 1.15,
								},
								children: displayTitle,
							},
						},
						{
							type: 'div',
							props: {
								style: {
									display: 'flex',
									marginTop: 'auto',
									paddingTop: 36,
									fontSize: 19,
									color: '#11111199',
								},
								children: footer,
							},
						},
					],
				},
			},
		},
	};

	const svg = await satori(markup as unknown as Parameters<typeof satori>[0], {
		width: WIDTH,
		height: HEIGHT,
		fonts: [
			{ name: 'Space Grotesk', data: spaceGrotesk, weight: 700, style: 'normal' },
			{ name: 'JetBrains Mono', data: jetBrainsMono, weight: 700, style: 'normal' },
		],
	});

	const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: WIDTH } });
	return Buffer.from(resvg.render().asPng());
}
