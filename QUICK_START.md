# 🚀 Quick Start Guide - How to Run

This guide shows you how to quickly run and test all the code examples in this assessment.

---

## 📋 Prerequisites

Before running, make sure you have:
- **Python 3.8+** installed
- **Node.js 16+** and **npm** installed
- **Django** project (for CORS and migration examples)

---

## 🎯 Option 1: View Assessment Only (No Setup Required)

If you just want to read the answers:
```bash
# Simply open and read:
ASSESSMENT.md    # Complete assessment answers
SUMMARY.md       # Executive summary
README.md        # Project overview
```

---

## 🐍 Option 2: Run Django Examples

### A. Django CORS Setup

#### Step 1: Install Dependencies
```bash
cd implementation/django_cors_setup
pip install -r requirements.txt
```

#### Step 2: Integrate into Your Django Project
1. Copy the CORS configuration from `settings.py` to your Django project's `settings.py`
2. Add `'corsheaders'` to `INSTALLED_APPS`
3. Add `'corsheaders.middleware.CorsMiddleware'` to `MIDDLEWARE` (before `CommonMiddleware`)

#### Step 3: Run Django Server
```bash
# In your Django project root
python manage.py runserver
```

#### Step 4: Test CORS (in another terminal)
```bash
# Test CORS with curl
curl -H "Origin: http://localhost:3000" \
     -H "Access-Control-Request-Method: GET" \
     -X OPTIONS \
     http://localhost:8000/api/programs/

# Or use Python
python -c "import requests; r = requests.options('http://localhost:8000/api/programs/', headers={'Origin': 'http://localhost:3000'}); print(r.headers.get('Access-Control-Allow-Origin'))"
```

---

### B. Django Migration Conflict Resolution

#### Step 1: Navigate to Script
```bash
cd implementation/django_migrations
```

#### Step 2: Run the Script
```bash
# Check for conflicts
python resolve_conflict.py --app programs --check

# Create merge migration
python resolve_conflict.py --app programs --merge

# Show migration status
python resolve_conflict.py --app programs --show

# Apply migrations
python resolve_conflict.py --app programs --apply
```

**Note:** This script needs to be run from within your Django project directory where `manage.py` exists.

---

## ⚛️ Option 3: Run React Examples

### Step 1: Install Dependencies
```bash
# From project root
npm install
```

### Step 2: Create a Simple Test App

Create `src/App.js`:
```jsx
import React from 'react';
import RegistrationForm from './implementation/react_state_management/useState-example';
// Or import ContextAPI or Redux examples

function App() {
  return (
    <div className="App">
      <h1>TMS Foundation Assessment - State Management Examples</h1>
      <RegistrationForm />
    </div>
  );
}

export default App;
```

### Step 3: Run React Development Server
```bash
npm start
```

This will:
- Start the React development server
- Open `http://localhost:3000` in your browser
- Show hot-reload for code changes

### Step 4: Test Different Examples

#### Test useState Example
```jsx
// In src/App.js
import RegistrationForm from './implementation/react_state_management/useState-example';

function App() {
  return <RegistrationForm />;
}
```

#### Test Context API Example
```jsx
// In src/App.js
import { AuthProvider } from './implementation/react_state_management/ContextAPI-example';
import Profile from './Profile'; // Your component

function App() {
  return (
    <AuthProvider>
      <Profile />
    </AuthProvider>
  );
}
```

#### Test Redux Example
```jsx
// First, set up Redux store (create src/store.js)
import { configureStore } from '@reduxjs/toolkit';
import programsReducer from './implementation/react_state_management/Redux-example';

export const store = configureStore({
  reducer: {
    programs: programsReducer,
  },
});

// In src/index.js
import { Provider } from 'react-redux';
import { store } from './store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

---

## 🔍 Option 4: Test Dynamic Search Component

### Step 1: Copy Files to Your React Project
```bash
# Copy the search component
cp implementation/dynamic_search/SearchComponent.jsx src/
cp implementation/dynamic_search/SearchComponent.css src/
```

### Step 2: Use in Your App
```jsx
// In src/App.js
import SearchComponent from './SearchComponent';
import './SearchComponent.css';

function App() {
  return (
    <div>
      <h1>TMS Foundation Portal</h1>
      <SearchComponent />
    </div>
  );
}
```

### Step 3: Update API Endpoint
Edit `SearchComponent.jsx` and update the `searchAPI` function to point to your backend:
```jsx
const searchAPI = async (query) => {
  const response = await fetch(`http://localhost:8000/api/search?q=${query}`);
  return response.json();
};
```

### Step 4: Run and Test
```bash
npm start
# Open http://localhost:3000
# Type in the search box to see real-time results
```

---

## 🧪 Quick Test Commands

### Test Django CORS
```bash
# Start Django server first
python manage.py runserver

# Then test (in another terminal)
curl -X GET http://localhost:8000/api/programs/ \
     -H "Origin: http://localhost:3000" \
     -v
```

### Test React Components
```bash
# Start React app
npm start

# Run tests (if configured)
npm test
```

### Test Migration Script
```bash
# In your Django project
cd implementation/django_migrations
python resolve_conflict.py --app your_app_name --check
```

---

## 📝 Environment Setup

### For Django (.env file)
```env
DJANGO_ENV=development
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
```

### For React (.env file in project root)
```env
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_ENV=development
```

---

## 🔧 Troubleshooting

### Issue: "Module not found" in React
**Solution:** Make sure you're importing from the correct path:
```jsx
// If files are in implementation folder
import Component from './implementation/react_state_management/useState-example';
```

### Issue: CORS errors in browser
**Solution:** 
1. Check Django CORS settings are correct
2. Ensure `CorsMiddleware` is before `CommonMiddleware`
3. Verify `CORS_ALLOWED_ORIGINS` includes your React URL

### Issue: Migration script not working
**Solution:** Run from your Django project root where `manage.py` exists:
```bash
cd /path/to/your/django/project
python implementation/django_migrations/resolve_conflict.py --app your_app --check
```

### Issue: React app won't start
**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

---

## ✅ Verification Checklist

Run through these to verify everything works:

- [ ] Django CORS: Server starts without errors
- [ ] Django CORS: curl test returns CORS headers
- [ ] React: `npm start` opens browser at localhost:3000
- [ ] React: useState example form works
- [ ] React: Search component displays and responds to input
- [ ] Migration script: Runs without errors (if Django project exists)

---

## 🎯 Quick Reference

| Component | Command | Port |
|-----------|---------|------|
| Django Server | `python manage.py runserver` | 8000 |
| React App | `npm start` | 3000 |
| Test CORS | `curl -H "Origin: http://localhost:3000" ...` | - |
| Migration Check | `python resolve_conflict.py --app app --check` | - |

---

## 📚 Need More Help?

- **Detailed Setup:** See `SETUP_GUIDE.md`
- **Assessment Answers:** See `ASSESSMENT.md`
- **Project Overview:** See `README.md`
- **Quick Index:** See `INDEX.md`

---

**Happy Coding! 🚀**

