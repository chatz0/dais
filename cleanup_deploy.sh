#!/bin/bash

set -e

echo "🚀 Full cleanup and redeploy started..."

# 1. Clean caches & dependencies
echo "🧹 Cleaning old files and caches..."
rm -rf build node_modules package-lock.json
npm cache clean --force

# 2. Reinstall dependencies
echo "📦 Installing fresh dependencies..."
npm install

# 3. Ensure local changes are committed
if [ -n "$(git status --porcelain)" ]; then
  echo "💾 Committing local changes..."
  git add .
  git commit -m "Full cleanup: ensure all changes before redeploy"
fi

# 4. Push main to remote
echo "⬆️ Pushing main branch to origin..."
git push origin main

# 5. Remove old gh-pages branch (local & remote)
echo "🧨 Removing old gh-pages branch..."
git branch -D gh-pages || true
git push origin --delete gh-pages || true

# 6. Build and deploy
echo "🏗️ Building project..."
npm run build

echo "🚢 Deploying fresh to gh-pages..."
git subtree split --prefix build -b gh-pages
git push -f origin gh-pages:gh-pages
git branch -D gh-pages

echo "✅ Done! Site should be live shortly at: https://chatz0.github.io/dais"

