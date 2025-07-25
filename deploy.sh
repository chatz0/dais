#!/bin/bash
set -e

echo "🚀 Building the project..."
npm run build

echo "📦 Deploying build folder to gh-pages branch..."
# Push only the build folder to gh-pages branch via subtree
git add build -f
git commit -m "Deploy build to gh-pages" || true
git subtree push --prefix build origin gh-pages

echo "✅ Deployment complete! Site should be live at: https://chatz0.github.io/dais"
