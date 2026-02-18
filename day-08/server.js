require("dotenv").config();
const app = require("./src/app");
const database = require("./src/config/database");

database()
const port = 3000;

app.listen(port, ()=>{
    console.log('server is running in port 3000');
});