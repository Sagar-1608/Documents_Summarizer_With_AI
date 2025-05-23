// const BASE_URL = import.meta.env.VITE_BASE_URL;

// Auth Endpoints

export const authEndpoints = {
  SENDOTP_API:"/auth/sendotp",
  SIGNUP_API:"/auth/signup",
  LOGIN_API:"/auth/login",
  LOGOUT_API: "/auth/logout",
  REFRESH_TOKEN_API:"/auth/refreshtoken",
  RESET_PASSWORD_TOKEN_API:"/auth/reset-password-token",
  RESET_PASSWORD_API:"/auth/reset-password",
};

// Profile Endpoints
export const profileEndpoints = {
  CONTACT_US_API:  "/profile/contactUs",
  GET_USER_DETAILS_API:  "/profile/getUserDetails",
  GET_USER_ENROLLED_COURSES_API:  "/profile/getEnrolledCourses",
  GET_INSTRUCTOR_STATISTICS_API:"/profile/instructorDashboard"

};

// Setting Endpoints

export const settingsEndpoints = {
  UPDATE_PROFILE_PICTURE_API:  "/profile/updatedProfilePicture",
  UPDATE_PROFILE_API:  "/profile/updateProfile",
  CHANGE_PASSWORD_API:  "/profile/changePassword",
  DELETE_PROFILE_API:  "/profile/deleteAccount",
};
export const categoryEndpoints = {
  GET_CATEGORY_API :"/private/category/",
  CREATE_CATEGORY_API :"/private/category",
  UPDATE_CATEGORY_API :"/private/category/",
  DELETE_CATEGORY_API :"/private/category/",
};



