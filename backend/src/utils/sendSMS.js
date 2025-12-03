const twilio = require("twilio");

const sendSMS = async (from, to, text) => {
  const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

  const message = await client.messages.create({
    from,
    to,
    body: text,
  });

  return message;
};

module.exports = sendSMS;
