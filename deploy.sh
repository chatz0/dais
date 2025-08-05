#!/bin/bash
set -e

echo "🚀 Cleaning old build..."
rm -rf build

echo "🚀 Building the project..."
npm run build

echo "📦 Checking gh-pages branch..."
# Fetch latest branches from remote
git fetch origin

# If gh-pages branch doesn't exist, create it
if ! git show-ref --quiet refs/remotes/origin/gh-pages; then
  echo "No gh-pages branch found. Creating one..."
  git checkout --orphan gh-pages
  git reset --hard
  git commit --allow-empty -m "Initial gh-pages commit"
  git push origin gh-pages
  git checkout main
fi

echo "📦 Deploying build folder to gh-pages branch..."
# Deploy using gh-pages npm package
npm run deploy

echo "✅ Deployment complete! Your site should be live at: https://chatz0.github.io/dais"

