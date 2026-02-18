const mongoose = require("mongoose");

const userShema = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:[true, "This email is already exist please try another email"],
    },
    password:String,
});

const userModel = mongoose.model("users", userShema);

module.exports = userModel