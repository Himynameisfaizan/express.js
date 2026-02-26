const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function createRegister(req, res) {
  const { username, email, password, bio, profileImage } = req.body;

  const isUserExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserExist) {
    return res.status(409).json({
      message: "user already exist you have to login there",
    });
  }

  const hash = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    username,
    email,
    password: hash,
    bio,
    profileImage,
  });

  const token = jwt.sign({ id: user._id, user: user.username }, process.env.JWT_SECRET, {
    expiresIn: "20h",
  });

  res.cookie("jwt_token", token);

  res.status(201).json({
    message: "user registered successfully",
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
      bio: user.bio,
      profileImage: user.profileImage,
    },
    token,
  });
}

async function loginUser(req, res) {
  const { username, email, password } = req.body;

  const user = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    return res.status(404).json({
      message: "user not found you have register firts",
    });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({
      message: "invalid password",
    });
  }

  const token = jwt.sign({ id: user._id, username:user.username }, process.env.JWT_SECRET, {
    expiresIn: "20h",
  });

  res.cookie("jwt_token", token);

  res.status(201).json({
    message: "user logged in successfully",
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
      profileImage: user.profileImage,
    },
    token,
  });
}

module.exports = {
  createRegister,
  loginUser,
};
