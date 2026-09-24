# Webslingers.inc

Marketing homepage for Webslingers.inc — professional websites for small businesses in Vietnam.
*From idea to live in record time.*

Plain static HTML/CSS, no build step.

- `index.html` — the page
- `styles.css` — styles (mobile first)
- `i18n.js` — English text and the VI/EN switch (Vietnamese is the default, written in `index.html`)
- `img/` — project screenshots
- `webslingers-brief.md` — design brief and outstanding placeholders

## Languages

Vietnamese is the default. The EN/VI button in the nav switches language and remembers the choice.
Link straight to English with `?lang=en`. To change copy, edit the Vietnamese in `index.html`
and the English in `i18n.js` (same `data-i18n` key).

## Run locally

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deploy

Import this repo on Vercel (framework preset: Other, no build command). Every push to `main` redeploys.
