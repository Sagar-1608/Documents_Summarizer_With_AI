import Admin from "../models/admin.model.js"
import { ApiError } from "../utils/ÀpiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { Op } from "sequelize";
import jwt from "jsonwebtoken"


const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const admin = await Admin.findByPk(userId)
        const accessToken = admin.generateAccessToken()
        const refreshToken = admin.generateRefreshToken()

        admin.Refresh_Token = refreshToken
        await admin.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        console.log(error)
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const generateAccessToken = async(userId) =>{
    try {
        const admin = await Admin.findByPk(userId)
        const accessToken = admin.generateAccessToken()

        return {accessToken}


    } catch (error) {
        console.log(error)
        throw new ApiError(500, "Something went wrong while generating access token")
    }
}

const registerUser = asyncHandler( async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res
    console.log("register Controler")

    const {Emp_Id, Emp_Name, Email_Id,User_Id,Password} = req.body
  

    if (!Emp_Id|| ! Emp_Name|| ! Email_Id|| !User_Id|| !Password)
    {
        throw new ApiError(400, "All fields are required")
    }

    // console.log(Emp_Id, Emp_Name, Email_Id,User_Id,Password)
    
    const existedUser = await Admin.findOne({
      where: {
        [Op.or]: [
          { Emp_Id: Emp_Id },
          { User_Id: User_Id.toLowerCase()},
          { Email_Id: Email_Id }
        ]
      }
    });
    

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }

    const user = await Admin.create({
        Emp_Id, 
        Emp_Name, 
        Email_Id,
        User_Id:User_Id.toLowerCase(),
        Password,
        
    })

    const createdUser = await Admin.findByPk(user.Id, {
        attributes: { exclude: ['Password', 'Refresh_Token','Token','Reset_Password_Expires','End_Date'] }
    });

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
    

} )

const loginUser = asyncHandler(async (req, res) =>{
    // req body -> data
    // username or email
    //find the user
    //password check
    //access and referesh token
    //send cookie
 
    const {username ,password } = req.body
    const User_Id = username
    const Password = password

    if (!User_Id || !Password) {
        throw new ApiError(400, "Username And Pasword are required")
    } 


    const admin = await Admin.findOne({ where: { User_Id:User_Id.toLowerCase()} });
  

    if (!admin) {
        throw new ApiError(404, "Admin does not exist")
    }

   const isPasswordValid = await admin.isPasswordCorrect(Password)

   if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials")
    }
   
   const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(admin.Id)

    const loggedInAdmin = await Admin.findByPk(admin.Id, {
        attributes: { exclude: ['Password', 'Refresh_Token'] }
    });
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                admin: loggedInAdmin, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )

})

const logoutUser = asyncHandler(async (req, res) => {
    const userId = req.user.Id;

    // Find the admin by primary key
    const admin = await Admin.findByPk(userId);

    if (!admin) {
        throw new ApiError(404, "User not found");
    }

    // Remove refresh token
    admin.Refresh_Token = null;

    await admin.save();

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'None' // if using cookies in cross-origin frontend/backend
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out successfully"));
});


const refreshAccessToken = asyncHandler(async (req, res) => {
    
  const incomingRefreshToken = req.cookies.refreshToken;
 

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
   
    const decoded = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    const admin = await Admin.findByPk(decoded?.Id);

    if (!admin || incomingRefreshToken !== admin.Refresh_Token) {
      throw new ApiResponse(405, "Invalid refresh token");
    }

    const { accessToken } = await generateAccessToken(admin.Id);

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .json(new ApiResponse(200, {}, "Access token refreshed"));
  } catch (err) {

    throw new ApiError(405, "Refresh token expired or invalid");
  }
});

// controllers/admin/getLoggedInAdmin.js
const getLoggedInAdmin = asyncHandler(async (req, res) => {
    console.log("auth me trigered")
  const admin = req.user; // Populated from auth middleware

  if (!admin) {
    return res.status(401).json(new ApiResponse(401, null, "Unauthorized"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { admin }, "Admin details fetched"));


});










const changeCurrentPassword = asyncHandler(async(req, res) => {
    const {oldPassword, newPassword} = req.body
    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password")
    }

    user.password = newPassword
    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"))
})

const updateAccountDetails = asyncHandler(async(req, res) => {
    const {fullName, email} = req.body

    if (!fullName || !email) {
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullName,
                email: email
            }
        },
        {new: true}
        
    ).select("-password")

    return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"))
});




export {
    registerUser,
    loginUser,
    logoutUser,
    getLoggedInAdmin,
    refreshAccessToken,
    changeCurrentPassword,
    updateAccountDetails,
}


