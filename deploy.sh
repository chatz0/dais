#!/bin/bash
set -e

echo "🚀 Cleaning old build..."
rm -rf build

echo "🚀 Building the project..."
npm run build

echo "📦 Deploying to gh-pages..."

# Create gh-pages branch if it doesn’t exist
if ! git show-ref --verify --quiet refs/heads/gh-pages; then
  echo "Creating gh-pages branch..."
  git checkout --orphan gh-pages
  git reset --hard
  git commit --allow-empty -m "Initial gh-pages commit"
  git push origin gh-pages
  git checkout main
fi

# Prepare a clean worktree for gh-pages
rm -rf /tmp/gh-pages
git worktree prune
git worktree add /tmp/gh-pages gh-pages

# Remove old files in gh-pages (but keep .git)
rm -rf /tmp/gh-pages/*

# Copy new build files into gh-pages
cp -R build/* /tmp/gh-pages/

# Commit and push changes
cd /tmp/gh-pages
git add --all
git commit -m "Deploy build to gh-pages" || echo "No changes to commit"
git push origin gh-pages

# Return to project directory
cd -
echo "✅ Deployment complete! Site is live at: https://chatz0.github.io/dais"

