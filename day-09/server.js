require("dotenv").config();
const app = require("./src/app");
const databse = require("./src/config/database");

databse();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("server is running in port 3000");
});
