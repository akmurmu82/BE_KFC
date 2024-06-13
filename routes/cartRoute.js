const express = require("express");
const cartRouter = express.Router();
require("dotenv").config();
const getCart = require("../controllers/cart/getCart");
const removeFromCart = require("../controllers/cart/removeFromCart");
const updateItemInCart = require("../controllers/cart/updateItemInCart");

// Route to handle user registration

cartRouter.post("/get", getCart);
cartRouter.post("/add", updateItemInCart);
cartRouter.post("/remove", removeFromCart);

module.exports = cartRouter;
