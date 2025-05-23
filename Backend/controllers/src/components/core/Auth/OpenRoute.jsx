// // This will prevent authenticated users from accessing this route
// import { useSelector } from "react-redux"
// import { Navigate } from "react-router-dom"

// function OpenRoute({ children }) {
//   const { token } = useSelector((state) => state.auth)

//   if (token === null) {
//     return children
//   } else {
//     return <Navigate to="/dashboard/dashboardinfo" />
//   }
// }

// export default OpenRoute

import { Navigate } from "react-router-dom"
import { useAuth } from "../../../hooks/useAuth"
import Loding from "../../common/Loding"

function OpenRoute({ children }) {
  const isAuthenticated = useAuth()

  if (isAuthenticated === null) {
    // return (<Loding/>)
    return <div></div>
  }

  return isAuthenticated ? <Navigate to="/dashboard/dashboard-info" /> : children
}

export default OpenRoute
