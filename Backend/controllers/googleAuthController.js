import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import passport from "passport";



// Google authentication handlers
const loginWithGoogle = (req, res, next) => {
    passport.authenticate("google", { 
        scope: ["profile", "email"],
        // Add error handling for the initial redirect
        failureRedirect: "/user/google/failure"
    })(req, res, next);
};

const googleCallback = asyncHandler(async (req, res, next) => {
    passport.authenticate("google", async (err, user, info) => {
        try { 
            // Handle various error scenarios
            console.log(err, user, info);
            if (err) {
                return res.redirect(`${process.env.FRONTEND_URL}/login?error=${encodeURIComponent('Authentication failed')}`);
            }  
            if (!user) {
                return res.redirect(`${process.env.FRONTEND_URL}/login?error=${encodeURIComponent('No user data received')}`);
            }

            // Generate access token
            const accessToken = await user.generateAccessToken();

            // Set cookie
            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: true,
                maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
            });

            // Successful authentication
            res.redirect(`${process.env.FRONTEND_URL}/dashboard`);

        } catch (error) {
            // Handle unexpected errors
            console.error("Google Auth Error:", error.message);
            res.redirect(`${process.env.FRONTEND_URL}/login?error=${encodeURIComponent('Server error during authentication')}`);
        }
    })(req, res, next);
});

// Add a failure handler
const googleAuthFailure = (req, res) => {
    res.redirect(`${process.env.FRONTEND_URL}/login?error=${encodeURIComponent('Google authentication failed')}`);
};

const googleLogout = asyncHandler(async (req, res) => {
    try {

        const options = {
            secure: true,
            httpOnly: true,
            sameSite: true
        };

        // Clear cookie
        res.clearCookie("accessToken", options);

        // Clear passport session
        req.logout((err) => {
            if (err) {
                return res.status(500).json(
                    new ApiResponse(500, null, "Error during logout")
                );
            }
            res.json(
                new ApiResponse(200, null, "Successfully logged out from Google")
            );
        });

    } catch (error) {
        res.status(500).json(
            new ApiResponse(500, null, "Internal server error during logout")
        );
    }
});

export { 
    loginWithGoogle, 
    googleCallback,
    googleAuthFailure,
    googleLogout 
};
