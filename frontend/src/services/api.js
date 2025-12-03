import axios from "axios";

const API = axios.create({
  baseURL: "https://twilio-sms-app-5.onrender.com/api/messages",
});

// Send SMS
export const sendSMS = (data) => API.post("/send", data);

// Get all messages
export const getMessages = () => API.get("");
