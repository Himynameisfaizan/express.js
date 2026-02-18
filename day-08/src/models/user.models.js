const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "with is username user already exist try to new one!"],
    requred: [true, "username is required"],
  },

  email: {
    type: String,
    unique: [
      true,
      "with this email user is already exist try to another email!",
    ],
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
