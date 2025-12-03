import React from "react";
import SendSMSForm from "./components/SendSMSForm";
import MessageTable from "./components/MessageTable";
import "./styles.css";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <div className="container">
      <h1>📱 Twilio SMS Dashboard</h1>
      <SendSMSForm />
      <MessageTable />
      <Toaster />
    </div>
  );
}
