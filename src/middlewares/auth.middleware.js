import { ApiError } from "../utils/ÀpiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import Admin from "../models/admin.model.js";

// export const auth = asyncHandler(async(req, _, next) => {
//     try {
        
//         const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "") || req.body
        
//         // console.log(token);
//         if (!token) {
//             throw new ApiError(401, "Unauthorized request")
//         }
    
//         const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

//         const admin= await Admin.findByPk(decodedToken?.Id, {
//             attributes: { exclude: ['Password', 'Refresh_Token'] }
//         });
    
//         if (!admin) {
            
//             throw new ApiError(401, "Invalid Access Token")
//         }
//         // console.log("Auth middleware ",admin)
//         req.user = admin;
//         next()
//     } catch (error) {
//         throw new ApiError(401, error?.message || "Invalid access token")
//     }
    
// })

// import jwt from 'jsonwebtoken';
// import asyncHandler from '../utils/asyncHandler.js';
// import ApiError from '../utils/ApiError.js';
// import { Admin } from '../models';

export const auth = asyncHandler(async (req, res, next) => {
  let accessToken = req.cookies?.accessToken;
  console.log("request at auth",req.body)

  if (!accessToken) {
    throw new ApiError(401, 'Access token missing');
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const admin = await Admin.findByPk(decoded?.Id, {
      attributes: { exclude: ['Password', 'Refresh_Token'] }
    });

    if (!admin) throw new ApiError(401, 'Invalid access token');
    req.user = admin;
    return next();
  } catch (err) {
    // Allow frontend to refresh
    res.status(401).json({ success: false, message: 'Access token expired' });
  }
});
