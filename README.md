# kafeteer.github.io

Minimalist landing page for the iOS apps of [Oscar De Moya](https://apps.apple.com/developer/oscar-de-moya/id1236595635).

Static, single file, no build step. Palette and typography derived from the
[Billpad](https://billpad.framer.website) site: Inter / Inter Tight, cream `#FFFEFA`,
ink `#302D3E`, accent `#0099FF`. Auto light/dark via `prefers-color-scheme`.

## Structure

```
index.html              page + inline CSS
assets/icons/*.png      App Store artwork, 256px
assets/fonts/*.woff2    self-hosted Inter + Inter Tight (latin subsets)
.nojekyll               skip Jekyll processing
```

## Local preview

```sh
python3 -m http.server 8000
```

## Deploy

Pushing to `main` publishes to https://kafeteer.github.io — Pages is served from the
root of the default branch.
