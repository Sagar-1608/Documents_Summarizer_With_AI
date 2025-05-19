// import React, { useEffect, useState } from "react";
// import { FaTimes } from "react-icons/fa";

// const ViewTransactionModal = ({ modalData }) => {
//     console.log("modal", modalData)
    

//     const formatDate = (dateStr) => {
//         const date = new Date(dateStr);
//         return date.toLocaleDateString("en-GB"); // DD/MM/YYYY
//     };

//     return (
//         <div
//             className="fixed inset-0 bg-opacity-40 bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-md"
//             onClick={modalData.btn1Handler}
//         >
//             <div
//                 className="max-h-[80vh] bg-white w-full rounded-2xl  max-w-md p-6  border border-gray-500 shadow-lg overflow-y-auto  [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
//                 onClick={(e) => e.stopPropagation()}
//             >
//                 {/* Header */}
//                 <div className="flex justify-between items-center mb-4 border-b pb-3 border-gray-300">
//                     <h3 className="text-xl font-semibold text-[#023E8A]">Transaction Details</h3>
//                     <button
//                         onClick={modalData.btn1Handler}
//                         className="text-gray-400 hover:text-gray-600"
//                     >
//                         <FaTimes />
//                     </button>
//                 </div>

//                 {/* Body */}
//                 {!transaction ? (
//                     <p className="text-center text-sm text-gray-600">Loading...</p>
//                 ) : (
//                     <div className="space-y-6 text-sm">
//                         {/* Image */}
//                         <div className="flex justify-center">
//                             <img
//                                 src={`http://127.0.0.1:5500/backend${transaction.Folder_Path}`}
//                                 alt="Preview"
//                                 className="h-32 w-48 rounded-md object-cover"
//                             />
//                         </div>

//                         {/* Details */}
//                         {/* <div className=" flex flex-col gap-y-3">
//                             <div className=" flex justify-evenly">
//                                 <div>
//                                     <p className="text-gray-500 font-medium">Upload Title</p>
//                                     <p className="mt-1 text-[#023E8A]">{transaction.Upload_Title}</p>
//                                 </div>

//                                 <div>
//                                     <p className="text-gray-500 font-medium">Category</p>
//                                     <p className="mt-1 text-[#023E8A]">{transaction.Category_Name}</p>
//                                 </div>
//                             </div>

//                             <div className="col-span-2  ml-16">
//                                 <p className="text-gray-500 font-medium">Description</p>
//                                 <p className="mt-1 text-[#023E8A]">{transaction.Upload_Description}</p>
//                             </div>


//                             <div className=" flex  justify-evenly">
//                                 <div>
//                                     <p className="text-gray-500 font-medium">Status</p>
//                                     <span
//                                         className={`mt-1 inline-block px-2 py-1 rounded-full text-xs ${new Date(transaction.End_Date) > new Date()
//                                             ? "bg-[#2AAA6D] text-white"
//                                             : "bg-red-100 text-red-600"
//                                             }`}
//                                     >
//                                         {new Date(transaction.End_Date) > new Date()
//                                             ? "Active"
//                                             : "Inactive"}
//                                     </span>
//                                 </div>

//                                 <div>
//                                     <p className="text-gray-500 font-medium">End Date</p>
//                                     <p className="mt-1 text-[#023E8A]">{formatDate(transaction.End_Date)}</p>
//                                 </div>
//                             </div>

//                             <div className=" flex  justify-evenly">
//                                 <div>
//                                     <p className="text-gray-500 font-medium">Created By</p>
//                                     <p className="mt-1 text-[#023E8A]">{transaction.Created_By}</p>
//                                 </div>

//                                 <div>
//                                     <p className="text-gray-500 font-medium">Updated By</p>
//                                     <p className="mt-1 text-[#023E8A]">{transaction.Updated_By}</p>
//                                 </div>

//                             </div>

//                             <div className=" flex  justify-evenly">
//                                 <div>
//                                     <p className="text-gray-500 font-medium">Created Date</p>
//                                     <p className="mt-1 text-[#023E8A]">{formatDate(transaction.Created_Date)}</p>
//                                 </div>

//                                 <div>
//                                     <p className="text-gray-500 font-medium">Updated Date</p>
//                                     <p className="mt-1 text-[#023E8A]">{formatDate(transaction.Updated_Date)}</p>
//                                 </div>

//                             </div>
//                         </div> */}
//                         <div className=" flex items-center justify-center">
//                             <div className="grid grid-cols-2 gap-6 gap-x-20  ">
//                             <div className="flex flex-col  text-left">
//                                 <p className="text-gray-500 font-medium">Upload Title</p>
//                                 <p className="mt-1 text-[#023E8A]">{transaction.Upload_Title}</p>
//                             </div>

//                             <div className="flex flex-col  text-left">
//                                 <p className="text-gray-500 font-medium">Category</p>
//                                 <p className="mt-1 text-[#023E8A]">{transaction.Category_Name}</p>
//                             </div>

//                             <div className="col-span-2 flex flex-col  text-left">
//                                 <p className="text-gray-500 font-medium">Description</p>
//                                 <p className="mt-1 text-[#023E8A]">{transaction.Upload_Description}</p>
//                             </div>

//                             <div className="flex flex-col  text-left ">
//                                 <p className="text-gray-500 font-medium">Status</p>
//                                 <span
//                                     className={`mt-1 px-2 py-1 rounded-full text-xs text-center ${new Date(transaction.End_Date) > new Date()
//                                             ? "bg-[#2AAA6D] text-white"
//                                             : "bg-red-100 text-red-600"
//                                         }`}
//                                 >
//                                     {new Date(transaction.End_Date) > new Date()
//                                         ? "Active"
//                                         : "Inactive"}
//                                 </span>
//                             </div>

//                             <div className="flex flex-col  text-left">
//                                 <p className="text-gray-500 font-medium">End Date</p>
//                                 <p className="mt-1 text-[#023E8A]">{formatDate(transaction.End_Date)}</p>
//                             </div>

//                             <div className="flex flex-col  text-left">
//                                 <p className="text-gray-500 font-medium">Created By</p>
//                                 <p className="mt-1 text-[#023E8A]">{transaction.Created_By}</p>
//                             </div>

//                             <div className="flex flex-col  text-left">
//                                 <p className="text-gray-500 font-medium">Updated By</p>
//                                 <p className="mt-1 text-[#023E8A]">{transaction.Updated_By}</p>
//                             </div>

//                             <div className="flex flex-col  text-left">
//                                 <p className="text-gray-500 font-medium">Created Date</p>
//                                 <p className="mt-1 text-[#023E8A]">{formatDate(transaction.Created_Date)}</p>
//                             </div>

//                             <div className="flex flex-col  text-left">
//                                 <p className="text-gray-500 font-medium">Updated Date</p>
//                                 <p className="mt-1 text-[#023E8A]">{formatDate(transaction.Updated_Date)}</p>
//                             </div>
//                         </div>

//                         </div>
//                     </div>
//                 )}

//                 {/* Footer */}
//                 <div className="mt-4 flex justify-center">
//                     <button
//                         onClick={modalData.btn1Handler}
//                         className="px-4 py-2 bg-[#0077B6] text-white rounded-lg hover:bg-[#023E8A] text-sm"
//                     >
//                         Close
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ViewTransactionModal;

import React from "react";
import { FaTimes } from "react-icons/fa";

const ViewTransactionModal = ({ modalData }) => {
    const transaction = modalData?.data;

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-GB"); // DD/MM/YYYY
    };

    return (
        <div
            className="fixed inset-0 bg-opacity-40 bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-md"
            onClick={modalData.btn1Handler}
        >
            <div
                className="max-h-[80vh] bg-white w-full rounded-2xl max-w-md p-6 border border-gray-500 shadow-lg overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-4 border-b pb-3 border-gray-300">
                    <h3 className="text-xl font-semibold text-[#023E8A]">Transaction Details</h3>
                    <button
                        onClick={modalData.btn1Handler}
                        className="text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                        <FaTimes />
                    </button>
                </div>

                {/* Body */}
                {!transaction ? (
                    <p className="text-center text-sm text-gray-600">Loading...</p>
                ) : (
                    <div className="space-y-6 text-sm">
                        {/* Image */}
                        <div className="flex justify-center">
                            <img
                                src={`http://127.0.0.1:5500/backend${transaction.Folder_Path}`}
                                alt="Preview"
                                className="h-32 w-48 rounded-md object-cover"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6 gap-x-20">
                            <div className="flex flex-col text-left">
                                <p className="text-gray-500 font-medium">Upload Title</p>
                                <p className="mt-1 text-[#023E8A]">{transaction.Upload_Title}</p>
                            </div>

                            <div className="flex flex-col text-left">
                                <p className="text-gray-500 font-medium">Category</p>
                                <p className="mt-1 text-[#023E8A]">
                                    {transaction?.Category?.Category_Name || "N/A"}
                                </p>
                            </div>

                            <div className="col-span-2 flex flex-col text-left">
                                <p className="text-gray-500 font-medium">Description</p>
                                <p className="mt-1 text-[#023E8A]">{transaction.Upload_Description}</p>
                            </div>

                            <div className="flex flex-col text-left">
                                <p className="text-gray-500 font-medium">Status</p>
                                <span
                                    className={`mt-1 px-2 py-1 rounded-full text-xs text-center ${
                                        new Date(transaction.End_Date) > new Date()
                                            ? "bg-[#2AAA6D] text-white"
                                            : "bg-red-100 text-red-600"
                                    }`}
                                >
                                    {new Date(transaction.End_Date) > new Date()
                                        ? "Active"
                                        : "Inactive"}
                                </span>
                            </div>

                            <div className="flex flex-col text-left">
                                <p className="text-gray-500 font-medium">End Date</p>
                                <p className="mt-1 text-[#023E8A]">{formatDate(transaction.End_Date)}</p>
                            </div>

                            <div className="flex flex-col text-left">
                                <p className="text-gray-500 font-medium">Created By</p>
                                <p className="mt-1 text-[#023E8A]">{transaction.Created_By}</p>
                            </div>

                            <div className="flex flex-col text-left">
                                <p className="text-gray-500 font-medium">Updated By</p>
                                <p className="mt-1 text-[#023E8A]">{transaction.Updated_By}</p>
                            </div>

                            <div className="flex flex-col text-left">
                                <p className="text-gray-500 font-medium">Created Date</p>
                                <p className="mt-1 text-[#023E8A]">{formatDate(transaction.Created_Date)}</p>
                            </div>

                            <div className="flex flex-col text-left">
                                <p className="text-gray-500 font-medium">Updated Date</p>
                                <p className="mt-1 text-[#023E8A]">{formatDate(transaction.Updated_Date)}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Footer */}
                <div className="mt-4 flex justify-center">
                    <button
                        onClick={modalData.btn1Handler}
                        className="px-4 py-2 bg-[#0077B6] text-white rounded-lg hover:bg-[#023E8A] text-sm cursor-pointer"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewTransactionModal;

