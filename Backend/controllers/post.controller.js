import Post from "../models/post.model.js";
import Media from "../models/media.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Tag from "../models/tag.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import sendMail from "../utils/sendMail.utills.js";
import generateNgoTagNotificationHTML from "../helper/Mails/ngoTagMessage.js"
import NGO from "../models/ngo.model.js";
import mongoose from "mongoose";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


const createPost = async (req, res) => {
    const { title, description,tag=[],anonymous} = req.body;

    if (!title || !description ) {
        throw new ApiError(400, "Title and description are required");
    }

    const post = await Post.create({
        title,
        description,
        user_name: req.user.user_name,
        media: [],
        anonymous: anonymous || false,
    });
    
    if(req.files?.post_media && req.files.post_media.length > 0){
        for(let i=0;i<req.files.post_media.length;i++){
            let post_media=await uploadOnCloudinary(req.files.post_media[i].path);
            if(!post_media){
                throw new ApiError(500,"Something went wrong while uploading post_media");
            }
            post.media.push(post_media);
            // await Media.create({
            //     post_id: post._id,
            //     link: post_media,
            //     type: "img",
            //     order: i + 1, 
            // });
          }
    }
    

    for(let i=0;i<tag.length;i++){
        await Tag.create({
            post_id: post._id,
            tag: tag[i],
        });
        const ngo=await NGO.findOne({ngo_id:tag[i]});
        if(!ngo){
            throw new ApiError(404,"ngo not found please tag a right ngo")
        }
        const ngoTagMessage=generateNgoTagNotificationHTML(ngo.name,ngo.email,"");

        // await sendMail({
        //     to: ngo.email,
        //     subject: "people tag you in a post",
        //     text: ngoTagMessage,
        // });
    }
    res.status(201).json(new ApiResponse(201, post, "Post created successfully"));
}


const getPost = async (req, res) => {
    const { post_id } = req.params;

    if (!post_id) {
        throw new ApiError(400, "Post ID is required");
    }

    const post = await Post.findById(post_id).populate("user_name").sort({ createdAt: -1 });
    if (!post) {
        throw new ApiError(404, "Post not found");
    }

    const tags = await Tag.find({ post_id });
    res.json(new ApiResponse(200, { post, media, tags }, "Post retrieved successfully"));
}

const getAllPosts = async (req, res) => {
    const posts = await Post.find().populate("user_name").sort({ createdAt: -1 });
    if (!posts) {
        throw new ApiError(404, "Posts not found");
    }

    res.json(new ApiResponse(200, posts, "Posts retrieved successfully"));
}

// const updatePost = async (req, res) => {
//     const { post_id } = req.params;
//     const { title, description, anonymous } = req.body;

//     if (!post_id) {
//         throw new ApiError(400, "Post ID is required");
//     }

//     const post = await Post.findById(post_id);
//     if (!post) {
//         throw new ApiError(404, "Post not found");
//     }

//     post.title = title || post.title;
//     post.description = description || post.description;
//     post.anonymous = anonymous || post.anonymous;
//     post.updatedAt = Date.now();

//     await post.save();

//     res.json(new ApiResponse(200, post, "Post updated successfully"));
// }

export {createPost,getPost,getAllPosts} ;