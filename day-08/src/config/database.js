const mongoose = require("mongoose");

function connectToDb(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("database is connected");
    }).catch(()=>{
        console.log("something goes wrong");
    })
}

module.exports = connectToDb