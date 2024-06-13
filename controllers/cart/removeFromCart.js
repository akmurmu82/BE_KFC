const Cart = require("../../models/cartModel");

const removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      cart.items = cart.items.filter(
        (item) => item.productId.toString() !== productId
      );
      await cart.save();
      res.status(200).json({ status: true, data: cart });
    }
  } catch (error) {
    res
      .status(200)
      .json({ status: false, data: "Failed to remove item from the cart." });
  }
};

module.exports = removeFromCart;
