require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const messageRoutes = require("./routes/messageRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use("/api/messages", messageRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Twilio SMS API is running...");
});

module.exports = app;
