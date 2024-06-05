const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Nexmo = require("nexmo");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let otpStorage = {}; // Temporary storage for OTPs

app.post("/send-otp", (req, res) => {
  const { phoneNumber } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Save OTP temporarily (in a real app, save to a database)
  otpStorage[phoneNumber] = otp;

  nexmo.message.sendSms(
    "YourNexmoNumber", // Replace with your Nexmo phone number
    phoneNumber,
    `Your OTP is ${otp}`,
    (err, responseData) => {
      if (err) {
        res.status(500).json({ success: false, error: err });
      } else {
        res.status(200).json({ success: true });
      }
    }
  );

  console.log(`OTP for ${phoneNumber} is ${otp}`);
});

app.post("/verify-otp", (req, res) => {
  const { phoneNumber, otp } = req.body;

  // Verify OTP
  if (otpStorage[phoneNumber] === otp) {
    delete otpStorage[phoneNumber]; // Clear the OTP after verification
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ success: false, message: "Invalid OTP" });
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

const { Vonage } = require("@vonage/server-sdk");

const vonage = new Vonage({
  apiKey: "c211a1db",
  apiSecret: "iWn9vRwihk9d4MMb",
});

const from = "Vonage APIs";
const to = "918207202380";
const text = "A text message sent using the Vonage SMS API";

async function sendSMS() {
  await vonage.sms
    .send({ to, from, text })
    .then((resp) => {
      console.log("Message sent successfully");
      console.log(resp);
    })
    .catch((err) => {
      console.log("There was an error sending the messages.");
      console.error(err);
    });
}

sendSMS();
