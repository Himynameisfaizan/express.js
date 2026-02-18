require('dotenv').config()

const app = require('./src/app');
const mongoose = require('./src/config/database');

mongoose()

app.listen(3000, ()=>{
    console.log("server in running in port 3000");
})