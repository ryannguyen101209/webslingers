# Webslingers.inc

Marketing homepage for Webslingers.inc — professional websites for small businesses in Vietnam.
*From idea to live in record time.*

Plain static HTML/CSS, no build step.

- `index.html` — the page
- `styles.css` — styles (mobile first)
- `i18n.js` — English text and the VI/EN switch (Vietnamese is the default, written in `index.html`)
- `app.js` — interactive features (see below)
- `img/` — logo (`logo-mark.svg` icon, `logo-wordmark*.webp`), favicons, share image (`og.jpg`) and project screenshots
- `webslingers-brief.md` — design brief and outstanding placeholders

## Languages

Vietnamese is the default. The EN/VI button in the nav switches language and remembers the choice.
Link straight to English with `?lang=en`. To change copy, edit the Vietnamese in `index.html`
and the English in `i18n.js` (same `data-i18n` key).

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
