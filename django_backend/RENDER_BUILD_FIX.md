# 🔧 Fix for Build Error on Render

## Problem
Render can't find `build.sh` file, causing deployment to fail with:
```
bash: line 1: ./build.sh: No such file or directory
```

## ✅ Solution: Use Inline Build Command

Instead of using `./build.sh`, use this inline build command in Render:

### Update Build Command in Render Dashboard

1. Go to your Render service
2. Click on **"Settings"** tab
3. Scroll down to **"Build Command"**
4. Replace `./build.sh` with:

```bash
pip install -r requirements.txt && python manage.py migrate --no-input && python manage.py collectstatic --no-input
```

5. Click **"Save Changes"**
6. The service will automatically redeploy

### Alternative: Keep Using build.sh

If you want to use `build.sh`, ensure it's committed and use:

```bash
bash build.sh
```

instead of `./build.sh`

## Recommended Approach

**Use the inline command** - it's more reliable and doesn't require file permissions.

