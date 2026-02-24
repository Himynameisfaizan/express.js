const express = require("express");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const postRouter = express.Router();

const postController = require("../controllers/post.controller");
const identifyUser = require("../middlewares/auth.middleware");

postRouter.post("/", identifyUser, upload.single("image"), postController.createPost);
postRouter.get("/", identifyUser, postController.fetchedPost);
// postRouter.get("/details/:postId", identifyUser, postController.fetchedById);
postRouter.post("/like/:userId", identifyUser, postController.likePost);

module.exports = postRouter;
