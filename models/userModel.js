const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  photoURL: {
    type: String,
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
