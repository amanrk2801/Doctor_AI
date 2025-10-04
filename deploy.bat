@echo off
REM AI Medical Symptom Checker - Quick Deployment Script (Windows)
echo 🏥 AI Medical Symptom Checker - Deployment Script
echo ==================================================

REM Check if we're in the right directory
if not exist "frontend" (
    echo ❌ Error: Please run this script from the project root directory
    exit /b 1
)
if not exist "backend" (
    echo ❌ Error: Please run this script from the project root directory
    exit /b 1
)

echo 📦 Installing backend dependencies...
cd backend
pip install -r requirements.txt
if errorlevel 1 (
    echo ❌ Failed to install backend dependencies
    exit /b 1
)

echo 📦 Installing frontend dependencies...
cd ..\frontend
npm install
if errorlevel 1 (
    echo ❌ Failed to install frontend dependencies
    exit /b 1
)

echo 🔨 Building frontend...
npm run build
if errorlevel 1 (
    echo ❌ Failed to build frontend
    exit /b 1
)

echo 📁 Copying build to backend...
xcopy /E /I build ..\backend\build
if errorlevel 1 (
    echo ❌ Failed to copy build files
    exit /b 1
)

echo ✅ Deployment preparation complete!
echo.
echo 🚀 To start the application:
echo    cd backend
echo    python api.py
echo.
echo 🌐 Then open: http://localhost:8080
echo.
echo 💡 For production deployment, see DEPLOYMENT.md

cd ..