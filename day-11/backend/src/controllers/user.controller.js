const followModel = require("../models/follow.model");

async function followRequest(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  if (followerUsername === followeeUsername) {
    return res.status(400).json({
      message: "you can not follow your self",
    });
  }

  const isFolloweeExist = await followModel.findOne({
    username: followeeUsername
  });

  if(!isFolloweeExist){
    return res.status(404).json({
        message: "Followee not found"
    })
  }

  const isAlreadyFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (isAlreadyFollowing) {
    return res.status(200).json({
      message: `you already following ${followeeUsername}`,
      follow: isAlreadyFollowing,
    });
  }

  const followRecord = await followModel.create({
    follower: followerUsername,
    followee: followeeUsername,
  });

  res.status(201).json({
    message: `you are now following ${followeeUsername}`,
    followRecord,
  });
}


async function unfollowUser(req,res){
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    const isFollowing = await followModel.findOne({
        follower:followerUsername, 
        followee:followeeUsername
    });

    if(!isFollowing){
        return res.status(404).json({
            message: `you are not following ${followeeUsername}`
        })
    }

    await followModel.findByIdAndDelete(isFollowing._id);

    res.status(201).json({
        message: `You unfollow this user ${followeeUsername}`
    })
}
module.exports = {
  followRequest, unfollowUser
};
