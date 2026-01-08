# 🚀 Quick Deploy - Push to GitHub & Deploy Live

Follow these steps to push your assessment to GitHub and deploy it.

---

## 🎯 Option 1: Use Automated Script (Easiest)

### Windows (PowerShell):
```powershell
# Run the deployment script
.\deploy-now.ps1
```

The script will:
- ✅ Initialize Git (if needed)
- ✅ Add GitHub remote
- ✅ Stage all files
- ✅ Commit changes
- ✅ Push to GitHub
- ✅ Show you the repository URL

---

## 🎯 Option 2: Manual Steps

### Step 1: Create GitHub Repository

1. Go to **https://github.com/new**
2. Repository name: `tms-foundation-assessment`
3. Description: `Technical Assessment for TMS Foundation`
4. Choose **Public** or **Private**
5. **DO NOT** check "Initialize with README"
6. Click **"Create repository"**

### Step 2: Open PowerShell in Project Folder

Press `Win + X` → Select "Windows PowerShell" or "Terminal"

### Step 3: Run These Commands

```powershell
# Navigate to project
cd "C:\Users\Dharmik\OneDrive\Desktop\bharatyuva"

# Initialize Git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: TMS Foundation Technical Assessment"

# Add GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/tms-foundation-assessment.git

# Set main branch
git branch -M main

# Push to GitHub
git push -u origin main
```

**If asked for credentials:**
- Username: Your GitHub username
- Password: Use a **Personal Access Token** (not your password)

**To create token:**
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token
3. Select scope: `repo` (all)
4. Copy token and use as password

---

## 🌐 Step 4: Deploy Documentation (GitHub Pages)

### Enable GitHub Pages:

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **Save**
5. Wait 2-5 minutes
6. Your docs will be live at:
   ```
   https://YOUR_USERNAME.github.io/tms-foundation-assessment/
   ```

---

## ⚛️ Step 5: Deploy React App (Optional)

### Option A: Vercel (Recommended - Free)

```powershell
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? tms-foundation-assessment
# - Directory? ./
```

Your app will be live at: `https://tms-foundation-assessment.vercel.app`

### Option B: Netlify (Free)

```powershell
# Install Netlify CLI
npm install -g netlify-cli

# Build React app
npm run build

# Deploy
netlify deploy --prod
```

### Option C: GitHub Pages (For React)

```powershell
# Install gh-pages
npm install --save-dev gh-pages

# Update package.json - add this to "scripts":
# "predeploy": "npm run build",
# "deploy": "gh-pages -d build"

# And add this:
# "homepage": "https://YOUR_USERNAME.github.io/tms-foundation-assessment"

# Deploy
npm run deploy
```

---

## ✅ Verification

After pushing, verify:

1. **Repository is live:**
   ```
   https://github.com/YOUR_USERNAME/tms-foundation-assessment
   ```

2. **GitHub Pages (if enabled):**
   ```
   https://YOUR_USERNAME.github.io/tms-foundation-assessment/
   ```

3. **All files are there:**
   - ✅ ASSESSMENT.md
   - ✅ README.md
   - ✅ implementation/ folder
   - ✅ All documentation

---

## 🆘 Troubleshooting

### "Authentication failed"
**Solution:** Use Personal Access Token instead of password

### "Repository not found"
**Solution:** Make sure you created the repository on GitHub first

### "Large file detected"
**Solution:** 
```powershell
git rm --cached -r node_modules
git commit -m "Remove node_modules"
git push
```

### GitHub Pages not showing
**Solution:** 
- Wait 5-10 minutes
- Check Settings → Pages for errors
- Make sure `README.md` exists in root

---

## 🎉 You're Done!

Your assessment is now:
- ✅ On GitHub
- ✅ Accessible via repository link
- ✅ Optionally deployed as live documentation
- ✅ Ready to share with TMS Foundation

**Repository Link:**
```
https://github.com/YOUR_USERNAME/tms-foundation-assessment
```

---

## 📖 Need More Help?

- **Detailed Push Steps:** See `GITHUB_PUSH_STEPS.md`
- **Deployment Options:** See `DEPLOYMENT_GUIDE.md`
- **Production Checklist:** See `PRODUCTION_CHECKLIST.md`

---

**Ready to deploy? Run `.\deploy-now.ps1` or follow the manual steps above! 🚀**

