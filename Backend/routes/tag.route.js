import { Router } from "express";
import { createTag, getPostIdByNgoId } from "../controllers/tag.controller.js";
import { isloggedInNGO } from "../middlewares/auth.middleware.js";
const tagRouter = Router();

tagRouter.post("/get_tagged_post", isloggedInNGO, getPostIdByNgoId);

export default tagRouter;