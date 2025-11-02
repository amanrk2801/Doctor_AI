// API Configuration
// Default to relative paths so the dev server proxy (vite) can forward requests to backend.
const API_BASE_URL = import.meta.env.VITE_API_URL || "";

export const API_ENDPOINTS = {
  ANALYZE: `${API_BASE_URL}/analyze`,
  CONDITIONS: `${API_BASE_URL}/api/conditions`,
  GEMINI_CHAT: `${API_BASE_URL}/api/gemini-chat`,
  STATS: `${API_BASE_URL}/api/stats`,
};

export default API_BASE_URL;
