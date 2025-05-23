// import React from 'react'
// import { useSelector } from 'react-redux'
// import { Navigate } from 'react-router-dom';

// const PrivateRoute = ({children}) => {

//     const {token} = useSelector((state) => state.auth);

//     if(token !== null)
//         return children
//     else
//         return <Navigate to="/login" />

// }

// export default PrivateRoute

import React from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../../../hooks/useAuth"
import Loding from "../../common/Loding"

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useAuth()

  if (isAuthenticated === null) {
    // return <div>Loading...</div> // optional loading UI
    return <Loding/>
  }

  return isAuthenticated ? children : <Navigate to="/login" />
}

export default PrivateRoute
