// import { useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import useOnClickOutside from "../../common/useOnClickOutside"; 
// import { logout } from "../../../services/operations/authApi"; 
// import { VscDashboard, VscSignOut } from "react-icons/vsc";
// import { AiOutlineCaretDown } from "react-icons/ai";

// export default function ProfileDropdown() {
//   const { user } = useSelector((state) => state.profile);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(false);
//   const ref = useRef(null);

//   useOnClickOutside(ref, () => setOpen(false));

//   if (!user) return null;

//   return (
//     <button className="relative" onClick={() => setOpen(true)}>
//       <div className="flex items-center gap-x-2 hover:bg-blue-200 rounded-lg p-2">
//         <div className="w-8 h-8 rounded-full bg-[#0077B6] flex items-center justify-center text-white font-medium">
//           {user?.firstName?.[0] || "S"}
//         </div>
//         <span className="text-[#023E8A]  font-semibold ">{user?.firstName || "Sagar Jadhav "}</span>
//         <AiOutlineCaretDown className="text-sm text-[#023E8A]" />
//       </div>

//       {open && (
//         <div
//           className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-[#D9E2EC] z-50"
//           ref={ref}
//         >
//           <button
//             onClick={() => {
//               navigate("/dashboard/my-profile");
//               setOpen(false);
//             }}
//             className="flex w-full items-center px-4 py-2 text-sm text-[#023E8A] hover:bg-[#F0F4F8]"
//           >
//             <VscDashboard className="mr-2 text-lg" />
//             Dashboard
//           </button>
//           <hr className="my-2 border-[#D9E2EC]" />
//           <button
//             onClick={() => {
//               dispatch(logout(navigate));
//               setOpen(false);
//             }}
//             className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-[#F0F4F8]"
//           >
//             <VscSignOut className="mr-2 text-lg" />
//             Logout
//           </button>
//         </div>
//       )}
//     </button>
//   );
// }


import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useOnClickOutside from "../../common/useOnClickOutside";
import { logout } from "../../../services/operations/authApi";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { AiOutlineCaretDown } from "react-icons/ai";

export default function ProfileDropdown() {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);


  const userData = JSON.parse(localStorage.getItem("user")); // Replace "user" with your actual key
  const empName = userData?.Emp_Name;
  useOnClickOutside(ref, () => setOpen(false));

  if (!user) return null;

  return (
    <button className="relative" onClick={() => setOpen(true)}>
      <div className="flex items-center gap-x-2 hover:bg-blue-200 rounded-lg p-2">
        <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-white font-medium">
          {empName?.[0]}
        </div>
        <span className="text-blue-800 font-semibold">
          {empName}
        </span>
        <AiOutlineCaretDown className="text-sm text-blue-800" />
      </div>

      {open && (
        <div
          className="absolute right-0 left-10 mt-1  w-35 bg-white rounded-lg shadow-lg py-1 border border-gray-300 z-50"
          ref={ref}
        >
          {/* <button
            onClick={() => {
              navigate("/dashboard/dashboard-info");
              setOpen(false);
            }}
            className="flex w-full items-center px-4 py-[4px] text-sm text-blue-800 hover:bg-gray-200"
          >
            
            <VscDashboard className="mr-2 text-lg" />
            Dashboard
          </button> */}

           <Link to="/dashboard/dashboard-info" onClick={() => setOpen(false)}>
            <div className="flex w-full items-center px-4 py-[4px] text-sm text-blue-800 hover:bg-gray-200">
              <VscDashboard className=" mr-2 text-lg" />
              Dashboard
            </div>
          </Link>
          <hr className="my-2 border-gray-300" />
          <button
            onClick={() => {
              dispatch(logout(navigate));
              setOpen(false);
            }}
            className="flex w-full items-center px-4 py-[2px] text-sm text-red-600 hover:bg-gray-200"
          >
            <VscSignOut className="mr-2 text-lg" />
            Logout
          </button>
        </div>
      )}
    </button>
  );
}
