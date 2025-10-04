# 🏥 AI Medical Symptom Checker

A modern full-stack medical application with **React frontend** and **Flask backend** that analyzes symptoms using AI and provides medical guidance. Features **Gemini AI** integration for intelligent medical conversations.

## 🚀 **Features**

- **🔍 Symptom Analysis** - Advanced matching against medical database
- **🤖 AI Chat Assistant** - Powered by Google Gemini AI
- **📚 Medical Database** - Browse conditions and treatments
- **📱 Mobile Responsive** - Works on all devices
- **🇮🇳 Indian Emergency Services** - Complete contact information
- **⚡ Fast & Reliable** - Separate deployments for optimal performance

## 🏗️ **Architecture**

```
┌─────────────────┐    API Calls    ┌─────────────────┐
│   React Frontend │ ◄──────────────► │   Flask Backend │
│   (Vercel)      │                 │   (Render)      │
│                 │                 │                 │
│ • UI Components │                 │ • API Endpoints │
│ • State Management│                │ • AI Integration│
│ • Routing       │                 │ • Data Processing│
└─────────────────┘                 └─────────────────┘
```

## 📁 **Project Structure**

```
├── 📁 backend/              # Flask API (Deploy to Render)
│   ├── api.py              # Main API server
│   ├── requirements.txt    # Python dependencies
│   ├── symptoms.csv        # Medical database
│   ├── .env               # Environment variables
│   └── render.yaml        # Render deployment config
├── 📁 frontend/            # React App (Deploy to Vercel)
│   ├── 📁 src/
│   │   ├── 📁 components/  # React components
│   │   ├── 📁 config/     # API configuration
│   │   └── App.js         # Main app
│   ├── 📁 public/         # Static files
│   ├── package.json       # Node dependencies
│   └── vercel.json        # Vercel deployment config
└── README.md              # This file
```

## 🚀 **Quick Deployment**

### **Option 1: Separate Deployment (Recommended)**

**Backend → Render.com:**
1. Create Web Service on [render.com](https://render.com)
2. Connect GitHub, set root directory to `backend`
3. Build: `pip install -r requirements.txt`
4. Start: `gunicorn -b 0.0.0.0:$PORT api:app`
5. Add env var: `GEMINI_API_KEY`

**Frontend → Vercel:**
1. Import project on [vercel.com](https://vercel.com)
2. Set root directory to `frontend`
3. Add env var: `REACT_APP_API_URL=https://your-backend-url`
4. Deploy!

### **Option 2: Local Development**

```bash
# Backend
cd backend
pip install -r requirements.txt
python api.py

# Frontend (new terminal)
cd frontend
npm install
npm start
```

## 🔑 **Environment Setup**

### **Backend (.env)**
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### **Frontend (Vercel)**
```env
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

## 🎯 **API Endpoints**

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Health check |
| `/analyze` | POST | Analyze symptoms |
| `/api/conditions` | GET | Get all conditions |
| `/api/gemini-chat` | POST | AI chat |
| `/api/stats` | GET | Database stats |

## 🌟 **Key Benefits**

✅ **Separate Deployments** - Better performance & reliability  
✅ **No Build Conflicts** - Frontend & backend deploy independently  
✅ **Fast Loading** - Optimized for each platform  
✅ **Easy Scaling** - Scale components separately  
✅ **Professional Setup** - Industry-standard architecture  

## 🚨 **Indian Emergency Services**

- **108** - Advanced Medical Emergency
- **102** - Government Ambulance  
- **104** - Medical Advice & Blood Bank
- **1097** - Pregnancy/Maternal Helpline
- **14567** - Senior Citizen Helpline
- **1800-599-0019** - Mental Health (KIRAN)

## 📖 **Detailed Deployment Guide**

See [DEPLOYMENT-SEPARATE.md](DEPLOYMENT-SEPARATE.md) for complete step-by-step instructions.

## ⚠️ **Medical Disclaimer**

This application is for informational purposes only and should not replace professional medical advice. Always consult qualified healthcare providers for proper diagnosis and treatment.

## 🤝 **Contributing**

1. Fork the repository
2. Create feature branch
3. Make changes
4. Submit pull request

## 📄 **License**

MIT License - see LICENSE file for details.

---

**🎉 Ready to deploy your AI medical assistant!**