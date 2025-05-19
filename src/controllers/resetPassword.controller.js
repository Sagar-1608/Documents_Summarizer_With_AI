//Reset Password Token

// const { mailSender } = require("../utils/mailSender");
// const {resetPassword} = require("../MailFormat/resetPassword")

import bcrypt from "bcryptjs";
import crypto from "crypto";
import Admin from "../models/admin.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ÀpiError.js"; 
import { ApiResponse } from "../utils/ApiResponse.js";
import dotenv from 'dotenv';
dotenv.config();

// Controller to generate reset password token
export const resetPasswordToken = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        throw new ApiError(400, "Email is required");
    }

    const admin = await Admin.findOne({ where: { Email_Id: email } });

    if (!admin) {
        throw new ApiError(404, "Admin does not exist for this email");
    }

    const token = crypto.randomUUID();

    admin.Token = token;
    admin.Reset_Password_Expires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
    await admin.save({ validateBeforeSave: false })

    console.log(token)

    // const url = `${process.env.FRONTEND_RESET_PASSWORD_URL}${token}`;
    // await mailSender(email, "Reset Your Password", resetPassword(email, url));

    res.status(200).json(
        new ApiResponse(200, {}, "Mail sent successfully, check your mail")
    );
});


// Controller to reset password
export const resetPassword = asyncHandler(async (req, res) => {
    const { password, confirmPassword, token } = req.body;

    if (!password || !confirmPassword || !token) {
        throw new ApiError(400, "All fields are required");
    }

    if (password !== confirmPassword) {
        throw new ApiError(400, "Passwords do not match");
    }

    const admin = await Admin.findOne({ where: { Token: token } });

    if (!admin) {
        throw new ApiError(401, "Invalid or expired token");
    }

    if (admin.Reset_Password_Expires < new Date()) {
        throw new ApiError(401, "Reset session expired");
    }

    admin.Password = await bcrypt.hash(password, 10);
    admin.Token = null;
    admin.Reset_Password_Expires = null;
    await admin.save();

    res.status(200).json(
        new ApiResponse(200, {}, "Password reset successfully")
    );
});
