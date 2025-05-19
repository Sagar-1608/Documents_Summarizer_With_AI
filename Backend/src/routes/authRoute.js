
import { Router } from "express";
import {getLoggedInAdmin, loginUser, logoutUser, registerUser,refreshAccessToken,} from '../controllers/auth.controller.js';
import { auth } from "../middlewares/auth.middleware.js";
import { resetPassword, resetPasswordToken } from "../controllers/resetPassword.controller.js";
const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(auth,logoutUser)
router.route("/refreshtoken").get(refreshAccessToken)
router.route("/me").get(auth,getLoggedInAdmin)

router.route("/resetpasswordtoken").post(resetPasswordToken)
router.route("/resetpassword").post(resetPassword)
export default router