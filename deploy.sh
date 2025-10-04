#!/bin/bash

# AI Medical Symptom Checker - Quick Deployment Script
echo "🏥 AI Medical Symptom Checker - Deployment Script"
echo "=================================================="

# Check if we're in the right directory
if [ ! -d "frontend" ] || [ ! -d "backend" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "📦 Installing backend dependencies..."
cd backend
pip install -r requirements.txt
if [ $? -ne 0 ]; then
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

echo "🔨 Building frontend..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Failed to build frontend"
    exit 1
fi

echo "📁 Copying build to backend..."
cp -r build ../backend/
if [ $? -ne 0 ]; then
    echo "❌ Failed to copy build files"
    exit 1
fi

echo "✅ Deployment preparation complete!"
echo ""
echo "🚀 To start the application:"
echo "   cd backend"
echo "   python api.py"
echo ""
echo "🌐 Then open: http://localhost:8080"
echo ""
echo "💡 For production deployment, see DEPLOYMENT.md"