const express = require("express");
const { signin, login, googleLogin } = require("../controllers/authController.js");
const router = express.Router();

router.post('/signin',signin);
router.post('/login',login);
router.post('/googleLogin',googleLogin);


module.exports= router;