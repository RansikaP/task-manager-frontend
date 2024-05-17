import React, { useState,useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import '../styles/userPage.css'

function Page (props) {
    
    const Component = props.component;
    const user = Cookies.get("user");
    const navigateTo = useNavigate();

    useEffect(() => {
        if (!user) {
          navigateTo('/login')
        }
      }, [])

  return (
<div className='PageContainer'> 
            <Sidebar />   

          
          <div className='content'>
            <Component/>
          </div>
        </div>
  )
}

export default Page;
