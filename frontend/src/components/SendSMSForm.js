import React, { useState } from "react";
import toast from "react-hot-toast";
import { sendSMS } from "../services/api"; // Import the API function

// Your static Twilio number from the backend's .env file
const TWILIO_FROM_NUMBER = "+17753078165"; 

export default function SendSMSForm({ onMessageSent }) {
  const [form, setForm] = useState({
    to: "",
    body: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.to || !form.body) {
        toast.error("Please fill in both recipient number and message body.");
        return;
    }

    setIsLoading(true);

    try {
      // Construct payload using the static Twilio 'from' number
      const payload = {
        from: TWILIO_FROM_NUMBER,
        to: form.to,
        body: form.body,
      };

      const response = await sendSMS(payload);

      if (response.data.success) {
        toast.success("SMS Sent Successfully!");
        setForm({ to: "", body: "" });
        // Call the prop function to refresh the message table
        if (onMessageSent) onMessageSent(); 
      } else {
        toast.error(response.data.error || "Failed to send SMS");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        "Server Error. Check your backend server and API URL in api.js."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Send SMS</h2>
      <form onSubmit={handleSubmit}>
        {/* The 'from' number is automatically sent via TWILIO_FROM_NUMBER constant */}
        <p className="twili-info">
          **Sending from:** {TWILIO_FROM_NUMBER} (Your Twilio Number)
        </p>

        <input
          type="text"
          name="to"
          placeholder="Recipient Number (e.g., +1234567890)"
          value={form.to}
          onChange={handleChange}
          required
        />

        <textarea
          name="body"
          placeholder="Message Body"
          value={form.body}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}