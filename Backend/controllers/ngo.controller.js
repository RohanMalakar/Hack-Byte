import NGO from "../models/ngo.model.js"; 
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import generateUniqueNGOName from "../utils/generateUniqueNGOID.js";

// Create NGO Account
const createAccount = asyncHandler(async (req, res) => {
    const { name, email, password, description, website } = req.body;

    if (!name || !email || !password || !description) {
        throw new ApiError(400, "All required fields must be filled");
    }

    let existingNGO = await NGO.findOne({ email });
    if (existingNGO) {
        throw new ApiError(400, "Email already exists");
    }

    // Handle NGO logo upload if provided
    const logoFilePath = req.files?.logo && req.files.logo.length > 0 ? req.files.logo[0].path : "";
    let logo_url = null;

    if (logoFilePath) {
        logo_url = await uploadOnCloudinary(logoFilePath);
        if (!logo_url) {
            throw new ApiError(500, "Error uploading logo");
        }
    }

    const ngoUniqueName = await generateUniqueNGOName(name);

    const ngo = await NGO.create({
        ngo_id: ngoUniqueName, 
        name,
        email,
        password,
        description,
        website: website || null,
        logo_url: logo_url || null,
        is_verified: "not_verified",
    });

    await ngo.save();
    ngo.password = undefined;

    res.json(new ApiResponse(201, ngo, "NGO account created successfully"));
});

// NGO Login
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const ngo = await NGO.findOne({ email }).select("+password");

    if (!ngo) {
        throw new ApiError(404, "NGO not found");
    }

    const isMatch = await ngo.comparePassword(password);

    if (!isMatch) {
        throw new ApiError(401, "Invalid email or password");
    }

    const accessToken = await ngo.generateAccessToken();

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: true,
    });

    ngo.password = undefined;
    res.json(new ApiResponse(200, ngo, "NGO logged in successfully"));
});

// NGO Logout
const logout = asyncHandler(async (req, res) => {
    res.clearCookie("accessToken", {
        secure: true,
        httpOnly: true,
        sameSite: true,
    });

    res.json(new ApiResponse(200, "NGO logged out successfully"));
});

// Get NGO Profile
const getProfile = asyncHandler(async (req, res) => {
    const ngoId = req.user.id;

    if (!ngoId) {
        throw new ApiError(400, "NGO ID is required");
    }

    const ngo = await NGO.findById(ngoId);

    if (!ngo) {
        throw new ApiError(404, "NGO not found");
    }

    res.json(new ApiResponse(200, ngo, "NGO profile retrieved successfully"));
});

// Edit NGO Profile
const editProfile = asyncHandler(async (req, res) => {
    const ngoId = req.user.id;
    const { name, description, website } = req.body;

    let ngo = await NGO.findById(ngoId);
    if (!ngo) {
        throw new ApiError(404, "NGO not found");
    }

    if (name) ngo.name = name;
    if (description) ngo.description = description;
    if (website) ngo.website = website;

    // Handle logo update
    const logoFilePath = req.files?.logo && req.files.logo.length > 0 ? req.files.logo[0].path : "";
    if (logoFilePath) {
        const logo_url = await uploadOnCloudinary(logoFilePath);
        ngo.logo_url = logo_url;
    }

    await ngo.save();
    res.json(new ApiResponse(200, ngo, "NGO profile updated successfully"));
});

// Reset NGO Password
const resetPassword = asyncHandler(async (req, res) => {
    const ngoId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    let ngo = await NGO.findById(ngoId).select("+password");
    if (!ngo) {
        throw new ApiError(404, "NGO not found");
    }

    const isMatch = await ngo.comparePassword(oldPassword);
    if (!isMatch) {
        throw new ApiError(401, "Incorrect current password");
    }

    if (newPassword.length < 6) {
        throw new ApiError(400, "New password must be at least 6 characters");
    }

    ngo.password = newPassword;
    await ngo.save();
    ngo.password = undefined;
    

    res.json(new ApiResponse(200, ngo, "Password updated successfully"));
});

const getAllNgo = asyncHandler(async (req, res) => {
    const ngosData = await NGO.find({ }).select("-password");
    if (!ngosData) {
        throw new ApiError(404, "No NGOs found");
    }
    
    const ngos = ngosData.map((ngo) => {
        return {
            ngo_id: ngo.ngo_id
        }
    });


    res.json(new ApiResponse(200, ngos, "All NGOs retrieved successfully"));
});



export { createAccount, login, logout, getProfile, editProfile, resetPassword,getAllNgo};
