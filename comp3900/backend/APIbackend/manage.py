#!/usr/bin/env python
"""
    Django's command-line utility for administrative tasks.
    Run it boys.
    Execute all commands from backend/APIbackend To initialise: Install the required dependencies, 
    then run python manage.py makemigrations && python manage.py migrate This initialises the database 
    (currently just an sqlite3 file)
    
    To run the backend: python manage.py runserver

    To reset the database: 
        find . -path "/migrations/.py" -not -name "init.py" -delete && find . -path "/migrations/.pyc" -delete  
"""
import os
import sys


def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'APIbackend.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
