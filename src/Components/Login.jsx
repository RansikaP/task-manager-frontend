import React, { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Login () {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigateTo = useNavigate();
  const user = Cookies.get("user");

  useEffect(() => {
    if (user) {
      navigateTo('/home')
    }
  }, [])

  const handleLoginClick = () => {
    
    Cookies.set('user', 'Rans', { expires: 7 });
    navigateTo('/home');
  };

  return (
    <div>
      <button onClick={handleLoginClick}>Login</button>
      <button>Register</button>
    </div>
  );
}

export default Login;