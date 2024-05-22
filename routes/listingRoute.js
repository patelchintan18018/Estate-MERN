const {createListing, deleteUserListing, getListing} = require("../controllers/listigController.js")
const { verifyToken } = require("../utils/verifyToken.js") ;

const express = require("express");
const router = express.Router();

router.post('/create', verifyToken , createListing);
router.delete('/delete/:id', verifyToken, deleteUserListing);
router.get('/get/:id', getListing)

module.exports = router;