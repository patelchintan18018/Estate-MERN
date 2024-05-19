const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const { errorHandler } = require("../utils/errorHandler.js");
const jwt = require("jsonwebtoken");

exports.signin = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    let userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(401).json({
        success: false,
        message: "Existing user found with the same Email ID !!",
      });
    }
    if (password.length < 8) {
      return res.status(401).json({
        success: false,
        message: "password length must be greater",
      });
    }
    const hashedpassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedpassword });
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User created successfully !!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: "User does not exists, Please create account",
      });
    }
    const validpassword = bcryptjs.compareSync(password, userExists.password);
    if (!validpassword) {
      return res
        .status(401)
        .json({ success: false, message: "Wrong credentials !!" });
    }
    const token = jwt.sign({ id: userExists._id }, process.env.JWT_KEY);
    const { password: pass, ...userData } = userExists._doc;
    res
      .cookie("token", token, { httpOnly: true })
      .status(200)
      .json({ success: true, message: "User login successfully !!", userData });
  } catch (error) {
    console.log(error);
  }
};

exports.googleLogin = async (req, res) => {
  try {
    // const {displayName,email,photoURL} = req.body;
    const userExists = await User.findOne({ email:req.body.email });
    if (userExists) {
      const token = jwt.sign({ id: userExists._id }, process.env.JWT_KEY);
      const { password: pass, ...userData } = userExists._doc;
      res
        .cookie("token", token, { httpOnly: true })
        .status(200)
        .json({
          success: true,
          message: "User login successfully !!",
          userData,
        });
    } else {
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedpassword = bcryptjs.hashSync(generatePassword, 10);
      const newUser = new User({
        username:
          req.body.username.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedpassword,
        photoURL : req.body.photoURL
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_KEY);
      const { password: pass, ...userData } = newUser._doc;
      res
        .cookie("token", token, { httpOnly: true })
        .status(200)
        .json({
          success: true,
          message: "User login successfully !!",
          userData,
        });
    }
  } catch (error) {
    console.log(error);
  }
};



exports.signOut = async(req,res,next)=>{
  try {
    res.clearCookie('token');
  res.status(200).json({success:true, message:'User Sign out successfully !!'})
  } catch (error) {
    next(error)
  }
  
}