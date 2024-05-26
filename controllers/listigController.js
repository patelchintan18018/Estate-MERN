const Listing = require("../models/Listing.js");
const { errorHandler } = require("../utils/errorHandler.js");

exports.createListing = async (req, res, next) => {
  try {
    const newListing = new Listing(req.body);
    await newListing.save();
    return res
      .status(200)
      .json({ success: true, message: "list created", newListing });
  } catch (error) {
    next(error);
  }
};

exports.deleteUserListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Listing not found"));
  }

  if (listing.userRef !== req.user.id) {
    return next(errorHandler(401, "You can only delete your listings"));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Listing deleted succesfully" });
  } catch (error) {
    next(error);
  }
};

exports.getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Lising not found"));
    }
    res.status(200).json({
      success: true,
      message: "Fetched listing successfully",
      listing,
    });
  } catch (error) {
    next(error);
  }
};

exports.getsearchListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    let offer = req.query.offer;
    if (offer === undefined || offer === "false") {
      offer = { $in: [true, false] };
    }

    let parking = req.query.parking;
    if (parking === undefined || parking === "false") {
      parking = { $in: [true, false] };
    }

    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [true, false] };
    }

    let type = req.query.type;
    if (type === undefined || type === "all") {
      type = { $in: ["rent", "sell"] };
    }

    let sort = req.query.sort || "createdAt";
    let order = req.query.order || "desc";

    let searchTerm = req.query.searchTerm || "";

    const searchlistings = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      parking,
      furnished,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json({success:true, message:'Listing fetched', searchlistings});
  } catch (error) {
    next(error);
  }
};
