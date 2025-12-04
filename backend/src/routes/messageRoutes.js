const express = require("express");
const {
  sendMessage,
  getMessages,
  getMessageById,
  updateMessage,
  deleteMessage,
} = require("../controllers/messageController");

const router = express.Router();

// 🧪 Test Route
router.get("/test", (req, res) => {
  res.json({ success: true, message: "Message API Working ✔" });
});

// CREATE
router.post("/send", sendMessage);

// READ
router.get("/", getMessages);
router.get("/:id", getMessageById);

// UPDATE
router.put("/:id", updateMessage);

// DELETE
router.delete("/:id", deleteMessage);

module.exports = router;
