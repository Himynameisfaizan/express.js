const postModel = require("../models/post.model");
const likeModel = require("../models/like.model");
const jwt = require("jsonwebtoken");
const imageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const client = new imageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPost(req, res) {
  
  const file = await client.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
    folder: "insta-clone",
  });

  const post = await postModel.create({
    id: req.body.id,
    caption: req.body.caption,
    imgUrl: file.url,
    user: req.user.id,
  });

  res.status(201).json({
    message: "post created successfully",
    post,
  });
}

async function accessPostById(req, res) {
  const userId = req.body.id;

  const post = await postModel.find({ user: userId });

  res.status(200).json({
    message: "post fetched successfully by id",
    post,
  });
}

async function getPostDetails(req, res) {
  const userId = req.user.id;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "post is not founded",
    });
  }

  const isValidUser = post.user.toString() === userId;

  if (!isValidUser) {
    return res.status(403).json({
      message: "forbidden content",
    });
  }

  res.status(200).json({
    message: "post fetched successfully",
    post,
  });
}

async function likePost(req, res) {
  const username = req.user.username;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: `post not found by ${postId}`,
    });
  }

  const like = await likeModel.create({
    post: postId,
    user: username,
  });

  
  res.status(200).json({
    message: `you like the post of ${postId}`,
    like,
  });
}

module.exports = {
  createPost,
  accessPostById,
  getPostDetails,
  likePost,
};
