require("dotenv").config();
const BE_BASE_URL = process.env.BE_KFC_BASE_URL;
const { default: axios } = require("axios");
const Product = require("../../models/productModel");

const fetchProduct = async (req, res) => {
  const { productId } = req.body;
  try {
    const product = await Product.find({ _id:productId });

    // Respond with a success message
    res.status(200).json({
      status: true,
      data: product,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ status: false, message: "Internal server error." });
  }
};

module.exports = fetchProduct;
