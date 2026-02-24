const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    unique: [true, "username should be true"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "email should be true"],
  },
  password: String,
  bio: {
    type: String,
    required: [true, "bio is required"],
  },
  profileImage: {
    type: String,
    required: [true, "image is required"],
    default: "https://ik.imagekit.io/vy6pjubcng/user.avif",
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
