@echo off
echo ===================================================
echo Recreating Python Virtual Environment (venv)
echo ===================================================

cd /d "%~dp0"

echo [1/4] Deleting corrupted venv folder...
if exist venv (
    rmdir /s /q venv
)

echo [2/4] Creating new virtual environment...
"C:\Users\Admin\AppData\Local\Programs\Python\Python312\python.exe" -m venv venv

if errorlevel 1 (
    echo Error: Failed to create virtual environment!
    pause
    exit /b 1
)

echo [3/4] Upgrading pip...
call venv\Scripts\activate.bat
python -m pip install --upgrade pip

echo [4/4] Installing dependencies from requirements.txt...
pip install -r requirements.txt

echo ===================================================
echo Virtual environment recreated successfully!
echo You can now run: python manage.py runserver
echo ===================================================
pause
