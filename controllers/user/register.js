const User = require("../../models/userModel");

const userRegister = async (req, res) => {
  const { phoneNumber } = req.body;

  try {
    // Check if the username or email already exists
    const existingUser = await User.findOne({ $or: [{ phoneNumber }] });

    if (existingUser) {
      return res
        .status(200)
        .json({ message: "Email already exists.", data: existingUser });
    }

    // const hashPassword = await bcrypt.hash(password,) Password hashing is remain

    // Create a new user instance
    const newUser = new User({
      phoneNumber,
    });

    // Save the user to the database
    await newUser.save();

    // Respond with a success message
    res.status(201).json({
      status: true,
      message: "User created successfully.",
      user: newUser,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res
      .status(500)
      .json({ status: false, message: "Internal server errory.", error });
  }
};

module.exports = userRegister;
