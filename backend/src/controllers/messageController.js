const Message = require("../models/Message");
const twilio = require("twilio");

// Twilio Client
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

// -------------------------------
// CREATE (Send SMS + Save to DB)
// -------------------------------
exports.sendMessage = async (req, res) => {
  try {
    const { from, to, body } = req.body;

    // Send SMS using Twilio
    const sms = await client.messages.create({
      body,
      from,
      to,
    });

    // Save to DB
    const message = await Message.create({ from, to, body, status: sms.status });

    res.status(201).json({
      success: true,
      message: "SMS sent successfully",
      data: message,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// -------------------------------
// READ - All Messages
// -------------------------------
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// -------------------------------
// READ - Single Message
// -------------------------------
exports.getMessageById = async (req, res) => {
  try {
    const msg = await Message.findById(req.params.id);
    if (!msg) return res.status(404).json({ success: false, message: "Message not found" });

    res.json({ success: true, data: msg });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// -------------------------------
// UPDATE Message
// -------------------------------
exports.updateMessage = async (req, res) => {
  try {
    const updated = await Message.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updated) return res.status(404).json({ success: false, message: "Message not found" });

    res.json({ success: true, message: "Message updated", data: updated });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// -------------------------------
// DELETE Message
// -------------------------------
exports.deleteMessage = async (req, res) => {
  try {
    const deleted = await Message.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ success: false, message: "Message not found" });

    res.json({ success: true, message: "Message deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
