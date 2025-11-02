# AI Medical Symptom Checker

Intelligent Healthcare at Your Fingertips

A modern, full-stack medical application that combines AI-powered symptom analysis with professional medical guidance. Built with React and Flask, featuring Google Gemini AI integration for intelligent medical conversations.

---

## Features

### Smart Symptom Analysis
Advanced pattern matching algorithm with comprehensive medical database, severity assessment, and treatment recommendations.

### AI Chat Assistant
Powered by Google Gemini AI with context-aware conversations, medical terminology support, and 24/7 availability.

### Medical Database
Extensive condition catalog with evidence-based treatments, searchable interface, and regular updates.

### Modern Interface
Fully responsive design with intuitive navigation, fast loading times, and mobile optimization.

### Indian Emergency Services Integration
Quick access to critical healthcare contacts including ambulance services, mental health support, and specialized helplines.

---

## Architecture

The application uses a modern separation of concerns with React handling the frontend (deployed on Vercel) and Flask powering the backend API (deployed on Render). The backend integrates with Google Gemini AI for intelligent medical conversations and queries a comprehensive CSV-based medical database.

### Tech Stack

**Frontend:** React 18, CSS3, Responsive Design

**Backend:** Flask 3.x, Gunicorn, CSV Database

**AI/ML:** Google Gemini AI, Pandas, Natural Language Processing

**Deployment:** Vercel (Frontend), Render (Backend), CORS enabled

---

## Project Structure

```
AI-Medical-Symptom-Checker/
│
├── backend/
│   ├── api.py                    Main API application
│   ├── requirements.txt          Python dependencies
│   ├── symptoms.csv              Medical database (1000+ conditions)
│   ├── .env                      Environment variables
│   └── render.yaml               Render deployment config
│
├── frontend/
│   ├── src/
│   │   ├── components/           Reusable React components
│   │   │   ├── SymptomChecker.js
│   │   │   ├── GeminiChat.js
│   │   │   ├── MedicalDatabase.js
│   │   │   └── EmergencyServices.js
│   │   ├── config/              Configuration files
│   │   │   └── api.js           API endpoint config
│   │   ├── App.css              Global styles
│   │   └── App.js               Main application
│   ├── public/                  Static assets
│   ├── package.json             Node dependencies
│   └── vercel.json              Vercel configuration
│
├── README.md
└── LICENSE
```

---

## Quick Deployment

### Option 1: Cloud Deployment (Recommended)

**Backend Deployment on Render:**

1. Create an account at render.com
2. Create a new Web Service and connect your GitHub repository
3. Configure build settings:
   - Root Directory: backend
   - Build Command: pip install -r requirements.txt
   - Start Command: gunicorn -b 0.0.0.0:$PORT api:app
4. Add environment variable:
   - GEMINI_API_KEY with your API key
5. Deploy

**Frontend Deployment on Vercel:**

1. Import your project at vercel.com
2. Configure settings:
   - Root Directory: frontend
   - Framework Preset: Create React App
3. Add environment variable:
   - REACT_APP_API_URL with your backend URL (e.g., https://your-backend.onrender.com)
4. Deploy

### Option 2: Local Development

**Step 1: Clone the repository**
```bash
git clone https://github.com/yourusername/ai-medical-symptom-checker.git
cd ai-medical-symptom-checker
```

**Step 2: Setup Backend**
```bash
cd backend
python -m venv venv
source venv/bin/activate
# On Windows: venv\Scripts\activate
pip install -r requirements.txt
echo "GEMINI_API_KEY=your_key_here" > .env
python api.py
```

**Step 3: Setup Frontend (in new terminal)**
```bash
cd frontend
npm install
echo "REACT_APP_API_URL=http://localhost:5000" > .env
npm start
```

Application will open at http://localhost:3000

---

## Environment Configuration

### Backend Environment Variables

Create a .env file in the backend directory:

```
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
FLASK_ENV=production
```

Get your Gemini API key from Google AI Studio: https://makersuite.google.com/app/apikey

### Frontend Environment Variables

For production deployment:
```
REACT_APP_API_URL=https://your-backend.onrender.com
```

For local development:
```
REACT_APP_API_URL=http://localhost:5000
```

---

## API Endpoints

**GET /** - Health check endpoint that returns API status

**POST /analyze** - Analyze symptoms and provide medical guidance
Request body: {"symptoms": "fever, cough, headache"}

**GET /api/conditions** - Retrieve all medical conditions from the database

**POST /api/gemini-chat** - AI-powered medical consultation
Request body: {"message": "What causes fever?"}

**GET /api/stats** - Get database statistics including total conditions

### Example API Usage

```javascript
// Analyze Symptoms
fetch('https://your-api.com/analyze', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ symptoms: 'fever, cough, headache' })
})

// AI Chat
fetch('https://your-api.com/api/gemini-chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: 'What causes fever?' })
})
```

---

## Indian Emergency Services

**108** - Advanced Medical Emergency - Emergency ambulance service

**102** - Government Ambulance - Basic medical transport

**104** - Medical Advice - Health helpline and blood bank information

**1097** - Maternal Care - Pregnancy and maternal health support

**14567** - Senior Citizen - Elderly health services helpline

**1800-599-0019** - Mental Health - KIRAN psychological support helpline

---

## Key Benefits

**Separate Deployments** - Better performance and reliability with independent scaling

**No Build Conflicts** - Frontend and backend deploy independently without interference

**Fast Loading Times** - Each component optimized for its specific platform

**Easy Scaling** - Scale frontend and backend independently based on demand

**Professional Setup** - Industry-standard architecture following best practices

**Cost-Effective** - Free tier available on both Vercel and Render platforms

---

## Development

### Prerequisites

- Node.js version 14 or higher and npm
- Python version 3.8 or higher
- Git for version control
- Google Gemini API Key

### Running Tests

Backend tests:
```bash
cd backend
pytest
```

Frontend tests:
```bash
cd frontend
npm test
```

### Code Style

Backend follows PEP 8 Python style guidelines

Frontend uses ESLint and Prettier for code formatting

---

## Contributing

We welcome contributions from the community. Here's how you can help:

1. Fork the repository to your GitHub account
2. Create your feature branch: git checkout -b feature/AmazingFeature
3. Commit your changes: git commit -m 'Add some AmazingFeature'
4. Push to the branch: git push origin feature/AmazingFeature
5. Open a Pull Request for review

### Contribution Guidelines

- Write clear, well-commented code
- Follow the existing code style and conventions
- Add tests for any new features
- Update documentation to reflect your changes

---

## Medical Disclaimer

IMPORTANT NOTICE

This application is designed for informational and educational purposes only. It is NOT a substitute for professional medical advice, diagnosis, or treatment.

Always seek the advice of qualified healthcare providers with any questions regarding medical conditions. Never disregard professional medical advice or delay seeking it because of information provided by this application.

In case of emergency, call your local emergency services immediately.

---

## License

MIT License

Copyright (c) 2025 AI Medical Symptom Checker

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

## Acknowledgments

- Google Gemini AI for intelligent medical conversation capabilities
- React team for the powerful frontend framework
- Flask community for the lightweight and flexible backend framework
- Medical professionals who reviewed and validated the database
- Open-source contributors and the developer community

---

## Support

**Email:** support@medicalchecker.com

**Issues:** Report bugs and request features at GitHub Issues

**Discussions:** Join community discussions at GitHub Discussions

---

Made with care for better healthcare accessibility

Star this repository if you found it helpful
