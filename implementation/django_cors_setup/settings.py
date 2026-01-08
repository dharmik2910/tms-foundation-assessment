"""
Django CORS Configuration Example
This file demonstrates proper CORS setup for Django REST Framework
"""

# ... existing Django settings ...

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Third-party apps
    'rest_framework',
    'corsheaders',  # Add django-cors-headers
    
    # Your apps
    'programs',
    'events',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',  # Must be early, before CommonMiddleware
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# CORS Configuration
# ==================

# Development: Allow specific origins
CORS_ALLOWED_ORIGINS = [
    "https://bharatyuva.org",
    "https://www.bharatyuva.org",
    "http://localhost:3000",  # React dev server
    "http://127.0.0.1:3000",
]

# Alternative: Use regex patterns for dynamic origins
# CORS_ALLOWED_ORIGIN_REGEXES = [
#     r"^https://.*\.bharatyuva\.org$",
# ]

# NEVER use this in production - allows all origins
# CORS_ALLOW_ALL_ORIGINS = True  # Only for development!

# Allow credentials (cookies, authorization headers)
CORS_ALLOW_CREDENTIALS = True

# Allowed HTTP methods
CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]

# Allowed headers
CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]

# Cache preflight requests (OPTIONS) for 1 hour
CORS_PREFLIGHT_MAX_AGE = 3600

# Expose headers to frontend
CORS_EXPOSE_HEADERS = [
    'content-type',
    'x-total-count',  # For pagination
]

# REST Framework Configuration
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.TokenAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
}

# Environment-specific settings
import os
from django.core.exceptions import ImproperlyConfigured

def get_env_variable(var_name, default=None):
    """Get environment variable or return default"""
    try:
        return os.environ[var_name]
    except KeyError:
        if default is not None:
            return default
        error_msg = f"Set the {var_name} environment variable"
        raise ImproperlyConfigured(error_msg)

# Production settings
if os.environ.get('DJANGO_ENV') == 'production':
    CORS_ALLOWED_ORIGINS = [
        "https://bharatyuva.org",
        "https://www.bharatyuva.org",
    ]
    CORS_ALLOW_CREDENTIALS = True
    DEBUG = False
else:
    # Development settings
    CORS_ALLOWED_ORIGINS = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]
    DEBUG = True


