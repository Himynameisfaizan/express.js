const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: [true, "caption is required for creating post"],
  },

  imgUrl: {
    type: String,
    required: [true, "image is required for creating post"],
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [true, "this is reqiuired"],
  },
});

const postModel = mongoose.model("post", postSchema);

module.exports = postModel;
