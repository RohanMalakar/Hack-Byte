import Like from "../models/like.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const toggleLike = asyncHandler(async (req, res) => {
  const { post_id } = req.body;

  if (!post_id) {
    throw new ApiError(400, "Post ID is required");
  }

  console.log("req user is ", req.user);

  const existingLike = await Like.findOne({
    post_id,
    user_name: req.user.user_name,
  });

  if (existingLike) {
    await Like.deleteOne({ _id: existingLike._id });
    return res.json(new ApiResponse(200, null, "Like removed successfully"));
  }

  await Like.create({
    post_id,
    userId: req.user._id,
    user_name: req.user.user_name,
  });

  res.json(new ApiResponse(200, null, "Like created successfully"));
});

const getLikes = asyncHandler(async (req, res) => {
  const { post_id } = req.params;

  if (!post_id) {
    throw new ApiError(400, "Post ID is required");
  }

  const likes = await Like.find({ post_id });

  res.json(new ApiResponse(200, likes, "likes"));
});

const getLikesCount = asyncHandler(async (req, res) => {
  const { post_id } = req.params;

  if (!post_id) {
    throw new ApiError(400, "Post ID is required");
  }

  const likesCount = await Like.countDocuments({ post_id });

  res.json(new ApiResponse(200, likesCount, "likes count"));
});

const isLiked = asyncHandler(async (req, res) => {
  const { post_id } = req.params;

  if (!post_id) {
    throw new ApiError(400, "Post ID is required");
  }

  const existingLike = await Like.findOne({
    post_id,
    user_name: req.user.user_name,
  });

  res.json(new ApiResponse(200, existingLike ? true : false, "likes"));
}
);

export { toggleLike, getLikes, getLikesCount, isLiked };
