const express = require("express");
const authController = require("../controllers/auth.controller");
const authRouter = express.Router();


authRouter.post("/register", authController.userRegister);
authRouter.post("/login", authController.userLogin);

module.exports = authRouter