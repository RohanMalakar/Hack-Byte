import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import {emailValidate,passwordValidate} from "../helper/constants.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import generateUniqueUserName from "../utils/generateUniqueUserName.js";



const createAcount =asyncHandler(async(req,res)=>{

    const {name,email,password,mobile_number}=req.body;

    if (!name || !email || !password) {
        throw new ApiError(404,"All fields are required")
    }

    // if (password.length < 6) {
    //     throw new ApiError(404,"Password must be at least 6 characters");
    // }
    // if (!email.match(emailValidate)) {
    //     throw new ApiError(404,"Enter correct email formate") ;
    //  }
     
   

     let Existuser = await User.findOne({
        email
     })
     if(Existuser){
        throw new ApiError(404,"email already exists");
     }
     
    const user_profileFilePath = req.files?.user_profile && req.files.user_profile.length > 0
    ? req.files.user_profile[0].path
    : "";
    let user_profile=null;
    if(user_profileFilePath){ 
        user_profile=await uploadOnCloudinary(user_profileFilePath);
        if(!user_profile){
            throw new ApiError(500,"Something went wrong while uploading user_profile");
        }
    }
   
    
    const user_name=await generateUniqueUserName(name);
    
    if (!user_name) {
        throw new ApiError(500,"Something went wrong while generating user name");
    }
    
     const user=await User.create({
        mobile_number:mobile_number || null,
        user_name,
        name,
        email,
        password,
        user_profile:user_profile || null,
        is_verified:false,
        is_blocked:false,
    });

    console.log("user is ", user);
    
    await user.save();
    const accessToken= await user.generateAccessToken(); 
    
    res.cookie("accessToken",accessToken,{
        httpOnly:true,
        secure:true,
        sameSite:true,
        maxAge:1000*60*60*24*30,
    });

    await user.save();
    user.password=undefined;
    res.json(new ApiResponse(201,user,"User created successfully"));
});
const login=asyncHandler(async(req,res)=>{  

    const {user_name,email,password}=req.body;
    
    console.log("login body",req.body);
    
    if (!email ) {
        throw new ApiError(404,"email or user_name is requird");
    }

    if(!password) {
        throw new ApiError(404,"password is required");
    }
    
//     if (password.length < 6) {
//       throw new ApiError(404,"Password must be at least 6 characters");
//     }
//    if (email && !email.match(emailValidate)) {
//      throw new ApiError(404,"Enter correct email formate");
//    }
   

    const user=await User.findOne({email}).select("+password");

    if (!user) {
        throw new ApiError(404,"User not found");
    }

    console.log("user", user);

    const isMatch=await user.comparePassword(password);

    if (!isMatch) {
        throw new ApiError(404,"Invalid email or password");
    }
   

    const accessToken=await user.generateAccessToken(); 
    if (!accessToken) {
        throw new ApiError(500,"Something went wrong while generating access token");
    }

    res.cookie("accessToken",accessToken,{
        httpOnly:true,
        sameSite:true,
        secure:true
    });

    await user.save();
    user.password=undefined;

    res.json(new ApiResponse(200,user,"User login successfully"));
    
});
const logout=asyncHandler(async(req,res)=>{
    // const user_name=req.user.user_name;
    // const user=await User.findOne({user_name});
    // if (!user) throw new ApiError(404,"unauthorised Access");
    // await user.save();
    const option={
        secure:true,
        httpOnly:true,
        sameSite:true
    }
    req.cookies.accessToken && res.clearCookie("accessToken",option);
    res.json(new ApiResponse(200,"User logout successfully"));
});
const getProfile=asyncHandler(async(req,res)=>{
    const userId=req.user.id;
     if(!userId){
        throw new ApiError(500,"userId is required");
     }

    const user=await User.findById(userId); 

    if (!user) {
      throw new ApiError(404,"User not found");
     }

    res.json(new ApiResponse(200,user,"User details"));

});
const editProfile=asyncHandler(async(req,res)=>{
    const user_name=req.user.user_name;
    const {mobile_number}=req.body;
    const user=await User.findById(user_name);
    if(!user){
        throw new ApiError(404,"User not found");
    }
    
    if (mobile_number) {
        const Existuser = await User.findOne({
            mobile_number,
          });   
        if (Existuser) {
            throw new ApiError(404,"mobile_number already exists");
        }
       user.mobile_number=mobile_number;
    }
    

    const user_profileFilePath = req.files?.user_profile && req.files.user_profile.length > 0
    ? req.files.user_profile[0].path
    : "";
    
    if (user_profileFilePath) {
        const user_profile = await uploadOnCloudinary(user_profileFilePath);
        user.user_profile = user_profile;
    }
    await user.save();
    user.password=undefined;
    res.json(new ApiResponse(200,user,"user details edited successfully"));
});
const resetPassword=asyncHandler(async(req,res)=>{
    const user_name=req.user.user_name;
    const {oldPassword,newPassword}=req.body;
    const user=await User.findById(user_name).select("+password");
    if(!user){
        throw new ApiError(404,"User not found");
    }
    
    if (oldPassword) {
    //   const isMatch=await user.comparePassword(oldPassword);

    //   if (!isMatch) {
    //       throw new ApiError(404,"Invalid  password");
    //   }
    //   if (newPassword.length < 6) {
    //       throw new ApiError(404,"Password must be at least 6 characters");
    //   }
    //   if (!newPassword.match(passwordValidate)) {
    //       throw new ApiError(404,"Enter correct password formate");
    // }
       user.password=newPassword;
    }
    await user.save();
    user.password=undefined;
    res.json(new ApiResponse(200,user,"user's password updated successfully"));
});


export {createAcount,login,logout,getProfile,editProfile,resetPassword};
