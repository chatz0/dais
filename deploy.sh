#!/bin/bash
set -e

echo "🚀 Cleaning old build..."
rm -rf build

echo "🚀 Building the project..."
npm run build

echo "📦 Deploying to gh-pages..."

# Ensure gh-pages branch exists remotely
if ! git ls-remote --exit-code --heads origin gh-pages; then
  echo "Creating remote gh-pages branch..."
  git checkout --orphan gh-pages
  git reset --hard
  git commit --allow-empty -m "Initial gh-pages commit"
  git push origin gh-pages
  git checkout main
fi

# Remove any stale worktree
git worktree prune
rm -rf /tmp/gh-pages

# Create worktree and copy files
git worktree add /tmp/gh-pages gh-pages
rsync -av build/ /tmp/gh-pages/ --delete

cd /tmp/gh-pages
git add --all
git commit -m "Deploy build to gh-pages"
git push origin gh-pages

cd -
git worktree remove /tmp/gh-pages --force

echo "✅ Deployment complete! Your site should be live at: https://chatz0.github.io/dais"

