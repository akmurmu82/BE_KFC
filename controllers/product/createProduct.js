const Product = require("../../models/productModel");

const createProduct = async (req, res) => {
  try {
    const { name, desc, price, postId, image } = req.body;

    // Validate required fields
    if (!name || !desc || !price || !postId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newProduct = new Product({
      name,
      desc,
      image,
      price,
      postId,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating product", error: error.message });
  }
};

module.exports = createProduct;
