// Remembers the last name someone typed so they don't have to retype it on every
// list. Browser-only (localStorage + DOM) — kept out of `list.ts`, which stays pure.

const STORAGE_KEY = 'whats-list:name';

export function loadStoredName(): string {
	try {
		return localStorage.getItem(STORAGE_KEY) ?? '';
	} catch {
		return '';
	}
}

export function saveStoredName(name: string): void {
	try {
		localStorage.setItem(STORAGE_KEY, name);
	} catch {
		// private mode / storage disabled — remembering the name is a nicety, not a feature
	}
}

/**
 * Prefills the input with the remembered name. While the value is still that
 * remembered one, focusing or clicking selects it all, so a different name can be
 * typed straight over it. Once it's been edited, clicks behave normally again.
 */
export function prefillNameInput(input: HTMLInputElement): void {
	const stored = loadStoredName();
	if (!stored) return;

	input.value = stored;

	let untouched = true;
	const selectAll = () => {
		if (untouched) input.select();
	};

	// rAF: iOS Safari drops a `select()` made from inside the focus handler.
	input.addEventListener('focus', () => requestAnimationFrame(selectAll));
	input.addEventListener('click', selectAll);
	input.addEventListener('input', () => {
		untouched = false;
	});
}
