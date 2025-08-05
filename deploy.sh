#!/bin/bash
set -e

echo "🚀 Building the project..."
npm run build

echo "📦 Preparing to deploy (force)..."

# Split the build folder into a temporary branch
git subtree split --prefix build -b gh-pages-temp

# Force push that branch to remote gh-pages
git push origin gh-pages-temp:gh-pages --force

# Delete the temporary branch locally
git branch -D gh-pages-temp

echo "✅ Deployment complete! Your site should be live at: https://chatz0.github.io/dais"

