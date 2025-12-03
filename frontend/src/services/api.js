import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/messages",
});

export const sendSMS = (data) => API.post("/send", data);
export const getMessages = () => API.get("/");
