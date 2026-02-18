const express = require("express");
const cookieParser = require("cookie-parser");
const authRouer = require("./routes/auth.route");
const postRouter = require("./routes/post.route");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouer);
app.use("/api/posts", postRouter);

module.exports = app;
