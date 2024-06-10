const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const { Vonage } = require("@vonage/server-sdk");
const connection = require("./db");
const userRouter = require("./routes/userRoute");
const productRouter = require("./routes/productRoute");

const PORT = process.env.PORT || 8080;

const app = express();

// Configure CORS to allow requests from your frontend
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

// Routes
app.use("/users", userRouter);
app.use("/products", productRouter);

let otpStorage = {}; // Temporary storage for OTPs

const vonage = new Vonage({
  apiKey: "af211430",
  apiSecret: "xk1fkWFiQx7iMQK6",
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
        res.status(200).json({ success: true, otp });
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
    res
      .status(400)
      .json({ success: false, message: "Invalid OTP", otpStorage });
  }
});

app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`Database is connected...`);
    console.log(`Server is running on port: ${PORT}`);
  } catch (error) {
    console.log(`Error while starting the server: ${error}`);
  }
});
