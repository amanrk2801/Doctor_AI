// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL_BOT || 'http://localhost:8080';

export const API_ENDPOINTS = {
  ANALYZE: `${API_BASE_URL}/analyze`,
  CONDITIONS: `${API_BASE_URL}/api/conditions`,
  GEMINI_CHAT: `${API_BASE_URL}/api/gemini-chat`,
  STATS: `${API_BASE_URL}/api/stats`
};

export default API_BASE_URL;