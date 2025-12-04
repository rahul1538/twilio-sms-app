import React, { useEffect, useState } from "react";
import { getMessages } from "../services/api";

// Utility function for formatting date/time
const formatTime = (dateString) => {
  return new Date(dateString).toLocaleString();
};

export default function MessageTable({ refreshKey }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMessages = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getMessages();
      // The backend returns { success: true, data: [...] }
      if (response.data.success) { 
        setMessages(response.data.data);
      } else {
        setError("Failed to fetch messages: " + (response.data.error || "Unknown error"));
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Connection error. Ensure the backend is running and the API URL is correct.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [refreshKey]); // refreshKey is used to trigger a refetch after sending a message

  if (loading) return <div className="card"><p>Loading message history...</p></div>;
  if (error) return <div className="card error-message"><p>{error}</p></div>;
  if (messages.length === 0) return <div className="card"><p>No messages found in history.</p></div>;

  return (
    <div className="card">
      <h2>📨 Message History</h2>

      <table>
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Message</th>
            <th>Status</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          {messages.map((msg) => (
            <tr key={msg._id} className={msg.status.toLowerCase()}>
              <td>{msg.from}</td>
              <td>{msg.to}</td>
              <td>{msg.body}</td>
              <td>{msg.status}</td>
              <td>{formatTime(msg.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}