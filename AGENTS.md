## Project overview

`whats-list` lets someone spin up a shareable list (e.g. for an event) entirely through WhatsApp, with **no backend or database**. It's a static Astro site — all state lives in the URL and in WhatsApp message text, never on a server.

**The core trick — state lives in the message, not a server:**
- A list's state (title + items) is fully encoded in query params on the `/l` link: `?t=<title>&i=<item>&i=<item>...` (repeated `i` params, one per item).
- Adding your name to a list means: read the current state from the URL, append your name, build a *new* WhatsApp message containing the updated list and a fresh `/l` link with updated query params, then hand off to WhatsApp so the user sends it.
- The most recent message in a WhatsApp thread is the list's current state. There is nothing to persist server-side, and nothing to query — every page load is stateless and self-contained from its own URL.

**Flow:**
1. `/` (`src/pages/index.astro`) — create a list: enter a title + your own name, get a pre-filled WhatsApp message with the initial list and an `/l` add-yourself link.
2. `/l` (`src/pages/l.astro`) — join a list: parses `t`/`i` query params, shows the current title/items, takes a name, and on submit builds an updated message + link and hands off to WhatsApp again.

**Key files:**
- `src/lib/list.ts` — all list/query/message logic (`ListState`, parsing, building query strings, building the WhatsApp message text, building `whatsapp://` + `wa.me` links). Pure, no DOM access — reused by both pages. Change list behavior here, not by duplicating logic in the pages.
- `src/pages/index.astro`, `src/pages/l.astro` — the two pages, each with a client `<script>` that imports `list.ts`.
- `src/layouts/Layout.astro` — shared page shell (fonts, `<head>`, wrapper div) used by both pages.
- `src/styles/global.css` — Tailwind v4 entrypoint (`@import "tailwindcss"`) plus the shared theme tokens/background.

**Important constraint:** this is a static build (`astro build`, no SSR adapter). Astro frontmatter runs at build time and has no access to real query params, so all `t`/`i` parsing happens client-side via `window.location.search` inside `<script>` tags in `l.astro` — never assume `Astro.url.searchParams` is populated.

**Explicitly out of scope** (don't add unless asked): persistence/database, auth, duplicate-name handling, list editing/removal — the whole point is that the WhatsApp thread itself is the list.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
