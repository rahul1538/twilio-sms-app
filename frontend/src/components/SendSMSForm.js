import React, { useState } from "react";
import { sendSMS } from "../services/api";
import toast from "react-hot-toast";

export default function SendSMSForm() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!from || !to || !text) return toast.error("All fields required!");

    try {
      await sendSMS({ from, to, text });
      toast.success("Message sent successfully!");
      setFrom("");
      setTo("");
      setText("");
    } catch (err) {
      toast.error("Failed to send SMS");
    }
  };

  return (
    <div className="card">
      <h2>Send SMS</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Your Twilio Number"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
        <input
          placeholder="Recipient Number"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <textarea
          rows="4"
          placeholder="Message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}
