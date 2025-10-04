# AI Medical Symptom Checker

A modern full-stack web application with React frontend and Flask backend that analyzes medical symptoms using AI and provides possible conditions and treatments. Features Gemini AI integration for intelligent medical conversations.

## 🚀 Features

- **React Frontend**: Modern, responsive UI with Bootstrap styling
- **AI-Powered Chat**: Gemini AI integration for intelligent medical conversations
- **Symptom Analysis**: Advanced symptom matching against medical database
- **Condition Database**: Browse and search medical conditions
- **Real-time Chat**: Interactive AI assistant for medical queries
- **Mobile Responsive**: Works perfectly on all devices
- **Indian Medical Services**: Complete emergency contact information

## 🛠️ Tech Stack

**Frontend:**
- React 18
- React Bootstrap
- React Router
- Axios for API calls
- Font Awesome icons

**Backend:**
- Flask with CORS support
- Pandas for data processing
- Google Generative AI (Gemini)
- Python-dotenv for environment management

## 📁 Project Structure

```
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── App.js         # Main React app
│   │   └── index.js       # React entry point
│   ├── public/            # Static files
│   └── package.json       # Frontend dependencies
├── backend/               # Flask backend
│   ├── api.py            # Main Flask API
│   ├── symptoms.csv      # Medical database
│   ├── requirements.txt  # Backend dependencies
│   └── .env             # Environment variables
└── README.md            # This file
```

## 📋 Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn
- Gemini API key (optional, for AI chat feature)

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone <repository-url>
cd ai-medical-symptom-checker
```

### 2. Setup Backend

```bash
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Create environment file for Gemini AI (optional)
# Add your GEMINI_API_KEY to .env file
```

### 3. Setup Frontend

```bash
cd ../frontend

# Install Node.js dependencies
npm install

# Build the React app
npm run build
```

### 4. Run the Application

```bash
# Start the Flask backend (from backend directory)
cd ../backend
python api.py
```

The application will be available at `http://localhost:8080`

### 5. Development Mode (Optional)

For frontend development with hot reload:

```bash
# Terminal 1: Start backend (from backend directory)
cd backend
python api.py

# Terminal 2: Start React dev server (from frontend directory)
cd frontend
npm start
```

React dev server will run at `http://localhost:3000` with proxy to backend.

## 🔑 Gemini AI Setup

1. Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add to `backend/.env` file: `GEMINI_API_KEY=your_api_key_here`
3. Restart the backend

## 📱 Usage

### Basic Symptom Checker
1. Go to the Home page
2. Enter symptoms separated by commas or use quick buttons
3. Get instant analysis with possible conditions and treatments

### AI Chat Assistant
1. Click on "AI Chat" in the navigation
2. Have a conversation with the AI medical assistant
3. Ask questions about symptoms, conditions, or general health

### Browse Conditions
1. Visit the "Conditions" page
2. Search through the medical database
3. View all available conditions and treatments

## 🔌 API Endpoints

- `POST /analyze` - Analyze symptoms
- `GET /api/conditions` - Get all conditions
- `POST /api/gemini-chat` - Chat with AI assistant
- `GET /api/stats` - Get database statistics
- `POST /webhook` - Legacy webhook (backward compatibility)

## 🚨 Emergency Services (India)

The app includes comprehensive Indian medical service numbers:

- **108** - Advanced Medical Emergency
- **102** - Government Ambulance
- **104** - Medical Advice & Blood Bank
- **1097** - Pregnancy/Maternal & AIDS Helpline
- **14567** - Senior Citizen Helpline
- **1800-599-0019** - Mental Health (KIRAN)

## 🚀 Deployment

### Local Production

```bash
# Build frontend
cd frontend
npm run build

# Copy build to backend (optional)
cp -r build ../backend/

# Run backend
cd ../backend
python api.py
```

### Cloud Deployment

The app is configured for deployment on platforms like:
- **Render.com**: Use the included configuration
- **Heroku**: Deploy backend and frontend separately
- **Vercel**: Frontend deployment with API routes
- **Docker**: Containerized deployment

## ⚠️ Medical Disclaimer

This application is for informational and educational purposes only. It should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of qualified healthcare providers with any questions regarding medical conditions.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues:
1. Check the console for error messages
2. Ensure all dependencies are installed
3. Verify your Gemini API key (if using AI chat)
4. Open an issue on GitHub with details

## 🔧 Development Notes

- Frontend runs on port 3000 (development)
- Backend runs on port 8080
- API endpoints are prefixed with `/api/`
- Fallback AI responses work without Gemini API
- CORS is enabled for cross-origin requests