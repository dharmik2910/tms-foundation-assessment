# Setup Guide - TMS Foundation Assessment

This guide helps you quickly set up and run the practical implementations provided in this assessment.

---

## 🚀 Quick Setup

### Option 1: View Assessment Only
Simply read `ASSESSMENT.md` - it contains all answers and explanations.

### Option 2: Run Code Examples
Follow the setup instructions below for each component.

---

## 📦 Django CORS Setup

### Installation
```bash
cd implementation/django_cors_setup
pip install -r requirements.txt
```

### Configuration
1. Copy the CORS settings from `settings.py` to your Django project's `settings.py`
2. Add `corsheaders` to `INSTALLED_APPS`
3. Add `CorsMiddleware` to `MIDDLEWARE` (before `CommonMiddleware`)
4. Configure `CORS_ALLOWED_ORIGINS` for your domains

### Testing
```bash
# Start Django server
python manage.py runserver

# In another terminal, test CORS
curl -H "Origin: http://localhost:3000" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: X-Requested-With" \
     -X OPTIONS \
     http://localhost:8000/api/programs/
```

---

## ⚛️ React State Management Examples

### Installation
```bash
npm install
```

### Running Examples

#### 1. useState Example
```bash
# Copy useState-example.jsx to your React project
# Import and use in your component
import RegistrationForm from './useState-example';
```

#### 2. Context API Example
```bash
# Copy ContextAPI-example.jsx
# Wrap your app with providers:
<AuthProvider>
  <ThemeProvider>
    <App />
  </ThemeProvider>
</AuthProvider>
```

#### 3. Redux Example
```bash
# Requires Redux Toolkit
npm install @reduxjs/toolkit react-redux

# Copy Redux-example.jsx
# Set up store and wrap app with Provider
```

### Testing State Management
```bash
# Start React dev server
npm start

# Open browser to http://localhost:3000
# Test each example component
```

---

## 🔍 Dynamic Search Component

### Installation
```bash
# Copy SearchComponent.jsx and SearchComponent.css to your project
# No additional dependencies required (uses React hooks only)
```

### Usage
```jsx
import SearchComponent from './SearchComponent';

function App() {
  return (
    <div>
      <SearchComponent />
    </div>
  );
}
```

### Customization
- Update `searchAPI` function to connect to your backend
- Modify filters to match your data structure
- Customize styling in `SearchComponent.css`

### Features Demonstrated
- ✅ Real-time search with debouncing
- ✅ Keyboard navigation (Arrow keys, Enter, Escape)
- ✅ Category filtering
- ✅ Accessible design (ARIA labels)
- ✅ Responsive layout

---

## 🗄️ Django Migration Conflict Resolution

### Installation
```bash
cd implementation/django_migrations
# No additional packages required (uses Django management commands)
```

### Usage

#### Check for Conflicts
```bash
python resolve_conflict.py --app programs --check
```

#### Create Merge Migration
```bash
python resolve_conflict.py --app programs --merge
```

#### Apply Migrations
```bash
python resolve_conflict.py --app programs --apply
```

#### Squash Migrations
```bash
python resolve_conflict.py --app programs --squash 0001 0010
```

#### Show Migration Status
```bash
python resolve_conflict.py --app programs --show
```

### Manual Resolution Steps
1. Identify conflicting migrations: `python manage.py showmigrations`
2. Create merge: `python manage.py makemigrations --merge`
3. Review merge migration file
4. Apply: `python manage.py migrate`

---

## 🧪 Testing the Implementations

### Django CORS Test
```python
# test_cors.py
import requests

response = requests.options(
    'http://localhost:8000/api/programs/',
    headers={
        'Origin': 'http://localhost:3000',
        'Access-Control-Request-Method': 'GET',
    }
)
print(response.headers.get('Access-Control-Allow-Origin'))
```

### React Component Test
```jsx
// Test SearchComponent
import { render, screen, fireEvent } from '@testing-library/react';
import SearchComponent from './SearchComponent';

test('search input updates query', () => {
  render(<SearchComponent />);
  const input = screen.getByPlaceholderText(/search/i);
  fireEvent.change(input, { target: { value: 'workshop' } });
  expect(input.value).toBe('workshop');
});
```

---

## 📋 Environment Variables

### Django (.env)
```
DJANGO_ENV=development
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
```

### React (.env)
```
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_ENV=development
```

---

## 🔧 Troubleshooting

### CORS Issues
- **Problem:** "Access-Control-Allow-Origin" header missing
- **Solution:** Ensure `CorsMiddleware` is before `CommonMiddleware`

### Migration Conflicts
- **Problem:** "Conflicting migrations detected"
- **Solution:** Use `--merge` flag or manually resolve dependencies

### React State Not Updating
- **Problem:** Component doesn't re-render
- **Solution:** Check if state is properly set, use `useCallback` for functions

### Search Component Not Working
- **Problem:** No results showing
- **Solution:** Update `searchAPI` function to match your backend endpoint

---

## 📚 Additional Resources

- [Django CORS Headers](https://github.com/adamchainz/django-cors-headers)
- [React Hooks Documentation](https://react.dev/reference/react)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Django Migrations](https://docs.djangoproject.com/en/stable/topics/migrations/)

---

## ✅ Verification Checklist

- [ ] Django CORS configured and tested
- [ ] React state management examples working
- [ ] Search component functional
- [ ] Migration script tested
- [ ] All dependencies installed
- [ ] Environment variables set

---

**Need Help?** Review the detailed explanations in `ASSESSMENT.md` or check the code comments in each implementation file.




