// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
const User = require("../../models/userModel");
require("dotenv").config();

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(401).json({ message: "USER NOT FOUND" });
    }

    // const isMatch = await bcrypt.compare(password, user.password);
    // console.log(isMatch);

    if (password !== user.password) {
      return res.status(400).send({ message: "Invalid credentials" });
    }
    // const token = jwt.sign({ foo: "foo" }, process.env.JWT_SECRET, {
    //   expiresIn: "1h",
    // });
    // console.log(token);
    res.status(200).send({ message: "Login Successfully", data: user });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = loginUser;
