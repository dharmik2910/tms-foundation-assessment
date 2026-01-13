# 🚀 Deployment Steps for Django Backend

Your Django application is now configured for production deployment on Render.

## ✅ What Has Been Configured

1. **settings.py** - Updated for production:
   - Environment variable support (python-decouple)
   - PostgreSQL database configuration
   - Static files handling with WhiteNoise
   - CORS configuration
   - Security settings for production

2. **requirements.txt** - Added production dependencies:
   - python-decouple
   - psycopg2-binary (PostgreSQL)
   - whitenoise (static files)
   - dj-database-url (database URL parsing)

3. **build.sh** - Build script for Render
4. **Procfile** - Process file for Render

## 📋 Next Steps to Deploy on Render

### 1. Generate a Secret Key

Generate a new secret key for production:
```bash
python -c "import secrets; print(secrets.token_urlsafe(50))"
```
Save this key - you'll need it in step 4.

### 2. Commit Changes to GitHub

```bash
git add django_backend/
git commit -m "Configure Django for production deployment"
git push origin main
```

### 3. Create Render Account and PostgreSQL Database

1. Go to https://render.com
2. Sign up with GitHub
3. Click **"New +"** → **"PostgreSQL"**
4. Name it (e.g., `tms-foundation-db`)
5. Choose Free plan (for testing)
6. Click **"Create Database"**
7. **Copy the Internal Database URL** (you'll need it)

### 4. Create Web Service on Render

1. Click **"New +"** → **"Web Service"**
2. Connect your repository: `dharmik2910/tms-foundation-assessment`
3. Configure:
   - **Name:** `tms-foundation-api` (or your preferred name)
   - **Region:** Choose closest to you
   - **Branch:** `main`
   - **Root Directory:** `django_backend`
   - **Runtime:** `Python 3`
   - **Build Command:** `./build.sh` or `pip install -r requirements.txt && python manage.py migrate && python manage.py collectstatic --no-input`
   - **Start Command:** `gunicorn tmsapi.wsgi:application`
4. Click **"Advanced"** → **"Add Environment Variable"**

### 5. Add Environment Variables in Render Dashboard

Add these environment variables in the Render dashboard:

```
SECRET_KEY = [paste the secret key from step 1]
DEBUG = False
ALLOWED_HOSTS = tms-foundation-api.onrender.com
DATABASE_URL = [paste the Internal Database URL from step 3]
CORS_ALLOWED_ORIGINS = https://your-frontend.vercel.app
```

**Note:** Replace `tms-foundation-api.onrender.com` with your actual service name if different.
Update `CORS_ALLOWED_ORIGINS` after deploying your frontend.

### 6. Deploy

1. Click **"Create Web Service"**
2. Render will automatically:
   - Clone your repository
   - Install dependencies
   - Run migrations
   - Collect static files
   - Start the service
3. Wait 5-10 minutes for the first deployment
4. Your API will be live at: `https://your-service-name.onrender.com`

### 7. Test Your Deployment

```bash
# Test admin page
curl https://your-service-name.onrender.com/admin/

# Should return HTML (or redirect to login)
```

## 🔧 Troubleshooting

**Database connection error:**
- Verify DATABASE_URL is correct in Render environment variables
- Ensure you're using the Internal Database URL (not External)

**Static files not loading:**
- Check that `whitenoise` is in requirements.txt (it is)
- Verify build command ran successfully

**CORS errors:**
- Update CORS_ALLOWED_ORIGINS in Render to include your frontend URL
- Restart the service after updating environment variables

**Build fails:**
- Check build logs in Render dashboard
- Ensure all dependencies are in requirements.txt
- Verify Python version compatibility

## 📝 Important Notes

- **Never commit your `.env` file** - it contains sensitive information
- **Never commit your `SECRET_KEY`** - use environment variables
- The app uses SQLite locally and PostgreSQL in production automatically
- DEBUG is set to False in production for security

## 🔗 Next Steps After Backend Deployment

1. Deploy your frontend (if you have one)
2. Update CORS_ALLOWED_ORIGINS in Render with your frontend URL
3. Update your frontend's API URL to point to the Render backend URL

