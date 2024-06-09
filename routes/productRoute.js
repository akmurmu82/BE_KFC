const express = require("express");
const fetchAllProducts = require("../controllers/product/fetchAllProducts");
const createProduct = require("../controllers/product/createProduct");
require("dotenv").config();
const productRouter = express.Router();

productRouter.get("/all-products", fetchAllProducts);
productRouter.post("/create", createProduct);

module.exports = productRouter;
