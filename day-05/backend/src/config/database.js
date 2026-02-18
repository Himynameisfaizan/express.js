const mongoose = require("mongoose");

function connectToDb(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("server is connected to database");
    })
}

module.exports = connectToDb