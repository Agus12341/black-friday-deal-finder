# TagDrop - Black Friday Deal Finder

[![make.fun bounty](https://make.fun/badge/black-friday-deal-finder-01.svg)](https://make.fun/c/black-friday-deal-finder-01)
[![rank](https://make.fun/badge/black-friday-deal-finder-01/Agus12341/black-friday-deal-finder/rank.svg)](https://make.fun/c/black-friday-deal-finder-01)
[![reward](https://make.fun/badge/black-friday-deal-finder-01/Agus12341/black-friday-deal-finder/reward.svg)](https://make.fun/c/black-friday-deal-finder-01)

A static deal finder for Black Friday and Cyber Monday 2026. Every deal on
the site was found and price-checked by hand on Friday 27 November 2026:
each card names the product, the store, the sale price, the usual price, the
discount, the time the price was checked, the source it was read at, and an
honest signal - New low, Strong price or Routine sale - with the evidence
behind it.

Shoppers can search by text and filter by category, store and minimum
discount, sort by discount, saving or price, and jump straight to the
product page at the store from each card. The site is plain static files
under `app/` (no build step, no network requests) and works on desktop and
phone widths.

## Layout

- `app/index.html` - the page: header summary, search and filter toolbar, deal grid
- `app/style.css` - the dark Black Friday theme and responsive layout
- `app/data/deals.js` - the checked deals as a JS module
- `app/src/search.js` - text search over the deals
- `app/src/filters.js` - category, store, discount and signal filters, plus sorting
- `app/src/render.js` - the summary strip and deal cards
- `app/src/main.js` - wires the controls to the modules
- `main.ts` - the hand-in program: copies `app/` and `screenshots/` to the
  output directory and writes `dossier.json` with the vendored library
- `serve.ts` - a small local server for previewing the site

## Run it locally

```
node serve.ts          # then open http://localhost:8080
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts   # build the hand-in
```

Built for the make.fun bounty
[Build the best real Black Friday deal finder](https://make.fun/c/black-friday-deal-finder-01).
