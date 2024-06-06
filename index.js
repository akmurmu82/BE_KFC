const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Vonage } = require("@vonage/server-sdk");

const app = express();

// Configure CORS to allow requests from your frontend
app.use(cors({ origin: "http://127.0.0.1:5173" }));

app.use(bodyParser.json());

let otpStorage = {}; // Temporary storage for OTPs

const vonage = new Vonage({
  apiKey: "c211a1db",
  apiSecret: "iWn9vRwihk9d4MMb",
});

const from = "Vonage APIs";

// Enable pre-flight for all routes
app.options("*", cors());
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the server" });
});

app.post("/send-otp", async (req, res) => {
  try {
    const { phoneNumber: to } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const text = `Your OTP is ${otp}`; // Set the text to include the OTP

    await vonage.sms
      .send({ to, from, text })
      .then((resp) => {
        console.log("Message sent successfully");
        otpStorage[to] = otp;
        console.log(resp, req.body, otpStorage);
        res.status(200).json({ success: true });
      })
      .catch((err) => {
        console.log("There was an error sending the messages.");
        console.error(err);
        res.status(500).json({ success: false, error: err }); // Return proper error status
      });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
});

app.post("/verify-otp", (req, res) => {
  const { phoneNumber, otp } = req.body;

  // Verify OTP
  if (otpStorage[phoneNumber] == otp) {
    // delete otpStorage[phoneNumber]; // Clear the OTP after verification
    res.status(200).json({
      success: true,
      message: "OTP verification successful",
    });
  } else {
    res.status(400).json({ success: false, message: "Invalid OTP", otpStorage });
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
