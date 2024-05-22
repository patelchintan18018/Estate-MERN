const {createListing, deleteUserListing} = require("../controllers/listigController.js")
const { verifyToken } = require("../utils/verifyToken.js") ;

const express = require("express");
const router = express.Router();

router.post('/create', verifyToken , createListing);
router.delete('/delete/:id', verifyToken, deleteUserListing)

module.exports = router;