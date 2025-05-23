import { NavLink, useNavigate } from 'react-router-dom';
import { FaChartLine, FaFolder, FaExchangeAlt } from 'react-icons/fa';
import { logout } from '../../../services/operations/authApi';
import { useDispatch } from 'react-redux';
import { VscSignOut } from 'react-icons/vsc';

export default function Sidebar() {
   const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <aside className=" w-52 fixed md:top-14 left-0 h-full bg-white shadow-md z-50 border-r border-blue-300">
      <div className="p-4 text-blue-800 text-xl font-bold">Admin Panel</div>
      <div className='  w-full  h-[0.01rem] bg-blue-400 '></div>
      <nav className="mt-4 space-y-2 text-sm">
        <NavLink
          to="/dashboard/dashboard-info"
          className={({ isActive }) =>
            `block px-6 py-3 hover:bg-blue-100 text-blue-800 ${isActive ? 'bg-blue-200 font-semibold' : ''}`
          }
        >
          <FaChartLine className="inline-block mr-2" /> Dashboard
        </NavLink>
        <NavLink
          to="/dashboard/category-management"
          className={({ isActive }) =>
            `block px-6 py-3 hover:bg-blue-100 text-blue-800 ${isActive ? 'bg-blue-200 font-semibold' : ''}`
          }
        >
          <FaFolder className="inline-block mr-2" /> Categories
        </NavLink>
        <NavLink
          to="/dashboard/transaction-management"
          className={({ isActive }) =>
            `block px-6 py-3 hover:bg-blue-100 text-blue-800 ${isActive ? 'bg-blue-200 font-semibold' : ''}`
          }
        >
          <FaExchangeAlt className="inline-block mr-2" /> Transaction
        </NavLink>

 <div className=' md:hidden mt-8  w-full  h-[0.01rem] bg-blue-400 '></div>
        <div className=' md:hidden '>
          <button
                      onClick={() => {
                        dispatch(logout(navigate));
                       
                      }}
                      className="flex w-full items-center px-4 py-[2px] text-sm text-red-600 hover:bg-gray-200"
                    >
                      <VscSignOut className="mr-2 text-lg" />
                      Logout
                    </button>

        </div>
      </nav>
    </aside>
  );
}
