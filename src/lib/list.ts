import { DEFAULT_LANG, isLang, t, type Lang } from './i18n';

export interface ListState {
	title: string;
	items: string[];
	lang: Lang;
}

export function sanitizeLine(value: string): string {
	return value.replace(/[\r\n]+/g, ' ').trim();
}

export function createList(title: string, firstItemName: string, lang: Lang = DEFAULT_LANG): ListState {
	const item = sanitizeLine(firstItemName);
	return {
		title: sanitizeLine(title),
		items: item ? [item] : [],
		lang,
	};
}

export function addItem(state: ListState, name: string): ListState {
	return {
		title: state.title,
		items: [...state.items, sanitizeLine(name)],
		lang: state.lang,
	};
}

export function parseListFromSearch(search: string): ListState | null {
	const params = new URLSearchParams(search);
	const title = sanitizeLine(params.get('t') ?? '');
	if (!title) return null;

	const items = params
		.getAll('i')
		.map(sanitizeLine)
		.filter(Boolean);

	const langParam = params.get('lang');
	const lang = isLang(langParam) ? langParam : DEFAULT_LANG;

	return { title, items, lang };
}

export function buildQueryString(state: ListState): string {
	const params = new URLSearchParams();
	params.set('t', state.title);
	for (const item of state.items) {
		params.append('i', item);
	}
	params.set('lang', state.lang);
	return params.toString();
}

export function buildListLink(base: string, state: ListState): string {
	return `${base}?${buildQueryString(state)}`;
}

export function buildMessageText(state: ListState, listLink: string): string {
	return [
		`*${state.title}*
`,
		...state.items.map((item) => `- ${item}`),
		`
${t(state.lang).messageAddYourself}: ${listLink}`,
	].join('\n');
}

export function buildWhatsAppLinks(message: string): { appUrl: string; webUrl: string } {
	const encoded = encodeURIComponent(message);
	return {
		appUrl: `whatsapp://send?text=${encoded}`,
		webUrl: `https://wa.me/?text=${encoded}`,
	};
}
