import axios from "axios";

// IMPORTANT: The BASE URL MUST include the route prefix defined in your backend's app.js
const API_BASE_URL = "http://localhost:5000/api/messages"; 

const API = axios.create({
  baseURL: API_BASE_URL,
});

/**
 * Sends an SMS message to the backend.
 * Endpoint: POST /send (which resolves to http://localhost:5000/api/messages/send)
 * @param {object} data - { from: string, to: string, body: string }
 * @returns {Promise<object>}
 */
export const sendSMS = (data) => API.post("/send", data);

/**
 * Fetches all message history.
 * Endpoint: GET / (which resolves to http://localhost:5000/api/messages)
 * @returns {Promise<object>}
 */
export const getMessages = () => API.get("/");