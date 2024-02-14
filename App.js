import React from 'react';
import { BrowserRouter , Routes, Link,Route } from 'react-router-dom';
import Home from './cmpts/home';
import Contact from './cmpts/contact';
import AboutUs from './cmpts/aboutus';
import Registration from './cmpts/registration';
import Emergency from './cmpts/emergency';
import Login from './cmpts/login';
import Agency from './cmpts/agency';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li> 
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/registration">Registration</Link></li>
            <li><Link to="/emergency">Emergency</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/about" element={<AboutUs/>} />
          <Route path="/registration" element={<Registration/>} />
          <Route path="/emergency" element={<Emergency/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/agency" element={<Agency/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;