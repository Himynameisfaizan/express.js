const mongoose = require("mongoose");

function connectToDb() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("databse is connected");
    })
    .catch(() => {
      console.log("something went wrong in DB");
    });
}

module.exports = connectToDb;
