const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
    // unique: true,
    default: "Usery",
  },
  email: {
    type: String,
    // required: true,
    // unique: true,
    default: "example@gmail.com",
  },
  password: {
    type: String,
    // required: true,
    default: "password",
  },
  isTemporary: {
    type: Boolean,
    default: false,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  photoURL: {
    type: String,
    default:
      "https://cdn4.iconfinder.com/data/icons/green-shopper/1068/user.png",
  },
  // You can add more fields as needed
});

const User = mongoose.model("kfcUser", userSchema);

module.exports = User;

/**
 * password:{
 * isFirebase:false,
 * value: String
 * }
 */
