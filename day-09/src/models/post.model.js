const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    caption:{
        type:String,
        required:[true, "caption is required you have to fill out!"],
    },
    imgUrl:{
        type:String,
        required:[true, "image is required"],
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users ",
        required:[true, "this is required"]
    }
});

const postModel = mongoose.model("posts", postSchema);

module.exports = postModel