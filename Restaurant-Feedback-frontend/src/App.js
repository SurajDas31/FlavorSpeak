import logo from './logo.svg';
import React from 'react';
import Navbars from './navbar/Navbar';
import Home from './home/Home'
import SignIn from './singin/SignIn';
import SignUp from './signup/SignUp';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <Navbars />
      
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/signin' element={<SignIn/>} />
          <Route path='/signup' element={<SignUp/>} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;