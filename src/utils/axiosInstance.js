// import axios from "axios";
// import { logout } from "../services/operations/authApi"; 
// import { authEndpoints } from "../services/apis";
// import { useNavigate } from "react-router-dom";
// const {
//   REFRESH_TOKEN_API,
// } = authEndpoints

// const navigate = useNavigate()
// export const axiosInstance = axios.create({
//   withCredentials: true, // important for sending cookies
// });

// let isRefreshing = false;

// axiosInstance.interceptors.response.use(
//   res => res,
//   async (err) => {
//     const originalRequest = err.config;

//     // If access token expired and not already retrying
//     if (err.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       if (!isRefreshing) {
//         isRefreshing = true;
//         try {
//           await axiosInstance.get(REFRESH_TOKEN_API); // hit backend to refresh token
//           isRefreshing = false;
//           return axiosInstance(originalRequest);
//         } catch (refreshError) {
//           isRefreshing = false;
//           logout(navigate); // trigger logout
//           return Promise.reject(refreshError);
//         }
//       }
//     }

//     return Promise.reject(err);
//   }
// );


// services/apiconnector.js
import axios from "axios";

export const axiosInstance = axios.create({
  withCredentials: true,
});

export let setSessionExpiredUI = () => {};

axiosInstance.interceptors.response.use(
  res => res,
  async (err) => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Trigger session expired UI
      setSessionExpiredUI(true);

      return Promise.reject(err); // Do not retry automatically
    }

    return Promise.reject(err);
  }
);
