const Listing = require("../models/Listing.js");
const { errorHandler } = require("../utils/errorHandler.js");

exports.createListing = async(req,res,next)=>{
    try {
        const newListing = new Listing(req.body);
        await newListing.save();
        return res.status(200).json({success:true, message:"list created", newListing})
    } catch (error) {
        next(error)
    }
};

exports.deleteUserListing = async(req,res,next) => {
    const listing = await Listing.findById(req.params.id);
    if(!listing){return next(errorHandler(404,'Listing not found'))};
    
    if(listing.userRef !== req.user.id){return next(errorHandler(401,'You can only delete your listings'))};

    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json({success:true, message:"Listing deleted succesfully"})
    } catch (error) {
        next(error)
    }
}