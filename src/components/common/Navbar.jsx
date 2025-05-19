// import { useState } from "react";

// export default function Navbar({ handleLogout }) {
//   const [showProfileDropdown, setShowProfileDropdown] = useState(false);

//   return (
//     <nav className="bg-primary px-6 py-4 flex items-center justify-between fixed w-full top-0 z-50 shadow-lg">
//       {/* Logo and Title */}
//       <div className="flex items-center space-x-4">
//         <img
//           src="https://readdy.ai/api/search-image?query=hindalco%20v6%20logo%20modern%20minimalist%20design%20on%20white%20background%20professional%20clean%20corporate%20identity&width=120&height=40&seq=2&orientation=landscape"
//           alt="Hindalco Logo"
//           className="h-8"
//         />
//         <h1 className="text-2xl font-bold text-white">Intranet Portal</h1>
//       </div>

//       {/* Notification and Profile */}
//       <div className="flex items-center space-x-6">
//         {/* Notification Bell */}
//         <button className="relative focus:outline-none">
//           <i className="fas fa-bell text-secondary text-xl hover:text-accent transition-colors"></i>
//           <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
//             3
//           </span>
//         </button>

//         {/* Profile Dropdown */}
//         <div className="relative">
//           <button
//             onClick={() => setShowProfileDropdown(!showProfileDropdown)}
//             className="flex items-center space-x-3 hover:bg-muted rounded-lg p-2 transition-colors"
//           >
//             <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
//               <span className="text-white font-medium">A</span>
//             </div>
//             <span className="text-secondary font-medium">Admin</span>
//             <i className="fas fa-chevron-down text-secondary text-sm"></i>
//           </button>

//           {/* Dropdown Menu */}
//           {showProfileDropdown && (
//             <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-border z-50">
//               <a
//                 href="#"
//                 className="block px-4 py-2 text-sm text-secondary hover:bg-muted"
//               >
//                 <i className="fas fa-user-circle mr-2"></i>Profile
//               </a>
//               <a
//                 href="#"
//                 className="block px-4 py-2 text-sm text-secondary hover:bg-muted"
//               >
//                 <i className="fas fa-cog mr-2"></i>Settings
//               </a>
//               <hr className="my-2 border-border" />
//               <button
//                 onClick={handleLogout}
//                 className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-muted"
//               >
//                 <i className="fas fa-sign-out-alt mr-2"></i>Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }



// import ProfileDropdown from "../core/Auth/ProfileDropdown";

// export default function Navbar() {
//   return (
//   <nav className="bg-[#00A2E0] px-6 py-1 flex items-center justify-between fixed w-full top-0 z-50 shadow-lg">
//       {/* Logo & Title */}
//       <div className="flex items-center space-x-4">
//         <img
//           src="/Logo.png"
//           alt="Hindalco Logo"
//           className="h-8"
//         />
//         <h1 className="text-2xl font-bold text-white">Belagavi Intranet Portal</h1>
//       </div>

//       {/* Right Section */}
//       <div className="flex items-center space-x-6">
//         {/* Bell Icon */}
//         {/* <button className="relative">
//           <i className="fas fa-bell text-[#023E8A] text-xl hover:text-[#0077B6]"></i>
//           <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
//             3
//           </span>
//         </button> */}

//         {/* Profile Dropdown */}
//         <ProfileDropdown/>
//       </div>
//     </nav>
//   );
// }


import ProfileDropdown from "../core/Auth/ProfileDropdown";
import { useAuth } from "../../hooks/useAuth";
import MobileMenu from "./MobileMenu";
export default function Navbar() {
  const isAuthenticated = useAuth()
  return (
    <nav className="bg-blue-brand px-4 md:px-6 py-1 flex items-center justify-between fixed w-full top-0 z-50 shadow-lg">
      {/* Logo & Title */}
      <div className="md:flex items-center space-x-4 hidden">
        <img
          src="/Logo.png"
          alt="Hindalco Logo"
          className="h-8"
        />
        <h1 className="text-2xl font-bold text-white">Belagavi Intranet Portal</h1>
      </div>

      {/* Right Section */}
      <div className=" items-center space-x-6 hidden md:block">
        {/* Profile Dropdown */}
        <ProfileDropdown />
      </div>

      <div className=" md:hidden ">
  
          <MobileMenu/>
    </div>
    </nav>
  );
}
