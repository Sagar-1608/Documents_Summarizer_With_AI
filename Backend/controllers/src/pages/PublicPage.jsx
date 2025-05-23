import React from 'react'
import PublicNavbar from '../components/core/PublicPage/PublicNavbar'
import LoginPage from './LoginPage';
import IndexG1 from '../components/core/PublicPage/Group1/IndexG1';


export default function Publicpage() {
  return (
    <div  className=' overflow-x-hidden  '>
    <PublicNavbar/>
    <IndexG1/>
  
    </div>
  )
}
