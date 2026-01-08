# 🚀 Quick GitHub Push - Step by Step

Follow these exact steps to push your assessment to GitHub.

---

## Step 1: Create GitHub Repository

1. Go to **https://github.com/new**
2. Repository name: `tms-foundation-assessment` 
3. Description: `Technical Assessment for TMS Foundation`
4. Choose **Public** or **Private**
5. **DO NOT** check "Initialize with README"
6. Click **"Create repository"**

---

## Step 2: Open Terminal/PowerShell

**Windows:** Press `Win + X` → Select "Windows PowerShell" or "Terminal"  
**Mac/Linux:** Press `Cmd + Space` → Type "Terminal"

---

## Step 3: Navigate to Your Project

```bash
cd "C:\Users\Dharmik\OneDrive\Desktop\bharatyuva"
```

---

## Step 4: Initialize Git (if not done)

```bash
git init
```

---

## Step 5: Add All Files

```bash
git add .
```

---

## Step 6: Commit Files

```bash
git commit -m "Initial commit: TMS Foundation Technical Assessment"
```

---

## Step 7: Add GitHub Remote

**Replace `YOUR_USERNAME` with your GitHub username:**

```bash
git remote add origin https://github.com/YOUR_USERNAME/tms-foundation-assessment.git
```

**Example:**
```bash
git remote add origin https://github.com/johndoe/tms-foundation-assessment.git
```

---

## Step 8: Set Main Branch

```bash
git branch -M main
```

---

## Step 9: Push to GitHub

```bash
git push -u origin main
```

**If asked for credentials:**
- **Username:** Your GitHub username
- **Password:** Use a **Personal Access Token** (not your password)

**To create a token:**
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token
3. Select scopes: `repo` (all)
4. Copy the token and use it as password

---

## Step 10: Verify

1. Go to **https://github.com/YOUR_USERNAME/tms-foundation-assessment**
2. You should see all your files!

---

## ✅ Optional: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **Save**
5. Your docs will be at: `https://YOUR_USERNAME.github.io/tms-foundation-assessment/`

---

## 🎉 Done!

Your assessment is now on GitHub and ready to share!

**Repository Link:**
```
https://github.com/YOUR_USERNAME/tms-foundation-assessment
```

---

## 🆘 Troubleshooting

### "Repository not found"
- Check the repository name matches exactly
- Make sure you created the repository on GitHub first

### "Authentication failed"
- Use Personal Access Token instead of password
- Or set up SSH keys (see DEPLOYMENT_GUIDE.md)

### "Large file detected"
- Make sure `node_modules/` is in `.gitignore` (it should be)
- If you see this error, run: `git rm --cached -r node_modules/`

---

## 📖 For More Details

See `DEPLOYMENT_GUIDE.md` for:
- Advanced deployment options
- React app deployment
- Django API deployment
- GitHub Pages setup

