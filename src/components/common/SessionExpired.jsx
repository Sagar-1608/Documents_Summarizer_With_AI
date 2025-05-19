// components/SessionExpired.jsx
import { useState } from "react";
import { axiosInstance } from "../../services/apiconnector";
import { logout } from "../../services/operations/authApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

function SessionExpired() {
  const navigate = useNavigate();

  const handleRefresh = async () => {
    try {
     const reasult = await axiosInstance.get("/auth/refreshtoken");
     console.log(reasult)
      window.location.reload(); 
    } catch (err) {
      // console.error("Refresh token failed:", err);
    toast.error("Your Session Expired !!!")
    navigate("/login"); 
    window.location.reload();
   
     
      
    }
  };
  

  return (
    <div className=" max-w-screen max-h-screen fixed inset-0  bg-opacity-50 flex items-center justify-center z-50  bg-transparent  backdrop-blur-md">
      <div className="bg-white text-black p-6 rounded-xl shadow-xl w-full max-w-md text-center space-y-4 border-1 border-gray-500">
        <h2 className="text-xl font-semibold">Session Expired</h2>
        <p>Your access token has expired. Click below to stay logged in.</p>
        <button
          onClick={handleRefresh}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          Stay Logged In
        </button>
      </div>
    </div>
  );
}

export default SessionExpired;
