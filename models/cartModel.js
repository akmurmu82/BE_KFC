const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId, // Research more about how this line helps in making the relationship

    ref: "Product", // Research more about this "ref"
    required: true,
  },
  quantity: { type: Number, required: true, default: 1 },
  price: { type: Number, required: true },
});

const cartSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  items: [cartItemSchema],
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
