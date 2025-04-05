import mongoose from "mongoose";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import Tag from "../models/tag.model.js";
import Post from "../models/post.model.js";
import ApiResponse from "../utils/ApiResponse.js";

const createTag = asyncHandler(async (req, res) => {
  const { post_id, ngo_id } = req.body;

  if (!post_id || !ngo_id) {
    throw new ApiError(400, "Post ID and NGO ID are required");
  }

  const tag = await Tag.create({
    post_id,
    ngo_id,
  });

  return res.status(201).json(new ApiResponse(tag));
}
);

const getPostIdByNgoId = asyncHandler(async (req, res) => {
    const { ngo_id } = req.body;
  
    if (!ngo_id) {
      throw new ApiError(400, "NGO ID is required");
    }
  
    // Find tags by NGO ID
    const tags = await Tag.find({ ngo_id });
    if (!tags || tags.length === 0) {
      throw new ApiError(404, "No tags found for this NGO");
    }
  
    // Extract post IDs from the tags
    const postIds = tags.map(tag => tag.post_id);
  
    // Filter posts with status 'unsolved'
    const unsolvedPosts = await Post.find({
      _id: { $in: postIds },
      status: "unsolved"
    }).select("_id");
  
    const unsolvedPostIds = unsolvedPosts.map(post => post._id);
  
    return res.status(200).json(new ApiResponse(200, unsolvedPostIds, "Unsolved posts fetched"));
  });

export {createTag, getPostIdByNgoId};

 