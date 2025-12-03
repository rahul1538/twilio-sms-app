require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const messageRoutes = require("./routes/messageRoutes");

const app = express();

// Middleware
// Middleware
const allowedOrigins = [
  "http://localhost:3000",
  "https://twilio-sms-app-frontend.onrender.com",
  "https://twilio-sms-app.onrender.com"
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST"],
  credentials: true
}));

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
