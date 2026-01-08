@echo off
REM Quick script to push assessment to GitHub (Windows)
REM Usage: push-to-github.bat "Your commit message"

echo 🚀 TMS Foundation Assessment - GitHub Push Script
echo ==================================================
echo.

REM Check if git is initialized
if not exist ".git" (
    echo 📦 Initializing Git repository...
    git init
)

REM Check if remote exists
git remote show origin >nul 2>&1
if errorlevel 1 (
    echo.
    echo ⚠️  No remote 'origin' found!
    echo Please add your GitHub repository as remote:
    echo   git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
    echo.
    pause
)

REM Add all files
echo 📝 Staging files...
git add .

REM Show status
echo.
echo 📋 Files to be committed:
git status --short

REM Commit
if "%1"=="" (
    set COMMIT_MSG=Initial commit: TMS Foundation Technical Assessment
) else (
    set COMMIT_MSG=%1
)

echo.
echo 💾 Committing changes...
git commit -m "%COMMIT_MSG%"

REM Set main branch
echo.
echo 🌿 Setting main branch...
git branch -M main

REM Push
echo.
echo 📤 Pushing to GitHub...
git push -u origin main

echo.
echo ✅ Done! Your repository is now on GitHub!
echo.
echo 🔗 Next steps:
echo    1. Visit your GitHub repository
echo    2. Enable GitHub Pages (Settings → Pages)
echo    3. Share the repository link
echo.
echo 📖 For deployment options, see: DEPLOYMENT_GUIDE.md
pause

