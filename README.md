# kafeteer.github.io

Landing page and privacy policies for the iOS apps of
[Oscar De Moya](https://apps.apple.com/developer/oscar-de-moya/id1236595635).

Static, no build step. Palette and typography derived from the
[Billpad](https://billpad.framer.website) site: Inter / Inter Tight, cream `#FFFEFA`,
ink `#302D3E`, accent `#0099FF`. Auto light/dark via `prefers-color-scheme`.

## Structure

```
index.html                  app list
<app>/privacy.html          privacy policy per app
assets/style.css            all styles, shared by every page
assets/icons/*.png          App Store artwork, 256px
assets/fonts/*.woff2        self-hosted Inter + Inter Tight (latin subsets)
.nojekyll                   skip Jekyll processing
```

Apps: `billpad`, `expensepad`, `shoppad`, `incomepad`, `paletteer`.

## Privacy policy URLs

Point each App Store listing's Privacy Policy field at:

```
https://kafeteer.github.io/billpad/privacy.html
https://kafeteer.github.io/expensepad/privacy.html
https://kafeteer.github.io/shoppad/privacy.html
https://kafeteer.github.io/incomepad/privacy.html
https://kafeteer.github.io/paletteer/privacy.html
```

Policy text was copied from the previous WordPress and Framer pages. Billpad uses the
Framer version (May 7, 2025), not the older WordPress one (May 11, 2023) — see the note
below.

> **Billpad had two conflicting policies.** The WordPress page was a generic template
> claiming collection of usage data, IP addresses and device identifiers, plus sharing with
> service providers, affiliates and business partners. That contradicts both the Framer page
> and the App Store privacy declaration ("no data collected"). The Framer wording is the one
> reproduced here. Retire the WordPress page so the two can't diverge again.

## Local preview

```sh
python3 -m http.server 8000
```

## Deploy

Push to `main`; Pages serves from the repository root.
