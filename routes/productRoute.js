const express = require("express");
const fetchAllProducts = require("../controllers/product/fetchAllProducts");
const createProduct = require("../controllers/product/createProduct");
const fetchProduct = require("../controllers/product/fetchProduct");
require("dotenv").config();
const productRouter = express.Router();

productRouter.get("/all-products", fetchAllProducts);
productRouter.post("/:productId", fetchProduct);
productRouter.post("/create", createProduct);

module.exports = productRouter;
