import { useEffect, useState } from 'react'
import './App.css'
import { Route, Routes } from "react-router-dom";
import LoginPage from './pages/LoginPage'
import PublicPage from './pages/PublicPage'
import OpenRoute from './components/core/Auth/OpenRoute';
import PrivateRoute from './components/core/Auth/PrivateRoute'
import Dashboard from './pages/Dashboard';
import DashboardInfo from './components/core/DashboardPage/DashboardInfo';

import Error from './components/common/Error';
import CategoryManagement from './components/core/DashboardPage/CategoryManagement';
import SessionExpired from "./components/common/SessionExpired";
import { setSessionExpiredHandler } from "./services/apiconnector";
import TransactionManagement from './components/core/DashboardPage/TransactionManagement';

function App() {

  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    // console.log("Main page useeffect")
    setSessionExpiredHandler(setSessionExpired);
  }, []);


  return (
    <div className="w-screen min-h-screen flex-col overflow-x-hidden ">
     

   
      <Routes>

        <Route path="/" element={<PublicPage />} />
        <Route path="login" element={<LoginPage />}/>


        {/* <Route path='/dashboard' element={<Dashboard/>}> 
        <Route path="dashboard-info" element={<DashboardInfo/>}/>
        <Route path="category-management" element={<CategoryManagement/>}/>
        <Route path="transaction-management" element={<TransactionManagement/>}/>
        </Route> */}




        {/* private route for only logged in users  */}
        {<Route element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }>

          <Route path="dashboard/dashboard-info" element={<DashboardInfo />} />
          <Route path="dashboard/category-management" element={<CategoryManagement />} />
          <Route path='dashboard/transaction-management' element={<TransactionManagement/>}/>


        </Route>} 







        <Route path="*" element={<Error />} />
      </Routes>
 {sessionExpired && (<SessionExpired />)}
    </div>
  )
}

export default App


