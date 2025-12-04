const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    from: { type: String, required: true },
    to: { type: String, required: true },
    body: { type: String, required: true },
    status: { type: String, default: "sent" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
