# 🚀 Deployment Guide - AI Medical Symptom Checker

This guide covers multiple deployment options for your full-stack medical application.

## 📋 Prerequisites

- Git repository with your code
- Gemini API key (optional, for AI features)
- Basic understanding of your chosen platform

---

## 🌐 Option 1: Render.com (Recommended - Free Tier Available)

### Step 1: Prepare Your Repository
```bash
# Ensure your code is pushed to GitHub/GitLab
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Deploy on Render
1. **Sign up** at [render.com](https://render.com)
2. **Connect GitHub** - Link your repository
3. **Create Web Service**:
   - Choose your repository
   - Name: `ai-medical-checker`
   - Environment: `Python 3`
   - Build Command: 
     ```bash
     cd backend && pip install -r requirements.txt && cd ../frontend && npm install && npm run build && cp -r build ../backend/
     ```
   - Start Command: 
     ```bash
     cd backend && gunicorn -b 0.0.0.0:$PORT api:app
     ```

### Step 3: Environment Variables
Add in Render dashboard:
- `GEMINI_API_KEY` = `your_gemini_api_key_here`
- `NODE_ENV` = `production`

### Step 4: Deploy
- Click **Deploy** - Render will build and deploy automatically
- Your app will be live at: `https://ai-medical-checker.onrender.com`

---

## 🔷 Option 2: Heroku (Popular Platform)

### Step 1: Install Heroku CLI
```bash
# Download from: https://devcenter.heroku.com/articles/heroku-cli
heroku --version
```

### Step 2: Create Heroku Apps
```bash
# Login to Heroku
heroku login

# Create app
heroku create ai-medical-checker

# Set environment variables
heroku config:set GEMINI_API_KEY=your_gemini_api_key_here
heroku config:set NODE_ENV=production
```

### Step 3: Create Procfile
```bash
# Create in root directory
echo "web: cd backend && gunicorn -b 0.0.0.0:\$PORT api:app" > Procfile
```

### Step 4: Create Build Script
Create `package.json` in root:
```json
{
  "name": "ai-medical-checker",
  "scripts": {
    "build": "cd frontend && npm install && npm run build && cp -r build ../backend/",
    "heroku-postbuild": "npm run build"
  },
  "engines": {
    "node": "18.x",
    "npm": "9.x"
  }
}
```

### Step 5: Deploy
```bash
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

---

## ⚡ Option 3: Vercel (Frontend) + Railway (Backend)

### Frontend on Vercel:

1. **Sign up** at [vercel.com](https://vercel.com)
2. **Import project** from GitHub
3. **Configure**:
   - Framework: `Create React App`
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`

### Backend on Railway:

1. **Sign up** at [railway.app](https://railway.app)
2. **Deploy from GitHub**
3. **Configure**:
   - Root Directory: `backend`
   - Start Command: `python api.py`
4. **Add Environment Variables**:
   - `GEMINI_API_KEY`
   - `PORT` = `8080`

### Update Frontend API URL:
In `frontend/package.json`, change proxy to your Railway backend URL.

---

## 🐳 Option 4: Docker Deployment

### Step 1: Create Dockerfiles

**Backend Dockerfile** (`backend/Dockerfile`):
```dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 8080

CMD ["gunicorn", "-b", "0.0.0.0:8080", "api:app"]
```

**Frontend Dockerfile** (`frontend/Dockerfile`):
```dockerfile
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Step 2: Docker Compose
Create `docker-compose.yml` in root:
```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "8080:8080"
    environment:
      - GEMINI_API_KEY=${GEMINI_API_KEY}
    
  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    depends_on:
      - backend
```

### Step 3: Deploy
```bash
# Local deployment
docker-compose up --build

# Or deploy to any Docker-compatible platform
```

---

## 🌍 Option 5: DigitalOcean App Platform

### Step 1: Create App Spec
Create `.do/app.yaml`:
```yaml
name: ai-medical-checker
services:
- name: backend
  source_dir: backend
  github:
    repo: your-username/your-repo
    branch: main
  run_command: gunicorn -b 0.0.0.0:8080 api:app
  environment_slug: python
  instance_count: 1
  instance_size_slug: basic-xxs
  envs:
  - key: GEMINI_API_KEY
    value: your_api_key_here

- name: frontend
  source_dir: frontend
  github:
    repo: your-username/your-repo
    branch: main
  build_command: npm run build
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
```

### Step 2: Deploy
1. Go to [DigitalOcean Apps](https://cloud.digitalocean.com/apps)
2. Create app from GitHub
3. Use the app spec configuration

---

## 🔧 Local Production Setup

### Step 1: Build Frontend
```bash
cd frontend
npm install
npm run build
```

### Step 2: Copy Build to Backend
```bash
cp -r frontend/build backend/
```

### Step 3: Run Backend
```bash
cd backend
pip install -r requirements.txt
python api.py
```

### Step 4: Access Application
- Open: `http://localhost:8080`

---

## 🔑 Environment Variables Setup

For all deployments, set these environment variables:

| Variable | Value | Required |
|----------|-------|----------|
| `GEMINI_API_KEY` | Your Gemini API key | Optional |
| `NODE_ENV` | `production` | Recommended |
| `PORT` | `8080` (or platform default) | Platform dependent |

---

## 🚨 Important Notes

### Security:
- Never commit API keys to Git
- Use environment variables for sensitive data
- Enable HTTPS in production

### Performance:
- Frontend is built and served by backend
- Gemini API has rate limits
- Fallback responses work without API

### Monitoring:
- Check application logs for errors
- Monitor API usage and quotas
- Set up health checks if available

---

## 🆘 Troubleshooting

### Common Issues:

1. **Build Fails**:
   - Check Node.js and Python versions
   - Verify all dependencies are listed
   - Check build commands are correct

2. **API Not Working**:
   - Verify environment variables
   - Check CORS settings
   - Ensure backend is running

3. **Frontend Not Loading**:
   - Check build output directory
   - Verify static file serving
   - Check routing configuration

### Getting Help:
- Check platform-specific documentation
- Review application logs
- Test locally first
- Check API quotas and limits

---

## 🎉 Success!

Once deployed, your AI Medical Symptom Checker will be live and accessible worldwide! 

**Features Available:**
✅ Symptom analysis and matching  
✅ AI-powered medical chat  
✅ Medical conditions database  
✅ Indian emergency services info  
✅ Mobile-responsive design  

Remember to always include proper medical disclaimers and encourage users to consult healthcare professionals!