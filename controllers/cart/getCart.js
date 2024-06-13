const Cart = require("../../models/cartModel");

const getCart = async (req, res) => {
  const { userId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });
    if (cart) {
      return res.status(200).json({ status: true, data: cart.items });
    }
    // ChatGPT code:
    // let cart = await Cart.findOne({ userId }).populate("items-productId");
    // return res.status(200).json({ status: true, data: cart });
  } catch (error) {
    console.log("error:", error);
  }
};

module.exports = getCart;
