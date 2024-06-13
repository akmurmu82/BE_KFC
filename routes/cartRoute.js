const express = require("express");
const cartRouter = express.Router();
require("dotenv").config();
const getCart = require("../controllers/cart/getCart");
const removeFromCart = require("../controllers/cart/removeFromCart");
const updateItemInCart = require("../controllers/cart/updateItemInCart");

// Route to handle user registration

cartRouter.post("/getCart", getCart);
cartRouter.post("/addToCart", updateItemInCart);
cartRouter.post("/removeFromCart", removeFromCart);

module.exports = cartRouter;
