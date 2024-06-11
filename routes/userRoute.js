const express = require("express");
const userRouter = express.Router();
require("dotenv").config();
const loginUser = require("../controllers/user/login");
const userRegister = require("../controllers/user/register");
const updateProfile = require("../controllers/user/update");

// Route to handle user registration

userRouter.post("/register", userRegister);
userRouter.post("/login", loginUser);
userRouter.post("/update", updateProfile);

module.exports = userRouter;
