const userModel = require("../models/user.models");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  const { username, email, password, bio, profileImage } = req.body;

  const userExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (userExist) {
    return res.status(409).json({
      message: "user already exist",
    });
  }

  const hash = crypto.createHash("sha256").update(password).digest("hex");

  const user = await userModel.create({
    username,
    email,
    password: hash,
    bio,
    profileImage,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "20h",
  });

  res.cookie("jwt_token", token);

  res.status(201).json({
    message: "user register successfully",
    user,
    token,
  });
}

async function loginUser(req, res) {
  const { username, email, password } = req.body;

  const isUserExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (!isUserExist) {
    return res.status(404).json({
      message: "user does't exist",
    });
  }

  const userPassword =
    isUserExist.password ==
    crypto.createHash("sha256").update(password).digest("hex");

  if (!userPassword) {
    return res.status(401).json({
      message: "invalid password",
    });
  }

  const token = jwt.sign({ id: isUserExist._id }, process.env.JWT_SECRET, {
    expiresIn: "20h",
  });

  res.cookie("jwt_token", token);

  res.status(200).json({
    message: "you logged in successfully",
    isUserExist,
    token,
  });
}

module.exports = {
  registerUser,
  loginUser,
};
