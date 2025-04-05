import { Router } from "express";
import {toggleLike, getLikes} from "../controllers/like.controller.js"
import { isloggedIn } from "../middlewares/auth.middleware.js";
const likeRouter = Router();

likeRouter.post("/togglelike", isloggedIn, toggleLike);
likeRouter.get("/getlikes", getLikes);

export default likeRouter;