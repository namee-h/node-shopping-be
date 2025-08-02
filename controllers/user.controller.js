const User = require("../models/User");
const bcrypt = require("bcryptjs");

const userController = {};

userController.createUser = async (req, res) => {
  try {
    console.log("Creating user with data:", req.body);
    let { email, password, name, level } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Error("User already exists");
    }
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      password,
      name,
      level: level ? level : "customer", // 기본값은 customer
    });
    await newUser.save();
    return res.status(200).json({ status: "success" });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error });
  }
};

module.exports = userController;
