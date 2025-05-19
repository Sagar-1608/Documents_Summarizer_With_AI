
import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/core/DashboardPage/Sidebar'
import Navbar from '../components/common/Navbar'
import Loding from '../components/common/Loding'
export default function Dashboard() {


  const { loading: authLoading } = useSelector((state) => state.auth)
  const { loading: profileLoading } = useSelector((state) => state.profile)

  // if (authLoading || profileLoading) {
  //   return (
  //  <Loding/>
  //   )
  // }

  return (
    <>
    <Navbar/>
   
    <div className=" flex h-screen bg-gray-100 text-blue-800">
      <div className=' hidden md:flex'>
         <Sidebar />
      </div>
     
      <main className="md:ml-52 flex-1 p-8 overflow-auto ">
        <div className=' h-14'></div>
        <Outlet />
      </main>
    </div>
    {/* <div className=" flex h-screen bg-gray-100 text-blue-800">
      
      
      <main className=" flex-1 p-8 overflow-auto">
        <div className=' h-14'></div>
        <Outlet />
      </main>
    </div> 
    */}
    </>

  )

}


 {/* <div className=' flex flex-col '>
      <div className='h-14'></div>

      <div className=" relative flex h-[calc(100vh-3.5rem)]  ">
        <Sidebar />

        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto ">
          <div className="mx-auto w-11/12 max-w-[1000px] py-10">
            <Outlet />
          </div>
        </div>

      </div>

    </div> */}
