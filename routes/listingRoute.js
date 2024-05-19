const {createListing} = require("../controllers/listigController.js")
const { verifyToken } = require("../utils/verifyToken.js") ;

const express = require("express");
const router = express.Router();

router.post('/create', verifyToken , createListing)

module.exports = router;