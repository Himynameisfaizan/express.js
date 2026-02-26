const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "username sholud be unique"],
    required: [true, "username is required"],
  },
  email: {
    type: String,
    unique: ["true", "this email is already in use"],
    required: [true, "email is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  bio: {
    type: String,
    required: [true, "bio is required"],
  },
  profileImage: {
    type: String,
    default: "https://ik.imagekit.io/vy6pjubcng/user.avif",
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
