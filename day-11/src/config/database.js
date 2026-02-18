const mongoose = require("mongoose");

function connectToDb(req, res){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log('database is connected');
    }).catch(()=>{
        console.log('something went wrong in DB');
    });
}

module.exports = connectToDb