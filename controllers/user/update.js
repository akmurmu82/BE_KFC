const User = require("../../models/userModel");

const updateProfile = async (req, res) => {
  const { userId: _id, name, email, password } = req.body;

  try {
    const user = await User.findById({ _id });
    if (!user) {
      return res.status(200).json({ message: "User not found" });
    }

    // Update the user's profile details
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;
    await user.save();
    console.log(user);
    res
      .status(200)
      .json({ status: true, message: "User info has been updated.", user });
  } catch (error) {
    res
      .statu(500)
      .json({ status: false, message: "Internal server error.", error });
  }
};

module.exports = updateProfile;
