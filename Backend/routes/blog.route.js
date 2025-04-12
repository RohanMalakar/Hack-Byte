import {createblog, getblog, deleteblog,getAllblog } from "../controllers/blog.controller.js";
import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
const blogRouter = Router();

blogRouter.post("/create",upload.fields([
    {name:"blogImage",maxCount:1}
]), createblog);
blogRouter.get("/get/:blogId", getblog);
blogRouter.delete("/delete/:blogId", deleteblog);
blogRouter.get("/get_all_blogs", getAllblog);

export default blogRouter;