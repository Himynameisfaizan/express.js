const express = require("express");
const authRouter = require("./routes/auth.route");
const coockieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(coockieParser());


app.use("/api/auth", authRouter);


module.exports = app;
