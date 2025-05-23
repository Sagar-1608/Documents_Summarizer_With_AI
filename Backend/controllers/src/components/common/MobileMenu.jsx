// import React, { useRef, useState } from 'react'
// import useOnClickOutside from './useOnClickOutside'
// import { VscChromeClose ,VscMenu } from 'react-icons/vsc'
// import MobileNav from './MobileNav'


// export default function MobileMenu() {
//   const [open, setOpen] = useState(false)
//   const ref = useRef(null)
//   useOnClickOutside(ref, () => setOpen(false))
//   return (
//     <div>

//     <button className="relative text-richblack-100 " onClick={(e) =>{

//         setOpen(!open)
//     } }>
//     <div>
//     {
//       open? (<VscChromeClose fontSize={30} fill="#AFB2BF"/>):(<VscMenu fontSize={30} fill="#AFB2BF" /> )
//     }
  

//     </div>

//     </button>
//       {open && (

         
//               <div   onClick={(e) => e.stopPropagation()} className="fixed z-50  h-screen w-[60vw] bg-richblack-800 left-0 top-14 transition-all duration-[1s] overflow-y-hidden "
//                ref={ref}>
//                <MobileNav setOpen={setOpen}/>

//               </div>
//     )
//       }
//     </div>
//   )
// }
import { useRef, useState } from "react"
import { VscChromeClose, VscMenu } from "react-icons/vsc"
import useOnClickOutside from './useOnClickOutside'
import Sidebar from "../core/DashboardPage/Sidebar"

export default function MobileMenu() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useOnClickOutside(ref, () => setOpen(false))

  return (
    <div className="relative z-50 flex  w-full " ref={ref}>
      <div  className=" flex items-center justify-around  space-x-36 w-full ">
        <button
        className=" text-richblack-100 z-50"
        onClick={(e) => {
          e.stopPropagation()
          setOpen((prev) => !prev)
        }}
      >
        {open ? (
          <VscChromeClose fontSize={30} fill="#023E8A" />
        ) : (
          <VscMenu fontSize={30} fill="#023E8A" />
        )}
      </button>
      <div className=" w-full  flex  items-center justify-end space-x-2  ">
        <img
          src="/Logo.png"
          alt="Hindalco Logo"
          className=" h-4 w-8"
        />
        <h1 className=" font-bold text-white">Belagavi Intranet Portal</h1>
      </div></div>

      {/* Overlay menu */}
      <div
        className={`fixed  top-11 left-0 h-screen w-[60vw] transition-transform duration-200 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar/>
      </div>
    </div>
  )
}
