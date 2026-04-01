import React, { useEffect } from 'react'
import { Outlet } from 'react-router'
import Footer from './Footer'
import Header from './Header'
import { useAuth } from '../AuthStore/useAuth'
function RootLayout() {
  useEffect(()=>{
    //call check auth function from auth store
    useAuth.getState().checkAuth();
  },[])
  return (
    <div>
        <Header/>
        <div className='min-h-screen'>
            <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}

export default RootLayout