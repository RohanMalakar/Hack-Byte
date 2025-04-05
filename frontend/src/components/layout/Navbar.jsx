import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Logo from '../../assets/sahayak-logo-removebg-preview.png'; // Adjust the path to your logo imageq
//import {Logo} from 'Web_Logo.png';
//import Post from './pages/Posts';

const FeminineNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <nav className="bg-gradient-to-r from-rose-200 to-rose-200 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex-shrink-0 flex items-center">
              {/* Logo SVG */}
              <img src={Logo} alt='logo' height="80" width='80'/>
              
                
              
              
            </div>
          </motion.div>

          {/* Desktop Navigation (centered) */}
          <div className="hidden md:flex md:items-center md:justify-center flex-1">
            <div className="flex space-x-2 lg:space-x-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                >
                  <Link
                    to={link.path}
                    className="px-2 lg:px-3 py-2 text-medium font-medium text-black hover:text-rose-600  transition-colors duration-300 ease-in-out font-bold"
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
              ))}
            </div>
          </div>

          {/* Right: Login/Signup buttons */}
          <div className="hidden md:flex md:items-center">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 15px rgba(185, 0, 0, 0.5)'
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-rose-600 rounded-full transition-all duration-300 ease-in-out mr-3"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <Link to={"/login"}>Login</Link>
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 15px rgba(204, 115, 141, 0.5)",
              }}
              className="px-4 py-2 text-sm font-medium bg-white bg-rose-800 rounded-full transition-all duration-300 ease-in-out"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <Link to={"/register"}>Signup</Link>
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-pink-200 focus:outline-none"
            >
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="md:hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <motion.div
                key={link.name}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to={link.path}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-rose-600 transition-colors duration-300 ease-in-out"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-pink-300">
            <div className="flex items-center justify-center space-x-3 px-5">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 15px rgba(204, 115, 141, 0.5)",
                }}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-rose-800 rounded-full transition-all duration-300 ease-in-out"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                <Link to={"/login"}>Login</Link>
              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 15px rgba(204, 115, 141, 0.5)",
                }}
                className="w-full px-4 py-2 text-sm font-medium bg-white text-[#7A2F46] rounded-full transition-all duration-300 ease-in-out"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                <Link to={"/register"}>Signup</Link>
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default FeminineNavbar;
