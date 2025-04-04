import {Router} from "express";
import {upload} from "../middlewares/multer.middleware.js";
import { isloggedIn} from "../middlewares/auth.middleware.js";
import {createPost} from "../controllers/post.controller.js";
const postRouter=Router();

postRouter.post("/create",upload.fields([
    {name:"post_media",maxCount:5}
]),isloggedIn,createPost)


export default postRouter;

