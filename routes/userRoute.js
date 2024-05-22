const express = require("express");
const { test , updateUser, deleteUser, getUserListing} = require("../controllers/userController.js");
const {verifyToken} = require("../utils/verifyToken.js")
const router = express.Router();


router.get('/user',test);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/userListing/:id', verifyToken, getUserListing);

module.exports = router;