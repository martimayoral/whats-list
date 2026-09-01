// UI + share-message strings per language. Pure data — no DOM access — so it can be
// imported from both build-time Astro frontmatter and client-side <script> tags.

export type Lang = 'en' | 'es' | 'ca' | 'fr' | 'pt' | 'de';

export const DEFAULT_LANG: Lang = 'en';

// Catalonia has no ISO country code, so its flag uses the Unicode subdivision tag
// sequence (ES-CT) rather than a regional indicator pair — falls back to a plain
// black flag on platforms that don't render it, same as the England/Scotland/Wales flags.
const CATALONIA_FLAG = '\u{1F3F4}\u{E0065}\u{E0073}\u{E0063}\u{E0074}\u{E007F}';

export const LANGUAGES: { code: Lang; label: string; flag: string }[] = [
	{ code: 'en', label: 'English', flag: '🇬🇧' },
	{ code: 'es', label: 'Español', flag: '🇪🇸' },
	{ code: 'ca', label: 'Català', flag: CATALONIA_FLAG },
	{ code: 'fr', label: 'Français', flag: '🇫🇷' },
	{ code: 'pt', label: 'Português', flag: '🇵🇹' },
	{ code: 'de', label: 'Deutsch', flag: '🇩🇪' },
];

export function isLang(value: string | null | undefined): value is Lang {
	return LANGUAGES.some((entry) => entry.code === value);
}

export interface Strings {
	badge: string;
	heading: string;
	subtitle: string;
	titleLabel: string;
	titlePlaceholder: string;
	nameLabel: string;
	namePlaceholder: string;
	languageLabel: string;
	createButton: string;
	createError: string;
	joinBadge: string;
	joinInvalid: string;
	joinButton: string;
	joinNameError: string;
	fallbackPrompt: string;
	fallbackLink: string;
	messageAddYourself: string;
	joinPageTitleDefault: string;
	joinDescriptionDefault: string;
	joinDescription: (title: string) => string;
}

export const STRINGS: Record<Lang, Strings> = {
	en: {
		badge: 'new list',
		heading: 'Start a list',
		subtitle: 'Create it, then send the link straight to WhatsApp.',
		titleLabel: 'List title',
		titlePlaceholder: 'Beach trip snacks',
		nameLabel: 'Your name',
		namePlaceholder: 'Sam',
		languageLabel: 'Language',
		createButton: 'Create list',
		createError: 'Please enter a list title and your name.',
		joinBadge: 'shared list',
		joinInvalid: 'This list link looks invalid or incomplete.',
		joinButton: 'Add yourself & send',
		joinNameError: 'Please enter your name.',
		fallbackPrompt: "Didn't open WhatsApp?",
		fallbackLink: 'tap here',
		messageAddYourself: 'add yourself',
		joinPageTitleDefault: 'Add yourself',
		joinDescriptionDefault: 'Add your name to a shared list and send it straight to WhatsApp.',
		joinDescription: (title) => `Join "${title}" and send your name straight to WhatsApp.`,
	},
	es: {
		badge: 'lista nueva',
		heading: 'Crea una lista',
		subtitle: 'Créala y envía el enlace directo a WhatsApp.',
		titleLabel: 'Título de la lista',
		titlePlaceholder: 'Snacks para la playa',
		nameLabel: 'Tu nombre',
		namePlaceholder: 'Sam',
		languageLabel: 'Idioma',
		createButton: 'Crear lista',
		createError: 'Introduce un título y tu nombre.',
		joinBadge: 'lista compartida',
		joinInvalid: 'Este enlace parece inválido o incompleto.',
		joinButton: 'Añadirme y enviar',
		joinNameError: 'Introduce tu nombre.',
		fallbackPrompt: '¿No se abrió WhatsApp?',
		fallbackLink: 'toca aquí',
		messageAddYourself: 'añádete',
		joinPageTitleDefault: 'Añádete',
		joinDescriptionDefault: 'Añade tu nombre a una lista compartida y envíala por WhatsApp.',
		joinDescription: (title) => `Únete a "${title}" y envía tu nombre por WhatsApp.`,
	},
	ca: {
		badge: 'llista nova',
		heading: 'Crea una llista',
		subtitle: "Crea-la i envia l'enllaç directament a WhatsApp.",
		titleLabel: 'Títol de la llista',
		titlePlaceholder: 'Aperitius per a la platja',
		nameLabel: 'El teu nom',
		namePlaceholder: 'Sam',
		languageLabel: 'Idioma',
		createButton: 'Crear llista',
		createError: 'Introdueix un títol i el teu nom.',
		joinBadge: 'llista compartida',
		joinInvalid: 'Aquest enllaç de llista sembla no vàlid o incomplet.',
		joinButton: 'Afegir-me i enviar',
		joinNameError: 'Introdueix el teu nom.',
		fallbackPrompt: "No s'ha obert WhatsApp?",
		fallbackLink: 'toca aquí',
		messageAddYourself: 'afegeix-te',
		joinPageTitleDefault: 'Afegeix-te',
		joinDescriptionDefault: 'Afegeix el teu nom a una llista compartida i envia-la per WhatsApp.',
		joinDescription: (title) => `Uneix-te a "${title}" i envia el teu nom per WhatsApp.`,
	},
	fr: {
		badge: 'nouvelle liste',
		heading: 'Créer une liste',
		subtitle: 'Créez-la, puis envoyez le lien directement sur WhatsApp.',
		titleLabel: 'Titre de la liste',
		titlePlaceholder: 'Snacks pour la plage',
		nameLabel: 'Votre nom',
		namePlaceholder: 'Sam',
		languageLabel: 'Langue',
		createButton: 'Créer la liste',
		createError: 'Veuillez saisir un titre et votre nom.',
		joinBadge: 'liste partagée',
		joinInvalid: 'Ce lien de liste semble invalide ou incomplet.',
		joinButton: "S'ajouter et envoyer",
		joinNameError: 'Veuillez saisir votre nom.',
		fallbackPrompt: "WhatsApp ne s'est pas ouvert ?",
		fallbackLink: 'appuyez ici',
		messageAddYourself: 'rejoindre',
		joinPageTitleDefault: 'Rejoindre',
		joinDescriptionDefault: 'Ajoutez votre nom à une liste partagée et envoyez-la sur WhatsApp.',
		joinDescription: (title) => `Rejoignez "${title}" et envoyez votre nom sur WhatsApp.`,
	},
	pt: {
		badge: 'nova lista',
		heading: 'Crie uma lista',
		subtitle: 'Crie e envie o link direto no WhatsApp.',
		titleLabel: 'Título da lista',
		titlePlaceholder: 'Petiscos para a praia',
		nameLabel: 'Seu nome',
		namePlaceholder: 'Sam',
		languageLabel: 'Idioma',
		createButton: 'Criar lista',
		createError: 'Informe um título e o seu nome.',
		joinBadge: 'lista compartilhada',
		joinInvalid: 'Este link de lista parece inválido ou incompleto.',
		joinButton: 'Adicionar-me e enviar',
		joinNameError: 'Informe o seu nome.',
		fallbackPrompt: 'O WhatsApp não abriu?',
		fallbackLink: 'toque aqui',
		messageAddYourself: 'adicione-se',
		joinPageTitleDefault: 'Adicione-se',
		joinDescriptionDefault: 'Adicione o seu nome a uma lista compartilhada e envie pelo WhatsApp.',
		joinDescription: (title) => `Entre em "${title}" e envie o seu nome pelo WhatsApp.`,
	},
	de: {
		badge: 'neue Liste',
		heading: 'Liste erstellen',
		subtitle: 'Erstelle sie und sende den Link direkt an WhatsApp.',
		titleLabel: 'Listentitel',
		titlePlaceholder: 'Snacks für den Strand',
		nameLabel: 'Dein Name',
		namePlaceholder: 'Sam',
		languageLabel: 'Sprache',
		createButton: 'Liste erstellen',
		createError: 'Bitte gib einen Titel und deinen Namen ein.',
		joinBadge: 'geteilte Liste',
		joinInvalid: 'Dieser Listenlink scheint ungültig oder unvollständig zu sein.',
		joinButton: 'Eintragen & senden',
		joinNameError: 'Bitte gib deinen Namen ein.',
		fallbackPrompt: 'WhatsApp hat sich nicht geöffnet?',
		fallbackLink: 'hier tippen',
		messageAddYourself: 'eintragen',
		joinPageTitleDefault: 'Eintragen',
		joinDescriptionDefault: 'Trage deinen Namen in eine geteilte Liste ein und sende sie per WhatsApp.',
		joinDescription: (title) => `Tritt "${title}" bei und sende deinen Namen per WhatsApp.`,
	},
};

export function t(lang: string | null | undefined): Strings {
	return STRINGS[isLang(lang) ? lang : DEFAULT_LANG];
}
