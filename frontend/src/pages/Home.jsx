import React from 'react'
import Navbar from '../components/layout/Navbar'
import Hero from '../components/home/hero'
import Steps from '../components/home/steps'
import Footer from '../components/home/Footer'
import ChatbotInterface from '../components/chatbot/chatbot'
const Home = () => {
  return (
    <>
    <ChatbotInterface/>
    <Hero/>
    <Steps/>
    <Footer/>
    </>
  )
}

export default Home
