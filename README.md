# Webslingers.inc

Marketing homepage for Webslingers.inc — professional websites for small businesses in Vietnam.
*From idea to live in record time.*

Plain static HTML/CSS, no build step.

- `index.html` — the page
- `styles.css` — styles (mobile first)
- `i18n.js` — English text and the VI/EN switch (Vietnamese is the default, written in `index.html`)
- `app.js` — interactive features (see below)
- `projects.js` — the "Proof it's real" project cards (see below)
- `img/` — logo (`logo-mark.svg` icon, `logo-wordmark*.webp`), favicons, share image (`og.jpg`) and project screenshots
- `privacy.html`, `terms.html` — privacy policy and terms of use (VI + EN, linked from the footer). Terms still has [BRACKET] business decisions to fill in
- `webslingers-brief.md` — design brief and outstanding placeholders

## Languages

Vietnamese is the default. The EN/VI button in the nav switches language and remembers the choice.
Link straight to English with `?lang=en`. To change copy, edit the Vietnamese in `index.html`
and the English in `i18n.js` (same `data-i18n` key).

## Adding a project (`projects.js`)

The 3 cards in "Proof it's real" are read from the `PROJECTS` array in `projects.js`, so
adding one is a data edit, not an HTML edit: copy an existing entry, fill in the name, URL,
screenshot path and the Vietnamese/English type + city, and add the screenshot to `img/`
(800×500, `.webp`). `index.html` also carries the current 3 cards as plain HTML, so the page
still shows real content to visitors and search engines with JavaScript off; `app.js` replaces
it with the live data once it runs, so keep the two roughly in sync when you add a project.

## Getting leads into a real list, not just Instagram DMs

By default the quote calculator's only "send" options are copying a message into Instagram or
opening an email. To also collect quote requests as a proper list you can check:

1. Go to [formspree.io](https://formspree.io) and make a free account (50 submissions/month free).
2. Create a form and copy its ID from the dashboard (looks like `mzzarrqp`).
3. Open `app.js` and set `const FORMSPREE_ID = 'your-id-here';` near the top.
4. Push the change. A "Send quote request" button appears automatically; nothing else changes.

Leave `FORMSPREE_ID` blank to keep things exactly as they are now.

## Interactive features (`app.js`)

- **Try your website**: type a business name, pick a type and colour, and a phone mockup updates live.
- **Quote calculator**: pick 1–20 pages, see the price (200,000 ₫ + 100,000 ₫ per extra page) and an
  estimated go-live window (today + 7 to 14 days). "Copy message & open Instagram" copies a ready-made
  DM; "Send by email" opens a pre-filled email. Prices live in `BASE` / `PER_PAGE` at the top of `app.js`.
- **Web-sling**: tapping empty space in the hero shoots a web line from the top-right corner.
- **Slap-in cards**: cards land with a small bounce as you scroll to them.

All motion is switched off for visitors with "reduce motion" turned on. Without JavaScript the
builder and calculator are hidden and the rest of the page works as normal.

## Run locally

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deploy

Import this repo on Vercel (framework preset: Other, no build command). Every push to `main` redeploys.
