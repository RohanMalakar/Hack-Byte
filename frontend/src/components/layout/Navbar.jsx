import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import Logo from '../../assets/sahayak-logo-removebg-preview.png'; // Adjust the path to your logo imageq
import axiosInstance from '../../helper/axiosinstance';
//import {Logo} from 'Web_Logo.png';
//import Post from './pages/Posts';

const FeminineNavbar = ({isloggedIn, setIsloggedIn,userData,setUserData}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userType, setUserType] = useState(null);
  
  console.log("userData",userData);

  const loggedOuthelper = async () => {
    const response=await axiosInstance.get("/user/logout");
    if(response.status===200){
      setIsloggedIn(false);
      setUserData({});
      alert("Logout successful");
      setUserType(null);
      localStorage.removeItem("userType");
      localStorage.removeItem("isloggedIn");
      localStorage.removeItem("userData");
    }else{
      alert("Logout failed");
    }
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Create Post", path: "/create" },
    { name: "Posts", path: "/posts" },
    { name: "Read Blogs", path: "/blogs" },
    { name: "Helplines", path: "/helplines" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" }
  ];

  const renderLinks = () => {
    if (userType === "ngo") {
      return (
        <Link
          to="/ngo-dashboard"
          className="px-2 lg:px-3 py-2 text-medium text-black hover:text-rose-600 transition-colors duration-300 ease-in-out font-bold"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          NGO Dashboard
        </Link>
      );
    }

    return navLinks.map((link) => (
      <motion.div
        key={link.name}
        whileHover={{ scale: 1.05 }}
        className="relative"
      >
        <Link
          to={link.path}
          className="px-2 lg:px-3 py-2 text-medium text-black hover:text-rose-600 transition-colors duration-300 ease-in-out font-bold"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          {link.name}
        </Link>
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-[#CC738D] w-0"
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    ));
  };

  useEffect(() => {
      const storedLoginStatus = localStorage.getItem('isloggedIn');
      const storedUserType = localStorage.getItem('userType');
      const storedUserData = JSON.parse(localStorage.getItem('userData')); 
      if (storedLoginStatus == 'true') {
        setIsloggedIn(true);
        setUserData({...storedUserData});
      }
    }
    ,[]);

  return (
    <nav className="bg-gradient-to-r from-rose-200 to-rose-200">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-2">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <motion.div className="flex items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <div className="flex-shrink-0 flex items-center">
              {/* Logo SVG */}
              <img src={Logo} alt='logo' height="80" width='80'/>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:justify-center flex-1">
            <div className="flex space-x-2 lg:space-x-4">
              {renderLinks()}
            </div>
          </div>

          {/* Right: Login/Signup or User Name */}
          <div className="hidden md:flex md:items-center">
            {isloggedIn ? (
              <div className='flex items-center gap-3'>
                  <span className="text-sm font-semibold text-rose-800" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {`Hi, ${userData?.name}`}
                  </span>
                  <motion.button whileHover={{ scale: 1.05 }} onClick={loggedOuthelper} className="px-4 py-2 text-sm  font-medium text-white bg-rose-600 rounded-full mr-3">
                    logout
                </motion.button>
              </div>
            ) : (
              <>
                <motion.button whileHover={{ scale: 1.05 }} className="px-4 py-2 text-sm font-medium text-white bg-rose-600 rounded-full mr-3">
                  <Link to="/login">Login</Link>
                </motion.button>
                <motion.button whileHover={{ scale: 1.05 }} className="px-4 py-2 text-sm font-medium text-rose-800 bg-white rounded-full">
                  <Link to="/register">Signup</Link>
                </motion.button>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="flex items-center md:hidden">
            <button onClick={toggleMenu} className="p-2 rounded-md text-white">
              {isOpen ? (
                <svg className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" />
                </svg>
              ) : (
                <svg className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="2" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {renderLinks()}
          </div>
          {!isloggedIn && (
            <div className="pt-4 pb-3 border-t border-pink-300">
              <div className="flex items-center justify-center space-x-3 px-5">
                <motion.button className="w-full px-4 py-2 text-sm font-medium text-white bg-rose-800 rounded-full">
                  <Link to="/login">Login</Link>
                </motion.button>
                <motion.button className="w-full px-4 py-2 text-sm font-medium text-[#7A2F46] bg-white rounded-full">
                  <Link to="/register">Signup</Link>
                </motion.button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </nav>
  );
};

export default FeminineNavbar;