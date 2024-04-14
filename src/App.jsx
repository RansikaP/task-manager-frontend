import './App.css';
import Sidebar from './Components/Sidebar';
import Home from './Components/HomePage';
import Project from './Components/Project';
import Login from './Components/Login';
import Register from './Components/Register';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import Page from './utils/userPage';



function App() {;
  const checkUsernameExists=()=> {
    const username = Cookies.get('user');
    return username !== null;
  }
  const shouldDisplaySidebar = () => {
    return !['/login', '/register'].includes(location.pathname);
  };

  return (
    <div className='App'>
      <Router>
            <Routes>
            <Route path='/' element={checkUsernameExists() ? <Navigate to="/home" /> : <Navigate to="/login" />} />
              <Route path='/home' element={<Page  component={Home}/>} />
              <Route path='/project/:projectId' element={<Page  component={Project}/>} />
              <Route path='/login' element={<Login  />} />
              <Route path='/register' element={<Register />} />
            </Routes>
      </Router>
    </div> 
  );
}

export default App;