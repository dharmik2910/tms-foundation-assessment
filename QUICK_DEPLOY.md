# ⚡ Quick Deploy Summary - Render + Vercel

## 🎯 Quick Overview

**Backend (Django API):** Deploy on Render  
**Frontend (React):** Deploy on Vercel

---

## 📋 Step-by-Step Checklist

### ✅ Backend Setup (Render)

1. **Create Django Project** (if needed)
   ```bash
   mkdir django_backend
   cd django_backend
   python -m venv venv
   venv\Scripts\activate
   pip install django djangorestframework django-cors-headers gunicorn psycopg2-binary whitenoise
   django-admin startproject tmsapi .
   ```

2. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub

3. **Create PostgreSQL Database**
   - New + → PostgreSQL
   - Copy Database URL

4. **Create Web Service**
   - New + → Web Service
   - Connect repository: `dharmik2910/tms-foundation-assessment`
   - Root Directory: `django_backend`
   - Build Command: `pip install -r requirements.txt && python manage.py migrate && python manage.py collectstatic --no-input`
   - Start Command: `gunicorn tmsapi.wsgi:application`

5. **Add Environment Variables in Render:**
   ```
   SECRET_KEY = [generate random key]
   DEBUG = False
   ALLOWED_HOSTS = your-app.onrender.com
   DATABASE_URL = [from PostgreSQL service]
   CORS_ALLOWED_ORIGINS = https://your-frontend.vercel.app
   ```

6. **Deploy** - Wait 5-10 minutes
   - Your API: `https://your-app.onrender.com`

---

### ✅ Frontend Setup (Vercel)

1. **Create React App** (if needed)
   ```bash
   mkdir react_frontend
   cd react_frontend
   npx create-react-app .
   ```

2. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

3. **Login to Vercel**
   ```bash
   vercel login
   ```

4. **Deploy**
   ```bash
   cd react_frontend
   vercel
   ```

5. **Add Environment Variable in Vercel Dashboard:**
   - Settings → Environment Variables
   - `REACT_APP_API_URL` = `https://your-backend.onrender.com/api`

6. **Redeploy**
   ```bash
   vercel --prod
   ```

---

## 🔗 Connect Them

1. **Update CORS in Render:**
   - Add your Vercel URL to `CORS_ALLOWED_ORIGINS`

2. **Update API URL in Vercel:**
   - Set `REACT_APP_API_URL` to your Render API URL

---

## 📖 Full Guide

See **`DEPLOY_RENDER_VERCEL.md`** for complete detailed instructions with code examples.

---

## 🎉 Result

- **Backend:** `https://your-app.onrender.com/api`
- **Frontend:** `https://your-app.vercel.app`

Both are live and connected! 🚀

