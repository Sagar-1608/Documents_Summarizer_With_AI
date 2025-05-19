import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { login } from "../services/operations/authApi";
import { useNavigate } from "react-router-dom";


export default function LoginPage() {
    // const [showPassword, setShowPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false)
    const [passwordValue, setPasswordValue] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        // console.log(data)
        // try {
        //   const response = await axios.post("https://your-api-url.com/api/login", data);
        //   console.log("Login successful:", response.data);
        // } catch (error) {
        //   console.error("Login failed:", error.response?.data || error.message);
        // }
        dispatch(login(data, navigate))
    };

    return (

        <>
            <style>
                {`
        input::-ms-reveal,
        input::-ms-clear,
        input::-webkit-credentials-auto-fill-button {
          display: none !important;
        }import { Dispatch } from './../../node_modules/redux/src/types/store';

      `}
            </style>
            <div className="min-h-screen bg-blue-100 flex items-center justify-center font-sans">
                <div className="w-full max-w-md">
                    {/* Logo Section */}
                    <div className="text-center mb-8">
                        <h1 className="text-blue-700 text-4xl font-bold ">
                            Belagavi Intranet Portal
                        </h1>
                        <p className="text-blue-800 mt-2">Admin Portal</p>
                    </div>

                    {/* Login Card */}
                    <div className="bg-white rounded-lg shadow-xl p-8 border border-gray-300">
                        <h2 className="text-2xl font-semibold text-blue-800 mb-6">
                            Sign in to your account
                        </h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {/* Email */}
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-blue-800 mb-2">
                                    User Name
                                </label>
                                <div className="relative">
                                    <i className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"> <FaUser /></i>
                                    <input
                                        id="username"
                                        {...register("username", { required: "User name required" })}
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-700 text-sm text-gray-700"
                                        placeholder="Enter your username"
                                    />
                                </div>
                                {errors.username && (
                                    <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-blue-800 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <i className=" absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"> <FaLock /></i>

                                    <input

                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        onChange={(e) => setPasswordValue(e.target.value)}
                                        {...register("password", {
                                            required: "Password is required",
                                            onChange: (e) => setPasswordValue(e.target.value),
                                          })}

                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-700 text-sm text-gray-700"
                                        placeholder="Enter your password"
                                    />
                                    {passwordValue.length > 0 &&
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((prev) => !prev)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>

                                    }


                                </div>
                                {errors.password && (
                                    <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                                )}

                            </div>

                            {/* Remember & Forgot */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-700 border-gray-300 rounded cursor-pointer"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-blue-800 cursor-pointer">
                                        Remember me
                                    </label>
                                </div>
                                <a
                                    href="#"
                                    className="text-sm text-blue-700 hover:text-blue-800 cursor-pointer whitespace-nowrap"
                                >
                                    Forgot password?
                                </a>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition-colors duration-200 whitespace-nowrap cursor-pointer"
                            >
                                Sign in
                            </button>
                        </form>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-blue-800">
                            &copy; {new Date().getFullYear()} Bbelagavi Intranet Portal. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>

        </>
    );
}
