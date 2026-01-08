#!/bin/bash

# Quick script to push assessment to GitHub
# Usage: ./push-to-github.sh "Your commit message"

echo "🚀 TMS Foundation Assessment - GitHub Push Script"
echo "=================================================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
fi

# Check if remote exists
if ! git remote | grep -q "origin"; then
    echo ""
    echo "⚠️  No remote 'origin' found!"
    echo "Please add your GitHub repository as remote:"
    echo "  git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git"
    echo ""
    read -p "Press Enter to continue after adding remote, or Ctrl+C to exit..."
fi

# Add all files
echo "📝 Staging files..."
git add .

# Show status
echo ""
echo "📋 Files to be committed:"
git status --short

# Commit
COMMIT_MSG=${1:-"Initial commit: TMS Foundation Technical Assessment"}
echo ""
echo "💾 Committing changes..."
git commit -m "$COMMIT_MSG"

# Set main branch
echo ""
echo "🌿 Setting main branch..."
git branch -M main

# Push
echo ""
echo "📤 Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Done! Your repository is now on GitHub!"
echo ""
echo "🔗 Next steps:"
echo "   1. Visit your GitHub repository"
echo "   2. Enable GitHub Pages (Settings → Pages)"
echo "   3. Share the repository link"
echo ""
echo "📖 For deployment options, see: DEPLOYMENT_GUIDE.md"

