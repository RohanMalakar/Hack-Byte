import blog from "../models/blog.model.js";
import mongoose from "mongoose";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
const createblog = async (req, res) => {
  try {
    const { title, description, type, image } = req.body;

    if (!title || !description || !type ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const blogImagepath = req.files?.blogImage && req.files.blogImage.length > 0
    ? req.files.blogImage[0].path
    : "";
    let blogImage=null;
    if(blogImagepath){ 
        blogImage=await uploadOnCloudinary(path);
        if(!blogImage){
            throw new ApiError(500,"Something went wrong while uploading blogImage");
        }
    }
   

    const blog = new blog({
      title,
      description, 
      type, 
      image: blogImage || null,
    });
    await blog.save();

    return res.status(200).json({ message: "blog form submitted successfully", data: req.body });
  } catch (error) {
    console.error("Error in createblog:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

const getAllblog = async (req, res) => {
  try {
    const blog = await blog.find({}).sort({ createdAt: -1 });
    return res.status(200).json({ message: "blog data fetched successfully", data: blog });
  } catch (error) {
    console.error("Error in getblog:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

const deleteblog = async (req, res) => {
  try {
    const { blogId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    await blog.findByIdAndDelete(blogId);
    return res.status(200).json({ message: "Contact Us entry deleted successfully" });
  } catch (error) {
    console.error("Error in deleteblog:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

const getblog = async (req, res) => {
  try {
    const { blogId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const blogData = await blog.findById(blogId);
    if (!blogData) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json({ message: "Blog data fetched successfully", data: blogData });
  } catch (error) {
    console.error("Error in getblog:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export { createblog, getblog, deleteblog, getAllblog };