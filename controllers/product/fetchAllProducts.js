require("dotenv").config();
const BE_BASE_URL = process.env.BE_KFC_BASE_URL;
const { default: axios } = require("axios");
const User = require("../../models/userModel");
const Product = require("../../models/productModel");

const fetchAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    // Respond with a success message
    res.status(200).json({
      status: true,
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ status: false, message: "Internal server error." });
  }
};

module.exports = fetchAllProducts;
