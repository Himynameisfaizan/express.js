const express = require("express");
const authRouter = require("./routes/auth.routes");
const cookieParser = require("cookie-parser");

const app = express()

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);

app.get("/home", (req, res)=>{
    res.json("hello world");
})

app.get("/app", (req, res)=>{
    res.json("hello this is app file");
})

module.exports = app