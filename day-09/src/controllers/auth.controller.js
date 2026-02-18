const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// create user api

async function userRegister(req, res) {
  const { username, email, password, bio, profileImage } = req.body;

  const userExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (userExist) {
    return res.status(409).json({
      message: "user already exist with this account",
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

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRECT, {
    expiresIn: "20h",
  });

  res.cookie("jwt_token", token);

  res.status(201).json({
    message: "user registerd successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
    token,
  });
}


// login user api

async function userLogin(req, res) {
  const { username, email, password } = req.body;

  const user = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    return res.status(404).json({
      message: "with this acount user not exist please register first!",
    });
  }

  const isPassword = await bcrypt.compare(password, user.password);

  if (!isPassword) {
    return res.status(401).json({
      message: "invalid password",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRECT, {
    expiresIn: "20h",
  });

  res.cookie("jwt_token", token);

  res.status(200).json({
    message: "you logged in successfully",
    user: {
      username: user.username,
      email: user.email,
    },
    token,
  });
}


// get all user api

async function fetchedUser(req, res) {
  const user = await userModel.find();

  res.status(200).json({
    message: "all users fetched successfully",
    user,
  });
}

module.exports = {
  userRegister,
  userLogin,
  fetchedUser
};
