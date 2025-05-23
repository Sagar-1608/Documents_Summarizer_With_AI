import React from "react";

export default function Error({ error }) {

  console.log("Received error in <Error />:", error);

  

  
  return (
    <div className="bg-[#FFE5E5] border border-[#FF6B6B] text-[#B00020] px-6 py-4 rounded-xl my-6 max-w-xl mx-auto shadow-lg flex items-start space-x-3">
      <svg
        className="w-6 h-6 text-[#B00020] flex-shrink-0 mt-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
        />
      </svg>
      <div>
        <h3 className="font-semibold text-lg mb-1">
          Oops! Something went wrong
        </h3>
        <p className="text-sm">{error}</p>
      </div>
    </div>
  );
   

}


