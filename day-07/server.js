require("dotenv").config()
const app = require("./src/app");
const connectToDb = require("./src/config/database");

connectToDb();
const port = 3000

app.listen(port, ()=>{
    console.log('server is running in port 3000');
})

