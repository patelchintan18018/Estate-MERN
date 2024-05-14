const express = require("express");
const { userController, test } = require("../controllers/userController.js");
const router = express.Router();


router.get('/user',userController);

module.exports = router;