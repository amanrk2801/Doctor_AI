# 🚀 Separate Deployment Guide

Deploy backend on **Render** and frontend on **Vercel** for optimal performance and reliability.

## 📋 **Project Structure**
```
├── backend/           # Flask API (Deploy to Render)
│   ├── api.py        # Main API file
│   ├── requirements.txt
│   ├── symptoms.csv
│   ├── .env
│   └── render.yaml
├── frontend/         # React App (Deploy to Vercel)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vercel.json
└── README.md
```

---

## 🔧 **Step 1: Deploy Backend to Render**

### **1.1 Prepare Backend**
```bash
cd backend
# Ensure all files are ready:
# - api.py
# - requirements.txt  
# - symptoms.csv
# - .env (with GEMINI_API_KEY)
```

### **1.2 Deploy on Render**
1. **Go to [render.com](https://render.com)**
2. **Create Web Service**
3. **Connect GitHub** repository
4. **Configure Service:**
   - **Name**: `medical-api`
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn -b 0.0.0.0:$PORT api:app`

### **1.3 Environment Variables**
Add in Render dashboard:
- `GEMINI_API_KEY` = `your_gemini_api_key_here`
- `PYTHON_VERSION` = `3.11.9`

### **1.4 Get Backend URL**
After deployment, note your backend URL:
- Example: `https://medical-api-xyz.onrender.com`

---

## ⚡ **Step 2: Deploy Frontend to Vercel**

### **2.1 Prepare Frontend**
```bash
cd frontend
# Ensure all files are ready:
# - src/ directory with components
# - package.json
# - vercel.json
```

### **2.2 Deploy on Vercel**
1. **Go to [vercel.com](https://vercel.com)**
2. **Import Project** from GitHub
3. **Configure Project:**
   - **Framework Preset**: `Create React App`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

### **2.3 Environment Variables**
Add in Vercel dashboard:
- `REACT_APP_API_URL_BOT` = `https://your-backend-url.onrender.com`

### **2.4 Deploy**
- Click **Deploy**
- Vercel will build and deploy automatically

---

## 🌐 **Step 3: Connect Frontend to Backend**

### **3.1 Update API URL**
In Vercel dashboard:
1. **Settings → Environment Variables**
2. **Add**: `REACT_APP_API_URL` = `https://medical-api-xyz.onrender.com`
3. **Redeploy** the frontend

### **3.2 Test Connection**
1. **Open your Vercel app URL**
2. **Test symptom checker**
3. **Test AI chat**
4. **Check browser console** for any CORS errors

---

## ✅ **Expected Results**

### **Backend (Render)**
- ✅ API endpoints working
- ✅ CORS configured for Vercel
- ✅ Gemini AI integrated
- ✅ Health check at root URL

### **Frontend (Vercel)**
- ✅ React app loads fast
- ✅ Connects to backend API
- ✅ All features working
- ✅ Mobile responsive

---

## 🔧 **Troubleshooting**

### **Backend Issues:**
```bash
# Check logs in Render dashboard
# Common fixes:
- Ensure requirements.txt is correct
- Check environment variables
- Verify symptoms.csv exists
```

### **Frontend Issues:**
```bash
# Check browser console
# Common fixes:
- Verify REACT_APP_API_URL is set
- Check CORS configuration
- Ensure API endpoints are correct
```

### **CORS Issues:**
If you get CORS errors, update backend `api.py`:
```python
CORS(app, origins=["https://your-vercel-app.vercel.app"])
```

---

## 🎯 **Benefits of Separate Deployment**

✅ **Better Performance** - Each service optimized for its purpose  
✅ **Independent Scaling** - Scale frontend/backend separately  
✅ **Faster Builds** - No compilation conflicts  
✅ **Better Reliability** - If one fails, other still works  
✅ **Easier Debugging** - Clear separation of concerns  

---

## 📱 **Final URLs**

After successful deployment:
- **Backend API**: `https://medical-api-xyz.onrender.com`
- **Frontend App**: `https://medical-checker-abc.vercel.app`

Your AI Medical Symptom Checker is now live with professional-grade deployment! 🎉