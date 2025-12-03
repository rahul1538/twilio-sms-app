    const express = require("express");
    const { sendMessage, getMessages } = require("../controllers/messageController");

    const router = express.Router();

    router.post("/send", sendMessage);   // send sms
    router.get("/", getMessages);        // get message list

    module.exports = router;
