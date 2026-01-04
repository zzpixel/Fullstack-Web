const User = require("../models/User.js");
const bcrpt = require("bcrypt");

exports.signup = async (req, res) => {
  //   const username = req.body.username
  //   const password = req.body.password
  //   const email = req.body.email
  //   const fullName = req.body.fullName

  try {
    const { username, password, email, fullName } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
      email,
      fullName,
    });
    await user.save();
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error, "Error signing in the user");
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Username" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    return res.status(200).json({
      message: "User Logged in",
      email: user.email,
      user: { id: user._id, name: user.fullName },
    });
  } catch (error) {
    console.error(error, "Error, failed to log in")
  }
};
