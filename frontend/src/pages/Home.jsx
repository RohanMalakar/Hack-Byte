import React, { use, useEffect } from 'react'
import Navbar from '../components/layout/Navbar'
import Hero from '../components/home/hero'
import Steps from '../components/home/steps'
import Footer from '../components/home/Footer'
import ChatbotInterface from '../components/chatbot/chatbot'
import axiosInstance from '../helper/axiosinstance'
const Home = ({isloggedIn, setIsloggedIn,userData ,setUserData}) => {
  const getUserProfile = async () => {
    try {
      const response = await axiosInstance.get('/user/profile');
      const data=await response.data.data;
      localStorage.setItem("userType", data?.role); // Store user type in local storage 
      localStorage.setItem("userData", JSON.stringify(data)); // Store user data in local storage 
      localStorage.setItem("isloggedIn", "true"); // Store login status in local storage
      setUserData({...data}); // Set user data
      setIsloggedIn(true); // Set login state to true
    } catch (error) {
      console.log('Error fetching user profile:', error);
    }
  };

  useEffect(() => {
    getUserProfile();
  },[]);

  return (
    <>
    {/* <ChatbotInterface isloggedIn={isloggedIn} setIsloggedIn={setIsloggedIn}/> */}
    <Hero/>
    <Steps/>
    </>
  )
}

export default Home
