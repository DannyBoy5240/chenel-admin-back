const User = require("../models/user.model");

const signUp = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    await User.create({
      email,
      fullName,
      password,
    });

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  signUp,
};
