import React, { useEffect, useState } from "react";
import { getMessages } from "../services/api";

export default function MessageTable() {
  const [messages, setMessages] = useState([]);

  const loadMessages = async () => {
    try {
      const res = await getMessages();
      setMessages(res.data);
    } catch (err) {
      console.error("Error fetching messages", err);
    }
  };

  useEffect(() => {
    loadMessages(); // load immediately

    const interval = setInterval(() => {
      loadMessages();
    }, 5000); // auto-refresh every 5 seconds

    return () => clearInterval(interval); // clean up on unmount
  }, []);

  return (
    <div className="card">
      <h2>Message History (Auto-Refresh 🔄)</h2>
      <table>
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Message</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {messages.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                No messages yet...
              </td>
            </tr>
          ) : (
            messages.map((msg) => (
              <tr key={msg._id}>
                <td>{msg.from}</td>
                <td>{msg.to}</td>
                <td>{msg.text}</td>
                <td>{new Date(msg.date).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
