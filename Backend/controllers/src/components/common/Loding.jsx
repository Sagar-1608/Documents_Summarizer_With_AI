import React from 'react'

export default function Loding() {
  return (
  <div className="fixed inset-0 flex flex-col justify-center items-center bg-white z-50">
    <svg
      className="animate-spin h-10 w-10 text-[#0077B6] mb-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>  
    <span className="text-[#0077B6] font-semibold text-xl animate-pulse">
      Loading...
    </span>
  </div>


  )
}
