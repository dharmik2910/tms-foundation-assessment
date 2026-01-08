# 🚀 Complete Deployment Guide: Render (Backend) + Vercel (Frontend)

Step-by-step guide to deploy Django backend on Render and React frontend on Vercel.

---

## 📋 Prerequisites

- GitHub account (repository already created: https://github.com/dharmik2910/tms-foundation-assessment)
- Render account (free tier available) - Sign up at https://render.com
- Vercel account (free tier available) - Sign up at https://vercel.com
- Your Django project ready (or we'll set up a basic one)

---

## 🐍 PART 1: Deploy Django Backend on Render

### Step 1: Prepare Django Project

#### 1.1 Create Django Project Structure (if you don't have one)

```bash
# In your project directory
cd "C:\Users\Dharmik\OneDrive\Desktop\bharatyuva"

# Create Django project structure
mkdir django_backend
cd django_backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows

# Install Django and dependencies
pip install django djangorestframework django-cors-headers gunicorn psycopg2-binary python-decouple

# Create requirements.txt
pip freeze > requirements.txt
```

#### 1.2 Create Django Project

```bash
# Create Django project
django-admin startproject tmsapi .
cd tmsapi

# Create a simple API app
python manage.py startapp programs
```

#### 1.3 Update Django Settings

Edit `tmsapi/settings.py`:

```python
import os
from pathlib import Path
from decouple import config

BASE_DIR = Path(__file__).resolve().parent.parent

# Security Settings
SECRET_KEY = config('SECRET_KEY', default='django-insecure-change-in-production')
DEBUG = config('DEBUG', default=False, cast=bool)
ALLOWED_HOSTS = config('ALLOWED_HOSTS', default='localhost,127.0.0.1').split(',')

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'programs',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # For static files
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'tmsapi.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'tmsapi.wsgi.application'

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config('DB_NAME', default=''),
        'USER': config('DB_USER', default=''),
        'PASSWORD': config('DB_PASSWORD', default=''),
        'HOST': config('DB_HOST', default='localhost'),
        'PORT': config('DB_PORT', default='5432'),
    }
}

# Or use DATABASE_URL from Render
import dj_database_url
if os.environ.get('DATABASE_URL'):
    DATABASES['default'] = dj_database_url.parse(os.environ.get('DATABASE_URL'))

# Static files
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# CORS Configuration
CORS_ALLOWED_ORIGINS = config(
    'CORS_ALLOWED_ORIGINS',
    default='http://localhost:3000,http://127.0.0.1:3000'
).split(',')

CORS_ALLOW_CREDENTIALS = True

# REST Framework
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
}

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
```

#### 1.4 Create Simple API View

Edit `programs/views.py`:

```python
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET'])
def health_check(request):
    return Response({
        'status': 'healthy',
        'message': 'TMS Foundation API is running',
        'version': '1.0.0'
    })

@api_view(['GET'])
def programs_list(request):
    return Response({
        'programs': [
            {'id': 1, 'name': 'Life Science Wing', 'status': 'active'},
            {'id': 2, 'name': 'EViNetCo-wing', 'status': 'active'},
            {'id': 3, 'name': 'Agri Wing', 'status': 'active'},
            {'id': 4, 'name': 'CAiSMD', 'status': 'active'},
        ]
    })
```

Edit `programs/urls.py`:

```python
from django.urls import path
from . import views

urlpatterns = [
    path('health/', views.health_check, name='health'),
    path('programs/', views.programs_list, name='programs'),
]
```

Edit `tmsapi/urls.py`:

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('programs.urls')),
]
```

#### 1.5 Update requirements.txt

```txt
Django>=4.2.0
djangorestframework>=3.14.0
django-cors-headers>=4.3.0
gunicorn>=21.2.0
psycopg2-binary>=2.9.9
python-decouple>=3.8
whitenoise>=6.6.0
dj-database-url>=2.1.0
```

#### 1.6 Create build.sh (for Render)

Create `build.sh` in django_backend:

```bash
#!/usr/bin/env bash
# Exit on error
set -o errexit

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate --no-input

# Collect static files
python manage.py collectstatic --no-input --clear
```

Make it executable (on Windows, Render will handle this):

```bash
# On Windows, create build.sh with above content
```

#### 1.7 Create Procfile (for Render)

Create `Procfile` in django_backend:

```
web: gunicorn tmsapi.wsgi:application
```

#### 1.8 Create .env.example

Create `.env.example`:

```
SECRET_KEY=your-secret-key-here
DEBUG=False
ALLOWED_HOSTS=your-app.onrender.com
CORS_ALLOWED_ORIGINS=https://your-frontend.vercel.app
DATABASE_URL=postgresql://user:pass@host:port/dbname
```

#### 1.9 Commit and Push to GitHub

```bash
# Add django_backend to your repository
cd "C:\Users\Dharmik\OneDrive\Desktop\bharatyuva"
git add django_backend/
git commit -m "Add Django backend for Render deployment"
git push origin main
```

---

### Step 2: Deploy on Render

#### 2.1 Create Render Account

1. Go to https://render.com
2. Sign up with GitHub
3. Authorize Render to access your repositories

#### 2.2 Create PostgreSQL Database

1. Click **"New +"** → **"PostgreSQL"**
2. Name: `tms-foundation-db`
3. Database: `tmsdb`
4. User: `tmsuser`
5. Region: Choose closest to you
6. Plan: **Free** (for testing)
7. Click **"Create Database"**
8. **Copy the Internal Database URL** (you'll need it)

#### 2.3 Create Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your repository: `dharmik2910/tms-foundation-assessment`
3. Configure:
   - **Name:** `tms-foundation-api`
   - **Region:** Choose closest
   - **Branch:** `main`
   - **Root Directory:** `django_backend`
   - **Runtime:** `Python 3`
   - **Build Command:** `./build.sh` or `pip install -r requirements.txt && python manage.py migrate && python manage.py collectstatic --no-input`
   - **Start Command:** `gunicorn tmsapi.wsgi:application`
4. Click **"Advanced"** → **"Add Environment Variable"**

#### 2.4 Add Environment Variables

Add these in Render dashboard:

```
SECRET_KEY = [Generate a random secret key - use: python -c "import secrets; print(secrets.token_urlsafe(50))"]
DEBUG = False
ALLOWED_HOSTS = tms-foundation-api.onrender.com
CORS_ALLOWED_ORIGINS = https://your-frontend.vercel.app (we'll update this after Vercel deployment)
DATABASE_URL = [Paste the Internal Database URL from PostgreSQL service]
```

#### 2.5 Deploy

1. Click **"Create Web Service"**
2. Render will:
   - Clone your repository
   - Install dependencies
   - Run migrations
   - Start the service
3. Wait 5-10 minutes for first deployment
4. Your API will be live at: `https://tms-foundation-api.onrender.com`

#### 2.6 Test Your API

```bash
# Test health endpoint
curl https://tms-foundation-api.onrender.com/api/health/

# Test programs endpoint
curl https://tms-foundation-api.onrender.com/api/programs/
```

---

## ⚛️ PART 2: Deploy React Frontend on Vercel

### Step 1: Prepare React App

#### 1.1 Create React App Structure

```bash
# In your project root
cd "C:\Users\Dharmik\OneDrive\Desktop\bharatyuva"

# Create React app directory
mkdir react_frontend
cd react_frontend

# Initialize React app
npx create-react-app . --yes
```

#### 1.2 Install Dependencies

```bash
npm install axios
```

#### 1.3 Create API Configuration

Create `src/config/api.js`:

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export const apiClient = {
  baseURL: API_BASE_URL,
  
  async get(endpoint) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    return response.json();
  },
  
  async post(endpoint, data) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
};
```

#### 1.4 Create App Component

Edit `src/App.js`:

```javascript
import React, { useState, useEffect } from 'react';
import { apiClient } from './config/api';
import './App.css';

function App() {
  const [health, setHealth] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check API health
    apiClient.get('/health/')
      .then(data => {
        setHealth(data);
        return apiClient.get('/programs/');
      })
      .then(data => {
        setPrograms(data.programs || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('API Error:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="App">Loading...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>🏛️ TMS Foundation Portal</h1>
        {health && (
          <div>
            <p>Status: {health.status}</p>
            <p>{health.message}</p>
          </div>
        )}
        
        <h2>Programs</h2>
        <div className="programs-list">
          {programs.map(program => (
            <div key={program.id} className="program-card">
              <h3>{program.name}</h3>
              <p>Status: {program.status}</p>
            </div>
          ))}
        </div>
        
        <p>API URL: {process.env.REACT_APP_API_URL || 'Not configured'}</p>
      </header>
    </div>
  );
}

export default App;
```

#### 1.5 Create .env.production

Create `.env.production`:

```
REACT_APP_API_URL=https://tms-foundation-api.onrender.com/api
```

#### 1.6 Update .gitignore

Make sure `.env.production` is NOT in `.gitignore` (Vercel needs it), but `.env.local` should be ignored.

#### 1.7 Commit and Push

```bash
cd "C:\Users\Dharmik\OneDrive\Desktop\bharatyuva"
git add react_frontend/
git commit -m "Add React frontend for Vercel deployment"
git push origin main
```

---

### Step 2: Deploy on Vercel

#### 2.1 Install Vercel CLI

```bash
npm install -g vercel
```

#### 2.2 Login to Vercel

```bash
vercel login
```

Follow the prompts to authenticate.

#### 2.3 Deploy from Command Line

```bash
cd react_frontend
vercel
```

Follow prompts:
- **Set up and deploy?** Yes
- **Which scope?** Your account
- **Link to existing project?** No
- **What's your project's name?** `tms-foundation-frontend`
- **In which directory is your code located?** `./`
- **Want to override the settings?** No

#### 2.4 Add Environment Variables

After deployment, go to Vercel Dashboard:

1. Go to https://vercel.com/dashboard
2. Click on your project: `tms-foundation-frontend`
3. Go to **Settings** → **Environment Variables**
4. Add:
   - **Name:** `REACT_APP_API_URL`
   - **Value:** `https://tms-foundation-api.onrender.com/api`
   - **Environment:** Production, Preview, Development
5. Click **Save**

#### 2.5 Redeploy

After adding environment variables:

```bash
vercel --prod
```

Or trigger redeploy from Vercel dashboard.

---

## 🔗 PART 3: Connect Frontend and Backend

### Step 1: Update CORS in Render

1. Go to Render Dashboard → Your Web Service
2. Go to **Environment** tab
3. Update `CORS_ALLOWED_ORIGINS`:
   ```
   CORS_ALLOWED_ORIGINS = https://tms-foundation-frontend.vercel.app
   ```
4. Click **Save Changes**
5. Render will automatically redeploy

### Step 2: Update Frontend API URL

1. Go to Vercel Dashboard → Your Project
2. Settings → Environment Variables
3. Update `REACT_APP_API_URL` to your Render API URL
4. Redeploy

---

## ✅ Verification

### Test Backend:
```bash
curl https://tms-foundation-api.onrender.com/api/health/
curl https://tms-foundation-api.onrender.com/api/programs/
```

### Test Frontend:
1. Visit your Vercel URL: `https://tms-foundation-frontend.vercel.app`
2. Check browser console for any errors
3. Verify API calls are working

---

## 🔧 Troubleshooting

### Backend Issues:

**Problem:** Database connection error
- **Solution:** Check DATABASE_URL in Render environment variables

**Problem:** Static files not loading
- **Solution:** Ensure `whitenoise` is in requirements.txt and middleware is configured

**Problem:** CORS errors
- **Solution:** Update CORS_ALLOWED_ORIGINS in Render to include your Vercel URL

### Frontend Issues:

**Problem:** API calls failing
- **Solution:** Check REACT_APP_API_URL in Vercel environment variables

**Problem:** Build fails
- **Solution:** Check build logs in Vercel dashboard

---

## 📝 Quick Reference

### Backend (Render):
- **URL:** `https://tms-foundation-api.onrender.com`
- **Dashboard:** https://dashboard.render.com
- **Logs:** Available in Render dashboard

### Frontend (Vercel):
- **URL:** `https://tms-foundation-frontend.vercel.app`
- **Dashboard:** https://vercel.com/dashboard
- **Logs:** Available in Vercel dashboard

---

## 🎉 You're Live!

Your full-stack application is now deployed:
- ✅ Backend API on Render
- ✅ Frontend on Vercel
- ✅ Connected and working

**Share your live URLs:**
- Frontend: `https://tms-foundation-frontend.vercel.app`
- Backend API: `https://tms-foundation-api.onrender.com/api`

---

## 📚 Additional Resources

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Django Deployment Guide](https://docs.djangoproject.com/en/stable/howto/deployment/)
- [React Deployment Guide](https://create-react-app.dev/docs/deployment/)

