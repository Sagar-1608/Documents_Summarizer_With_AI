


// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { setToken } from "../slices/authSlice";

// // 🔵 Create Axios instance
// export const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_BASE_URL,
//   withCredentials: true, // ✅ Important for sending HTTP-only cookies
// });




// // 🔁 External controller for UI state (used in interceptor)
// export let setSessionExpiredUI = ( val) => {
// const dispatch = useDispatch()
// dispatch(setToken(true))
// console.log("expired token")
// };

// // 🔁 Interceptor for handling 401 (expired access token)
// axiosInstance.interceptors.response.use(
  
//   res => res,
//   async (err) => {
//     const originalRequest = err.config;
//     console.log("org",err.config)
//     console.log("ins",err.response?.status)
//     if (err.response?.status === 401 ) {
      
//       originalRequest._retry = true;

//       setSessionExpiredUI(true);

//       return Promise.reject(err);
//     }

//     return Promise.reject(err);
//   }
// );

// // 🔧 Reusable API connector function
// export const apiConnector = (method, url, bodyData = null, headers = null, params = null) => {
// return axiosInstance({
//     method,
//     url,
//     data: bodyData,
//     headers,
//     params,
//   });
// };


import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

// 🔄 This will be a reference to a UI handler from inside React component
let sessionExpiredHandler = null;

// 👇 This setter will be called from inside a React component
export const setSessionExpiredHandler = (fn) => {
  sessionExpiredHandler = fn;
};

// 🔁 Axios interceptor
axiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (err.response?.status === 401 ) {
      // originalRequest._retry = true;

      if (sessionExpiredHandler) {
        sessionExpiredHandler(true); // trigger modal from React
      }

      return Promise.reject(err);
    }

    return Promise.reject(err);
  }
);

// 📦 API connector
export const apiConnector = (method, url, bodyData = null, headers = null, params = null) => {
  return axiosInstance({
    method,
    url,
    data: bodyData,
    headers,
    params,
  });
};
