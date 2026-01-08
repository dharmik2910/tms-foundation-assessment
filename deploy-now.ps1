# PowerShell Script to Push to GitHub and Deploy
# Run this script: .\deploy-now.ps1

Write-Host "🚀 TMS Foundation Assessment - GitHub Push & Deploy" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is installed
try {
    $gitVersion = git --version
    Write-Host "✅ Git found: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git is not installed. Please install Git first." -ForegroundColor Red
    exit 1
}

# Initialize git if needed
if (-not (Test-Path .git)) {
    Write-Host "📦 Initializing Git repository..." -ForegroundColor Yellow
    git init
    Write-Host "✅ Git initialized" -ForegroundColor Green
} else {
    Write-Host "✅ Git repository already initialized" -ForegroundColor Green
}

# Check if remote exists
$remoteExists = git remote | Select-String -Pattern "origin"
if (-not $remoteExists) {
    Write-Host ""
    Write-Host "⚠️  No GitHub remote found!" -ForegroundColor Yellow
    Write-Host ""
    $username = Read-Host "Enter your GitHub username"
    $repoName = Read-Host "Enter repository name (or press Enter for 'tms-foundation-assessment')"
    
    if ([string]::IsNullOrWhiteSpace($repoName)) {
        $repoName = "tms-foundation-assessment"
    }
    
    $repoUrl = "https://github.com/$username/$repoName.git"
    Write-Host ""
    Write-Host "Adding remote: $repoUrl" -ForegroundColor Yellow
    git remote add origin $repoUrl
    Write-Host "✅ Remote added" -ForegroundColor Green
} else {
    Write-Host "✅ Remote 'origin' already exists" -ForegroundColor Green
    $remoteUrl = git remote get-url origin
    Write-Host "   Remote URL: $remoteUrl" -ForegroundColor Gray
}

# Stage all files
Write-Host ""
Write-Host "📝 Staging all files..." -ForegroundColor Yellow
git add .
Write-Host "✅ Files staged" -ForegroundColor Green

# Show what will be committed
Write-Host ""
Write-Host "📋 Files to be committed:" -ForegroundColor Cyan
git status --short

# Commit
Write-Host ""
$commitMessage = Read-Host "Enter commit message (or press Enter for default)"
if ([string]::IsNullOrWhiteSpace($commitMessage)) {
    $commitMessage = "Initial commit: TMS Foundation Technical Assessment"
}

Write-Host "💾 Committing changes..." -ForegroundColor Yellow
git commit -m $commitMessage
Write-Host "✅ Changes committed" -ForegroundColor Green

# Set main branch
Write-Host ""
Write-Host "🌿 Setting main branch..." -ForegroundColor Yellow
git branch -M main
Write-Host "✅ Branch set to main" -ForegroundColor Green

# Push to GitHub
Write-Host ""
Write-Host "📤 Pushing to GitHub..." -ForegroundColor Yellow
Write-Host "   (You may be asked for GitHub credentials)" -ForegroundColor Gray
Write-Host ""
try {
    git push -u origin main
    Write-Host ""
    Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host ""
    
    # Get repository URL
    $remoteUrl = git remote get-url origin
    $repoUrl = $remoteUrl -replace '\.git$', ''
    $repoUrl = $repoUrl -replace 'git@github\.com:', 'https://github.com/'
    $repoUrl = $repoUrl -replace 'https://github\.com/', 'https://github.com/'
    
    Write-Host "🎉 Your repository is now live on GitHub!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🔗 Repository URL: $repoUrl" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "📖 Next Steps:" -ForegroundColor Yellow
    Write-Host "   1. Visit your repository: $repoUrl" -ForegroundColor White
    Write-Host "   2. Enable GitHub Pages (optional):" -ForegroundColor White
    Write-Host "      - Go to Settings → Pages" -ForegroundColor Gray
    Write-Host "      - Select Branch: main, Folder: / (root)" -ForegroundColor Gray
    Write-Host "      - Your docs will be at: https://$($repoUrl -replace 'https://github.com/', '' -replace '/', '.github.io/')/" -ForegroundColor Gray
    Write-Host ""
    Write-Host "   3. For React app deployment, see DEPLOYMENT_GUIDE.md" -ForegroundColor White
    Write-Host ""
    
} catch {
    Write-Host ""
    Write-Host "❌ Error pushing to GitHub" -ForegroundColor Red
    Write-Host "   Common issues:" -ForegroundColor Yellow
    Write-Host "   - Authentication failed: Use Personal Access Token" -ForegroundColor Gray
    Write-Host "   - Repository not found: Create it on GitHub first" -ForegroundColor Gray
    Write-Host ""
    Write-Host "   See GITHUB_PUSH_STEPS.md for detailed help" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

