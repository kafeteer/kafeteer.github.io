#!/usr/bin/env bash
# Creates kafeteer/kafeteer.github.io and publishes this folder to GitHub Pages.
# Requires: gh auth login  (as the kafeteer account)
set -euo pipefail

gh auth status

git init -b main
git add -A
git commit -m "Add landing page for App Store apps"
gh repo create kafeteer/kafeteer.github.io --public --source=. --remote=origin --push
gh api -X POST "repos/kafeteer/kafeteer.github.io/pages" \
  -f "source[branch]=main" -f "source[path]=/" 2>/dev/null || \
  echo "Pages may already be enabled — check Settings > Pages."

echo
echo "Done. Live in ~1 min at https://kafeteer.github.io"
