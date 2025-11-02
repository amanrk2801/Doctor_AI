from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS, cross_origin
import random
import os
import csv
from datetime import datetime
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
# Allow common headers and methods in preflight so the frontend can send JSON requests from localhost:3000
CORS(
    app,
    # allow localhost dev and the deployed Vercel frontend origin
    resources={r"/*": {"origins": ["http://localhost:3000", "https://doctor-ai-phi-three.vercel.app"]}},
    supports_credentials=True,
    allow_headers=["Content-Type", "Authorization", "Accept"],
    methods=["GET", "POST", "OPTIONS"]
)

# Configure Gemini AI
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
model = None
gemini_error = None

if GEMINI_API_KEY:
    try:
        genai.configure(api_key=GEMINI_API_KEY)
        # Try with a simpler, more available model
        model = genai.GenerativeModel('gemini-flash-latest')
        print("✅ Gemini AI configured successfully")
    except Exception as e:
        model = None
        gemini_error = str(e)
        print(f"❌ Error configuring Gemini AI: {e}")
        if "quota" in str(e).lower() or "429" in str(e):
            print("💡 Tip: Your API key has exceeded its quota. The app will work with basic symptom checking.")
else:
    print("Warning: GEMINI_API_KEY not found. AI chat will use fallback responses.")

# Load data from local CSV file using built-in csv module
import csv
data = []
try:
    with open('symptoms.csv', 'r') as file:
        reader = csv.DictReader(file)
        data = list(reader)
except FileNotFoundError:
    # Create minimal fallback data
    data = [
        {
            'symptoms_1': 'fever', 'symptoms_2': 'headache', 'symptoms_3': 'cough',
            'symptoms_4': 'fatigue', 'symptoms_5': 'body aches',
            'conclusion': 'Common Cold', 'treatment': 'Rest and fluids'
        },
        {
            'symptoms_1': 'nausea', 'symptoms_2': 'vomiting', 'symptoms_3': 'stomach ache',
            'symptoms_4': 'diarrhea', 'symptoms_5': 'fatigue',
            'conclusion': 'Gastroenteritis', 'treatment': 'Hydration and rest'
        },
        {
            'symptoms_1': 'headache', 'symptoms_2': 'nausea', 'symptoms_3': 'dizziness',
            'symptoms_4': 'fatigue', 'symptoms_5': 'sensitivity to light',
            'conclusion': 'Migraine', 'treatment': 'Rest in dark room and pain medication'
        }
    ]

@app.route('/analyze', methods=['POST'])
@cross_origin()
def analyze_symptoms():
    """Analyze symptoms and return diagnosis"""
    try:
        symptoms_input = request.json.get('symptoms', '')
        
        if not symptoms_input.strip():
            return jsonify({
                'error': True,
                'message': 'Please enter some symptoms to analyze.'
            })
        
        # Parse symptoms from input
        symptoms = [s.strip().lower() for s in symptoms_input.split(',') if s.strip()]
        
        if len(symptoms) == 0:
            return jsonify({
                'error': True,
                'message': 'Please enter valid symptoms separated by commas.'
            })
        
        # Search for matching conditions
        matching_conditions = []
        
        # Process list of dictionaries
        for row in data:
            row_symptoms = [
                str(row.get('symptoms_1', '')).lower(),
                str(row.get('symptoms_2', '')).lower(), 
                str(row.get('symptoms_3', '')).lower(),
                str(row.get('symptoms_4', '')).lower(),
                str(row.get('symptoms_5', '')).lower()
            ]
            
            # Check how many symptoms match
            matches = sum(1 for symptom in symptoms if symptom in row_symptoms)
            
            if matches > 0:
                matching_conditions.append({
                    'condition': row.get('conclusion', 'Unknown'),
                    'treatment': row.get('treatment', 'Consult a doctor'),
                    'match_score': matches,
                    'total_symptoms': len([s for s in row_symptoms if s and s != 'nan']),
                    'symptoms': [s for s in row_symptoms if s and s != 'nan']
                })
        
        if not matching_conditions:
            return jsonify({
                'error': False,
                'message': 'No matching conditions found for your symptoms. Please consult a healthcare professional.',
                'search_url': f"https://www.google.com/search?q={'+'.join(symptoms)}+symptoms"
            })
        
        # Sort by match score (highest first)
        matching_conditions.sort(key=lambda x: x['match_score'], reverse=True)
        
        # Get top matches
        top_matches = matching_conditions[:3]
        
        return jsonify({
            'error': False,
            'symptoms_entered': symptoms,
            'matches': top_matches,
            'disclaimer': 'This is for informational purposes only. Please consult a healthcare professional for proper diagnosis and treatment.'
        })
        
    except Exception as e:
        return jsonify({
            'error': True,
            'message': f'An error occurred: {str(e)}'
        })

@app.route('/api/conditions', methods=['GET'])
@cross_origin()
def get_conditions():
    """Get all conditions"""
    try:
        # List of dictionaries
        seen = set()
        conditions = []
        for row in data:
            key = (row.get('conclusion'), row.get('treatment'))
            if key not in seen:
                seen.add(key)
                conditions.append({
                    'conclusion': row.get('conclusion', 'Unknown'),
                    'treatment': row.get('treatment', 'Consult a doctor')
                })
        return jsonify(conditions)
    except Exception as e:
        return jsonify({
            'error': True,
            'message': f'An error occurred: {str(e)}'
        }), 500

def get_fallback_medical_response(user_message):
    """Provide fallback medical responses when Gemini is unavailable"""
    message_lower = user_message.lower()
    
    # Common symptom responses
    if any(word in message_lower for word in ['headache', 'head pain']):
        return """I see you're dealing with headaches. Let me help you understand what might be going on.

Most headaches are caused by tension, stress, dehydration, or lack of sleep. Sometimes it's eye strain from screens or sinus pressure.

**What you can try right now:**
Rest in a dark, quiet room, drink some water, and maybe use a cold compress on your forehead.

**You should see a doctor if:**
- The headache is sudden and severe
- You have fever, stiff neck, or vision changes
- It's getting worse or happening frequently

Take care of yourself, and don't hesitate to get checked if you're worried."""

    elif any(word in message_lower for word in ['fever', 'temperature', 'hot']):
        return """A fever means your body is fighting something - usually an infection like a cold, flu, or bacterial infection.

**Here's what I recommend:**
- Rest and drink plenty of fluids
- Take acetaminophen or ibuprofen if needed
- Wear light clothes and keep cool
- Monitor your temperature

**Call a doctor if:**
- Fever goes above 103°F (39.4°C)
- You have trouble breathing or chest pain
- Fever lasts more than 3 days
- You're getting dehydrated

Your body knows how to fight infections, but sometimes it needs medical help. Don't wait if you're concerned."""

    elif any(word in message_lower for word in ['cough', 'coughing']):
        return """Coughs are usually from colds, allergies, or respiratory irritation. Sometimes it's acid reflux or asthma.

**Try these remedies:**
- Stay hydrated - it helps thin mucus
- Use a humidifier or breathe steam
- Honey can soothe your throat (adults only)
- Avoid smoke and strong scents

**See me (or a doctor) if:**
- Cough lasts more than 2-3 weeks
- You're coughing up blood
- You have fever with the cough
- You're having trouble breathing

Most coughs resolve on their own, but persistent ones need evaluation."""

    elif any(word in message_lower for word in ['nausea', 'vomiting', 'sick', 'stomach']):
        return """Stomach troubles are common - could be a stomach bug, food poisoning, stress, or even medication side effects.

**Here's my advice:**
- Sip small amounts of water or clear fluids
- Try bland foods like toast, rice, or bananas
- Avoid dairy, caffeine, and greasy foods
- Ginger can help with nausea

**Get medical help if:**
- You're severely dehydrated
- There's blood in your vomit
- You have high fever
- Severe abdominal pain

Most stomach issues resolve in 24-48 hours, but don't suffer if it's getting worse."""

    elif any(word in message_lower for word in ['pain', 'hurt', 'ache']):
        return """Pain is your body's way of telling you something needs attention. The location and type of pain helps determine the cause.

**General pain management:**
- Rest the affected area
- Apply ice for acute injuries, heat for muscle tension
- Over-the-counter pain relievers can help
- Gentle movement often helps more than complete rest

**See a doctor for:**
- Severe or worsening pain
- Pain after an injury
- Pain with other concerning symptoms
- Pain that interferes with daily activities

I'd need more details about your specific pain to give better guidance. Don't ignore persistent pain."""

    else:
        return f"""I understand you're concerned about your symptoms. While I can provide general information, every person is unique.

**My recommendation:**
Schedule an appointment with your doctor or visit urgent care. They can properly examine you, consider your medical history, and provide the right treatment.

**For immediate concerns:**
- Call your doctor's office
- Visit urgent care
- Go to the ER for emergencies

**In the meantime:**
Stay hydrated, get rest, and monitor your symptoms.

Remember, I'm here to provide information, but a real doctor should evaluate your specific situation. Your health is important - don't hesitate to seek proper medical care."""

@app.route('/api/gemini-chat', methods=['POST'])
@cross_origin()
def gemini_chat():
    """Chat with AI for medical assistance (Gemini or fallback)"""
    try:
        user_message = request.json.get('message', '')
        
        if not user_message.strip():
            return jsonify({
                'response': 'Please enter a message to get started. I can help you understand symptoms and provide general medical information.',
                'source': 'system'
            })
        
        # Try Gemini first if available
        if model:
            try:
                medical_prompt = f"""You are a friendly doctor having a conversation with a patient. Respond in a warm, conversational tone like you're talking to someone in your office.

Patient says: "{user_message}"

Respond as a doctor would:
- Be conversational and empathetic ("I understand...", "Let me help you...")
- Give practical, immediate advice they can try
- Explain things simply without too much medical jargon
- Always recommend seeing a real doctor for proper evaluation
- Keep it concise - 3-4 short paragraphs max
- Use "**" for important points like "**Call a doctor if:**"

Talk like a caring doctor, not a formal medical textbook."""
                
                generation_config = {
                    "temperature": 0.7,
                    "top_p": 0.8,
                    "top_k": 40,
                    "max_output_tokens": 500,
                }
                
                response = model.generate_content(
                    medical_prompt,
                    generation_config=generation_config
                )
                
                if response.text:
                    return jsonify({
                        'response': response.text,
                        'source': 'gemini',
                        'timestamp': datetime.now().isoformat()
                    })
            except Exception as e:
                print(f"Gemini API Error: {str(e)}")
                # Fall through to fallback response
        
        # Use fallback response system
        fallback_response = get_fallback_medical_response(user_message)
        
        return jsonify({
            'response': fallback_response,
            'source': 'fallback',
            'timestamp': datetime.now().isoformat(),
            'note': 'AI service is currently limited. For best results, consult a healthcare professional.'
        })
        
    except Exception as e:
        print(f"Chat Error: {str(e)}")
        return jsonify({
            'response': 'I apologize, but I\'m experiencing technical difficulties. Please consult with a healthcare professional for your medical concerns.',
            'source': 'error',
            'error': str(e)
        })

@app.route('/api/test-gemini', methods=['GET'])
@cross_origin()
def test_gemini():
    """Test Gemini AI connection"""
    try:
        if not GEMINI_API_KEY:
            return jsonify({
                'status': 'error',
                'message': 'No API key configured'
            })
        
        # List available models
        try:
            available_models = []
            for m in genai.list_models():
                if 'generateContent' in m.supported_generation_methods:
                    available_models.append(m.name)
        except Exception as e:
            available_models = [f"Error listing models: {str(e)}"]
        
        if not model:
            return jsonify({
                'status': 'error',
                'message': 'Gemini AI not configured',
                'available_models': available_models
            })
        
        # Simple test prompt
        test_response = model.generate_content("Say 'Hello, I am your medical AI assistant!'")
        
        return jsonify({
            'status': 'success',
            'message': 'Gemini AI is working',
            'test_response': test_response.text,
            'available_models': available_models
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'Gemini test failed: {str(e)}'
        })

@app.route('/api/stats', methods=['GET'])
@cross_origin()
def get_stats():
    """Get basic statistics about the dataset"""
    try:
        # List of dictionaries
        total_conditions = len(data)
        unique_conditions = len(set(row.get('conclusion') for row in data))
        sample_symptoms = list(set(row.get('symptoms_1') for row in data if row.get('symptoms_1')))[:10]
        
        return jsonify({
            'total_conditions': total_conditions,
            'unique_conditions': unique_conditions,
            'sample_symptoms': sample_symptoms,
            'gemini_status': 'configured' if model else 'not_configured'
        })
    except Exception as e:
        return jsonify({
            'error': True,
            'message': f'An error occurred: {str(e)}'
        }), 500

# Legacy webhook endpoint for backward compatibility
@app.route('/webhook', methods=['POST'])
@cross_origin()
def webhook():
    """Legacy webhook endpoint"""
    req = request.get_json(silent=True, force=True)
    session = req.get("session")

    new_symptoms = req.get('queryResult').get('parameters').get('new_symptoms')
    yes_no = req.get('queryResult').get('parameters').get('yes_no')
    index = req.get('queryResult').get('parameters').get('index')

    symptom = req.get('queryResult').get('parameters').get('symptom')
    identified = req.get('queryResult').get('parameters').get('identified')

    symptom.extend(identified)
    symptom = list(set(symptom))

    print('Length of yes_no ', len(yes_no))
    if len(yes_no) == 0:
        index = ''

    message = 'Thank you for your response. Let"s analyse your situation more.'

    print(symptom)
    if len(symptom) == 0:
        message = "I am unable to understand your query. Tell me how you are feeling."
    else:
        # Lower case all symptoms
        symptom = [s.lower() for s in symptom]

        # Search symptom in data
        contains_all_symptoms = data['all_symptoms'].apply(
            lambda x: all(csymptom in x for csymptom in symptom))

        if len(data[contains_all_symptoms]) == 0 and len(symptom) < 5:
            message = 'I am not able to understand from your query. Could you please describe more symptoms on what you are feeling. (fever, headche)'
            symptom = []

        elif len(data[contains_all_symptoms]) > 0:
            if len(str(index)) > 0:
                index = int(index)
            else:
                index = random.randint(0, len(data[contains_all_symptoms]) - 1)

            allSymptoms = data[contains_all_symptoms].iloc[index][[
                'symptoms_1', 'symptoms_2', 'symptoms_3', 'symptoms_4', 'symptoms_5'
            ]].values
            result = data[contains_all_symptoms].iloc[index][[
                'conclusion', 'treatment'
            ]].values

            new_symptoms = [i for i in allSymptoms if i not in symptom]

            if (len(new_symptoms) > 0 and yes_no == 'yes') or len(new_symptoms) == 0:
                message = 'Ok. As per my analysis you may be experiencing ' + result[
                    0] + '. Not to worry as the treatment of same is ' + result[1]
                symptom = []
                new_symptoms = []
                index = 0

            elif len(new_symptoms) > 0 and yes_no == 'no':
                message = 'In that case you may be experiencing on of this conditions:'
                for i in data[contains_all_symptoms][['conclusion', 'treatment']].values:
                    message += u'\u2029' + f' | Condition - {i[0]} and treatement is {i[1]} '
                symptom = []
                new_symptoms = []
                index = 0

            elif len(symptom) == 5:
                message = 'Ok. As per my analysis you may be experiencing ' + result[
                    0] + '. Not to worry as the treatment of same is ' + result[1]
                symptom = []
                new_symptoms = []
                index = 0

            else:
                new_symptoms = [i for i in allSymptoms if i not in symptom]
                message = 'Are you also feeling ' + ', '.join(
                    new_symptoms) + '. (Yes/No)'

        else:
            message = 'I am unable to come on any conclusion on this. Please visit "https://www.google.com/search?q=' + ','.join(
                symptom) + '"'
            symptom = []
            new_symptoms = []
            index = 0

    return {
        "fulfillmentText": message,
        "outputContexts": [{
            'name': session + '/contexts/symptom_context',
            'lifespanCount': 15,
            'parameters': {
                'identified': symptom,
                'new_symptoms': new_symptoms,
                'index': index
            }
        }],
        "source": "webhookdata"
    }

@app.route('/')
@cross_origin()
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'message': 'AI Medical Symptom Checker API is running',
        'endpoints': [
            '/analyze - POST - Analyze symptoms',
            '/api/conditions - GET - Get all conditions',
            '/api/gemini-chat - POST - Chat with AI',
            '/api/stats - GET - Get statistics'
        ]
    })

if __name__ == '__main__':
    # default to 5000 for local development to avoid conflicts with system services
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=False, host='0.0.0.0', port=port)