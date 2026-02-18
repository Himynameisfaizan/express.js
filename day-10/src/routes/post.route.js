const express = require("express");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const postController = require("../controllers/post.controller");
const postRouter = express.Router();

postRouter.post("/", upload.single("image"), postController.createPost);

module.exports = postRouter;
