import {Router} from "express";
import {  createAccount, login, logout, getProfile, editProfile, getAllNgo } from "../controllers/ngo.controller.js";
import {upload} from "../middlewares/multer.middleware.js";
import { isloggedIn,isloggedInNGO } from "../middlewares/auth.middleware.js";

const ngoRouter=Router();

ngoRouter.post("/register",upload.fields([
    {name:"logo",maxCount:1}
]),createAccount)

ngoRouter.post("/login",login);
ngoRouter.get("/logout",isloggedInNGO,logout);
ngoRouter.get("/profile",isloggedInNGO,getProfile);
ngoRouter.put("/editProfile",isloggedInNGO,editProfile);
ngoRouter.get("/getallngo",isloggedIn,getAllNgo);

export default ngoRouter;

