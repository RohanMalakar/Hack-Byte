import { Router } from "express";
import {toggleLike, getLikes, getLikesCount, isLiked} from "../controllers/like.controller.js"
import { isloggedIn } from "../middlewares/auth.middleware.js";
const likeRouter = Router();

likeRouter.post("/togglelike", isloggedIn, toggleLike);
likeRouter.get("/getlikes/:post_id", getLikes);
likeRouter.get("/getlikescount/:post_id", getLikesCount);
likeRouter.get("/isliked/:post_id", isloggedIn, isLiked);

export default likeRouter;