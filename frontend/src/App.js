import React, { useState } from "react";
import SendSMSForm from "./components/SendSMSForm";
import MessageTable from "./components/MessageTable";
import "./styles.css";
import { Toaster } from "react-hot-toast";

export default function App() {
  // State to force MessageTable to refresh after a successful SMS is sent
  const [refreshKey, setRefreshKey] = useState(0);

  const handleMessageSent = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  return (
    <div className="container">
      <h1>📱 Twilio SMS Dashboard</h1>
      <SendSMSForm onMessageSent={handleMessageSent} />
      {/* Pass refreshKey as a prop; changing the key remounts the component and triggers useEffect */}
      <MessageTable refreshKey={refreshKey} /> 
      <Toaster />
    </div>
  );
}