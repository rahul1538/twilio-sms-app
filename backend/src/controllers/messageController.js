const Message = require("../models/Message");
const sendSMS = require("../utils/sendSMS");

exports.sendMessage = async (req, res) => {
  try {
    const { from, to, text } = req.body;

    const msg = await sendSMS(from, to, text);

    const saved = await Message.create({ from, to, text });

    res.status(200).json({ success: true, message: "SMS Sent ✔", data: saved });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getMessages = async (req, res) => {
  const messages = await Message.find().sort({ date: -1 });
  res.status(200).json(messages);
};
