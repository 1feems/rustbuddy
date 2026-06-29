#!/bin/bash
# deploy.sh — build exercise pages from MD, then commit and push to GitHub.
# Usage (from anywhere inside game/):  ./deploy.sh "your commit message"
# Vercel picks up the push automatically and redeploys the live site.

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

if [ -z "$1" ]; then
  echo "Usage: ./deploy.sh \"your commit message\""
  exit 1
fi

echo "Building exercise pages from MD files..."
node "$SCRIPT_DIR/exercises/build.js"

echo "Staging changes..."
cd "$SCRIPT_DIR"
git add .

echo "Committing..."
git commit -m "$1"

echo "Pushing to GitHub..."
git push

echo ""
echo "Done. Vercel will deploy in ~60 seconds."
echo "Live site: https://rust-bud.vercel.app"
