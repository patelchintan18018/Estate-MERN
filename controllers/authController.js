const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const { errorHandler } = require("../utils/errorHandler.js");

exports.signin = async (req, res, next ) => {
  const { username, email, password } = req.body;
  const hashedpassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedpassword });
  try {
    await newUser.save();
    res.status(201).json("user created successfully !!");
  } catch (error) {
    next(error)
  }
};
