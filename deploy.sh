#!/bin/bash
set -e

echo "🚀 Cleaning old build..."
rm -rf build

echo "🚀 Building the project..."
npm run build

echo "📦 Deploying build folder to gh-pages branch..."

# Initialize gh-pages branch if it doesn't exist
git fetch origin
if ! git show-ref --quiet refs/remotes/origin/gh-pages; then
  echo "No gh-pages branch exists. Creating one..."
  git checkout --orphan gh-pages
  git reset --hard
  git commit --allow-empty -m "Initial gh-pages commit"
  git push origin gh-pages
  git checkout main
fi

# Use gh-pages npm package to deploy
npm run deploy

