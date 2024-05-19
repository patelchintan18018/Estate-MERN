const Listing = require("../models/Listing.js")

exports.createListing = async(req,res,next)=>{
    try {
        const newListing = new Listing(req.body);
        await newListing.save();
        return res.status(200).json({success:true, message:"list created", newListing})
    } catch (error) {
        next(error)
    }
}