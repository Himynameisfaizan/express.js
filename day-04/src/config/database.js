const mongoose = require("mongoose")

const ConnectToDb = ()=>{
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("dataabse is connected");
    })
}

module.exports = ConnectToDb