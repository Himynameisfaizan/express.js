const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const client = new ImageKit({
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
    user: req.user.id,
    imgUrl: file.url,
  });

  res.status(201).json({
    message: "post created successfully",
    post,
  });
}

async function fetchedPost(req, res) {
  const userId = req.user.id;

  const post = await postModel.find({ user: userId });

  if (!post) {
    return res.status(404).json({
      message: "post not found",
    });
  }

  res.status(200).json({
    message: "post fetched successfully",
    post,
  });
}

// async function fetchedById(req, res) {
//   const userId = req.user.id;
//   const postId = req.params.postId;

//   const post = await postModel.findById(postId);

//   if (!post) {
//     return res.status(404).json({
//       message: "post is not founded",
//     });
//   }

//   const isValidUser = post.user.toString() === userId;

//   if (!isValidUser) {
//     return res.status(403).json({
//       message: "forbidden content",
//     });
//   }

//   res.status(200).json({
//     message: "post fetched successfully",
//     post,
//   });
// }

async function likePost(req, res) {
    const reqUserId = req.user.id;
    const userId = req.params.userId;

    const post = await postModel.findById({id:userId});

    if(!post){
        return res.status(404).json({
            message: "post not found",
        });
    }

    
}

module.exports = {
  createPost,
  fetchedPost,
  likePost,
};
