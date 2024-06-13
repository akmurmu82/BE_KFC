const express = require("express");
const userRouter = express.Router();
require("dotenv").config();
const loginUser = require("../controllers/user/addToCart");
const userRegister = require("../controllers/user/removeFromCart");
const updateProfile = require("../controllers/user/getCart");

// Route to handle user registration

userRouter.post("/addToCart", loginUser);
userRouter.post("/removeFromCart", userRegister);
userRouter.post("/getCart", updateProfile);

module.exports = userRouter;
