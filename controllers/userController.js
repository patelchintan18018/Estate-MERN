const Listing = require("../models/Listing");
const User = require("../models/User");
const { errorHandler } = require("../utils/errorHandler.js");
const bcryptjs = require("bcryptjs");

exports.test = (req, res) => {
  res.json({
    msg: "Hello world",
  });
};

exports.updateUser = async (req, res, next) => {
    // console.log(req.user)
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only update your information"));

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
            username:req.body.username,
          password: req.body.password
        },
      },
      { new: true }
    );

    const {password:pass, ...userData}=updatedUser._doc;
    res.status(200).json({success:true,message:'User updated successfully !!', userData});
    
  } catch (error) {
    next(error);
  }
};



exports.deleteUser = async(req,res,next) => {
  if(req.user.id !== req.params.id){ return next(errorHandler(401, "You can only update your information"))}
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie('token');
    res.status(200).json({success:true, message:"User deleted successfully !!"});
    
  } catch (error) {
    next(error)
  }

};

exports.getUserListing = async(req,res,next) => {

  console.log(req.user.id, req.params.id)
if(req.user.id !== req.params.id){return next(errorHandler(401, "You can only see your listing"))}
try {
  const userListings = await Listing.find({userRef: req.params.id})
  res.json(userListings);
} catch (error) {
  next(error)
}

} 