require("dotenv").config();
const BE_BASE_URL = process.env.BE_KFC_BASE_URL;
const { default: axios } = require("axios");
const Product = require("../../models/productModel");

const fetchProduct = async (req, res) => {
  const { productId } = req.params;
  //   console.log(productId);
  try {
    const data = await Product.find({ _id: productId });

    res.status(200).json({
      status: true,
      data: data.data,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ status: false, message: "Internal server error." });
  }
};

module.exports = fetchProduct;
