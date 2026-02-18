require("dotenv").config();
const app = require("./src/app");
const connectToDb = require("./src/config/database");

const port = 3000;

connectToDb();
app.listen(3000, () => {
  console.log("server is running in 3000 port");
});
