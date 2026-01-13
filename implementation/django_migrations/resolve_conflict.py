"""
Django Migration Conflict Resolution Script
This script helps resolve migration conflicts in Django projects.

Usage:
    python resolve_conflict.py --app programs --merge
    python resolve_conflict.py --app programs --squash 0001 0010
"""

import os
import sys
import django
from pathlib import Path

# Setup Django
BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE_DIR))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'your_project.settings')
django.setup()

from django.core.management import call_command
from django.db import connection
import argparse


def show_migrations(app_name):
    """Display current migration status"""
    print(f"\n=== Migration Status for {app_name} ===")
    call_command('showmigrations', app_name, verbosity=2)


def merge_migrations(app_name):
    """Create a merge migration for conflicting branches"""
    print(f"\n=== Merging migrations for {app_name} ===")
    try:
        call_command('makemigrations', app_name, merge=True, interactive=True)
        print("✓ Merge migration created successfully")
    except Exception as e:
        print(f"✗ Error creating merge migration: {e}")
        return False
    return True


def squash_migrations(app_name, start, end):
    """Squash migrations from start to end"""
    print(f"\n=== Squashing migrations {start} to {end} for {app_name} ===")
    try:
        call_command('squashmigrations', app_name, start, end)
        print("✓ Migrations squashed successfully")
    except Exception as e:
        print(f"✗ Error squashing migrations: {e}")
        return False
    return True


def check_conflicts(app_name):
    """Check for migration conflicts"""
    print(f"\n=== Checking for conflicts in {app_name} ===")
    try:
        # Try to make migrations - will show conflicts if any
        call_command('makemigrations', app_name, dry_run=True, check=True)
        print("✓ No conflicts detected")
        return False
    except SystemExit:
        # makemigrations exits with code 1 if conflicts exist
        print("⚠ Conflicts detected!")
        return True


def apply_migrations(app_name):
    """Apply pending migrations"""
    print(f"\n=== Applying migrations for {app_name} ===")
    try:
        call_command('migrate', app_name, verbosity=2)
        print("✓ Migrations applied successfully")
    except Exception as e:
        print(f"✗ Error applying migrations: {e}")
        return False
    return True


def fake_migration(app_name, migration_name):
    """Mark a migration as applied without running it"""
    print(f"\n=== Faking migration {migration_name} for {app_name} ===")
    try:
        call_command('migrate', app_name, migration_name, fake=True)
        print("✓ Migration marked as applied")
    except Exception as e:
        print(f"✗ Error faking migration: {e}")
        return False
    return True


def main():
    parser = argparse.ArgumentParser(
        description='Resolve Django migration conflicts'
    )
    parser.add_argument(
        '--app',
        required=True,
        help='App name (e.g., programs, events)'
    )
    parser.add_argument(
        '--check',
        action='store_true',
        help='Check for conflicts'
    )
    parser.add_argument(
        '--merge',
        action='store_true',
        help='Create merge migration'
    )
    parser.add_argument(
        '--squash',
        nargs=2,
        metavar=('START', 'END'),
        help='Squash migrations from START to END'
    )
    parser.add_argument(
        '--apply',
        action='store_true',
        help='Apply pending migrations'
    )
    parser.add_argument(
        '--fake',
        metavar='MIGRATION',
        help='Fake a migration (mark as applied without running)'
    )
    parser.add_argument(
        '--show',
        action='store_true',
        help='Show migration status'
    )

    args = parser.parse_args()

    if args.show:
        show_migrations(args.app)

    if args.check:
        has_conflicts = check_conflicts(args.app)
        if has_conflicts:
            print("\n💡 Tip: Use --merge to create a merge migration")
            sys.exit(1)

    if args.merge:
        if merge_migrations(args.app):
            if args.apply:
                apply_migrations(args.app)

    if args.squash:
        start, end = args.squash
        if squash_migrations(args.app, start, end):
            print("\n⚠ Remember to:")
            print("  1. Review the squashed migration")
            print("  2. Test it on a development database")
            print("  3. Apply it to all environments")
            print("  4. After all environments have it, delete old migrations")

    if args.fake:
        fake_migration(args.app, args.fake)

    if args.apply and not args.merge:
        apply_migrations(args.app)


if __name__ == '__main__':
    main()




