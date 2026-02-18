const express = require("express");
const userModel = require("../models/users.model");
const jwt = require("jsonwebtoken");
const crypto = require("crypto")
const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const isEmailExist = await userModel.findOne({ email });

  if (isEmailExist) {
    return res.status(409).json({
      message: "from this mail user is already exist please try to new mail",
    });
  }

  const user = await userModel.create({
    name,
    email,
    password:crypto.createHash("sha256").update(password).digest("hex"),
  });

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },

    process.env.JWT_SECRET,
  );

  res.cookie("jwt_token", token);

  res.status(201).json({
    message: "user created successfully",
    user,
    token,
  });
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "With this mail user don't have an account please regiter fist",
    });
  }

  const passwordMatch = user.password === crypto.createHash("md5").update(password).digest("hex");

  if (!passwordMatch) {
    return res.status(401).json({
      message: "Invalid password!",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("jwt_token", token);

  res.status(200).json({
    message: "Logged in successfully",
    user,
    token,
  });
});

module.exports = authRouter;
