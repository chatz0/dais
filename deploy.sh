#!/bin/bash
set -e

echo "🚀 Building the project..."
npm run build

echo "📄 Adding 404.html fallback..."
cp build/index.html build/404.html

echo "📦 Preparing to deploy (force)..."
git subtree split --prefix build -b gh-pages-temp
git push -f origin gh-pages-temp:gh-pages
git branch -D gh-pages-temp

echo "✅ Deployment complete! Your site should be live at: https://chatz0.github.io/dais"
