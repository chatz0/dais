#!/bin/bash
set -e

echo "🚀 Cleaning old build..."
rm -rf build

echo "🚀 Building the project..."
npm run build

echo "📦 Deploying build folder to gh-pages branch..."

# Cleanup previous temp folder if it exists
rm -rf /tmp/gh-pages

# Fetch latest gh-pages branch
git fetch origin gh-pages || echo "No existing gh-pages branch"

# Create a worktree for gh-pages
git worktree add /tmp/gh-pages gh-pages

# Clear old contents and copy new build
rm -rf /tmp/gh-pages/*
cp -R build/* /tmp/gh-pages/

# Commit and push
cd /tmp/gh-pages
git add --all
git commit -m "Deploy build to gh-pages" || echo "No changes to commit"
git push origin gh-pages --force

# Cleanup worktree
cd -
git worktree remove /tmp/gh-pages --force
rm -rf /tmp/gh-pages

echo "✅ Deployment complete! Your site should be live at: https://chatz0.github.io/dais"

