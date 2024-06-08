const User = require("../../models/userModel");

const userRegister = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the username or email already exists
    const existingUser = await User.findOne({ $or: [{ email }] });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    // const hashPassword = await bcrypt.hash(password,) Password hashing is remain

    // Create a new user instance
    const newUser = new User({
      name,
      email,
      password, // Remember to hash the password before saving to the database in production
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
    res.status(500).json({ status: false, message: "Internal server error." });
  }
};

module.exports = userRegister;
