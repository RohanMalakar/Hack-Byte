import {Router} from "express";
import { createAcount,login,logout,getProfile,editProfile } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js";
import { isloggedIn } from "../middlewares/auth.middleware.js";
import { 
    loginWithGoogle, 
    googleCallback, 
    googleAuthFailure,
    googleLogout 
} from "../controllers/googleAuthController.js";
const userRouter=Router();

userRouter.post("/register",upload.fields([
    {name:"user_profile",maxCount:1}
]),createAcount)

userRouter.post("/login",login);
userRouter.get("/logout",logout);
userRouter.get("/profile",isloggedIn,getProfile);
userRouter.put("/editProfile",isloggedIn,editProfile);


// Google auth routes
userRouter.get("/google", loginWithGoogle);
userRouter.get("/google/callback", googleCallback);
userRouter.get("/google/failure", googleAuthFailure);
userRouter.get("/google/logout", isloggedIn, googleLogout);
export default userRouter;

