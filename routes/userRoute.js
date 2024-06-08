const express = require("express");
const userRouter = express.Router();
require("dotenv").config();
const loginUser = require("../controllers/user/login");
const userRegister = require("../controllers/user/register");

// Route to handle user registration

userRouter.post("/register", userRegister);
userRouter.post("/login", loginUser);

module.exports = userRouter;
