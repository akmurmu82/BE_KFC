const Cart = require("../../models/cartModel");
const User = require("../../models/userModel");

// This can be used to add item as well as to updte item quantity.
// The "Quantity" here can be negative if item is to be decreased.
const updateItemInCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    let cart;
    if (userId) {
      cart = await Cart.findOne({ userId });
    } else {
      console.log("Creating a temporary user.");
      // Create a temporary user if userId is null
      const tempUser = await createTemporaryUser();
      console.log("tempUser", tempUser);
      cart = await Cart.findOne({ userId: tempUser._id });
      if (!cart) {
        cart = new Cart({ userId: tempUser._id, items: [] });
      }
    }

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
      res.status(200).json({ status: true, data: cart });
    } else {
      cart = new Cart({ userId, items: [{ productId, quantity }] });
      await cart.save();
      res.status(200).json({ status: true, data: cart });
    }
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: false, message: "Failed to update the cart." });
  }
};

const createTemporaryUser = async () => {
  const tempUser = await User({
    phoneNumber: 911234567890,
    email: "temp@gmail.com",
    isTemporary: true,
  });
  await tempUser.save();
  return tempUser;
};

module.exports = updateItemInCart;

/*
Use Sessions storage to store the current users data as cart data.
Once the logged in send the data[cart details] to BE
*/
