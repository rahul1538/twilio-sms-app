import axios from "axios";

const API = axios.create({
  baseURL:" https://twilio-sms-app-5.onrender.com",
});

export const sendSMS = (data) => API.post("/send", data);
export const getMessages = () => API.get("/");
