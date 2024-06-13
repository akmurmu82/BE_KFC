const Cart = require("../../models/cartModel");

// This can be used to add item as well as to updte item quantity.
// The "Quantity" here can be negative if item is to be decreased.
const updateItemInCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
      await cart.save();
    } else {
      cart = new Cart({ userId, items: [{ productId, quantity }] });
      await cart.save();
    }
    res.status(200).json({ status: true, data: cart });
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = updateItemInCart;
