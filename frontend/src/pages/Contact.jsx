import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, User, MessageSquare, CheckCircle } from 'lucide-react';
import axiosInstance from '../helper/axiosinstance';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear the error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      const response = await axiosInstance.post('/contactUs/create', formData);
      console.log(response.data);
      
      // Here you would normally send the form data to your email service
      console.log("Form submitted:", formData);
      
      // Reset the form
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      
      setSubmitted(true);
      
      // Reset submission state after showing success message
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.03,
      boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)"
    },
    tap: { 
      scale: 0.97
    }
  };

  const floatingElements = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-rose-50 px-4 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-rose-800 mb-6 relative inline-block">
            Hey!! Don't Panic, You're Strong!!
            <motion.div 
              className="absolute -right-10 -top-10"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="text-purple-300 text-4xl">✨</div>
            </motion.div>
          </h1>
          
          <h2 className="text-2xl md:text-2xl text-rose-700 mb-8">Got a Question? Feedback?</h2>
          
          <motion.div
            className="inline-block bg-gradient-to-r from-rose-800 to-rose-700 rounded-full px-8 py-4 text-white text-xl font-semibold shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            Come Contact Us
          </motion.div>
        </motion.div>

        {/* Contact Form Section */}
        <div className="max-w-4xl mx-auto relative">
          {/* Decorative Elements */}
          <motion.div 
            className="absolute -top-16 -left-16 text-8xl text-purple-200 opacity-50 hidden md:block"
            variants={floatingElements}
            initial="initial"
            animate="animate"
          >
            ✉️
          </motion.div>
          
          <motion.div 
            className="absolute -bottom-16 -right-16 text-8xl text-purple-200 opacity-50 hidden md:block"
            variants={floatingElements}
            initial="initial"
            animate="animate"
            transition={{ 
              delay: 1,
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            💬
          </motion.div>

          {/* Contact Form Card */}
          <motion.div 
            className="bg-white rounded-3xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <div className="flex flex-col md:flex-row">
              {/* Left Side - Accent Area */}
              <div className="bg-gradient-to-br from-rose-300 to-rose-300 md:w-1/3 p-8 text-white flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-6">Connect With Us</h3>
                  <p className="mb-10">We're here to listen and help. Share your thoughts, concerns, or just say hello!</p>
                </div>
                
                <motion.div 
                  className="hidden md:block"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 1 }}
                >
                  <div className="flex items-center mb-4">
                    <Mail className="mr-3" />
                    <span>help@example.com</span>
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="mr-3" />
                    <span>24/7 Support Available</span>
                  </div>
                </motion.div>
              </div>
              
              {/* Right Side - Form */}
              <div className="md:w-2/3 p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h3>
                
                {submitted ? (
                  <motion.div 
                    className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <CheckCircle className="mx-auto mb-3 text-green-500" size={48} />
                    <h4 className="text-xl font-semibold text-green-700 mb-2">Message Sent!</h4>
                    <p className="text-green-600">Thank you for reaching out. We'll get back to you shortly.</p>
                  </motion.div>
                ) : (
                  <motion.form 
                    onSubmit={handleSubmit}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {/* Name Input */}
                    <motion.div className="mb-6" variants={itemVariants}>
                      <label className=" text-gray-700 font-medium mb-2 flex items-center">
                        <User className="mr-2 text-rose-800" size={18} />
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-400' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200`}
                        placeholder="Enter your name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-red-500 text-sm">{errors.name}</p>
                      )}
                    </motion.div>
                    
                    {/* Email Input */}
                    <motion.div className="mb-6" variants={itemVariants}>
                      <label className=" text-gray-700 font-medium mb-2 flex items-center">
                        <Mail className="mr-2 text-rose-800" size={18} />
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-400' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200`}
                        placeholder="Enter your email"
                      />
                      {errors.email && (
                        <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
                      )}
                    </motion.div>
                    
                    {/* Message Input */}
                    <motion.div className="mb-8" variants={itemVariants}>
                      <label className=" text-gray-700 font-medium mb-2 flex items-center">
                        <MessageSquare className="mr-2 text-rose-800" size={18} />
                        Your Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        className={`w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-400' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200`}
                        placeholder="What would you like to tell us?"
                      ></textarea>
                      {errors.message && (
                        <p className="mt-1 text-red-500 text-sm">{errors.message}</p>
                      )}
                    </motion.div>
                    
                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-rose-300 to-rose-300 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center disabled:opacity-70 transition duration-300 shadow-md hover:shadow-lg"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2" size={18} />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </div>
            </div>
          </motion.div>
          
          {/* Extra Decoration */}
          <div className="absolute w-20 h-20 bg-purple-500 rounded-full opacity-10 -bottom-10 left-10 z-0"></div>
          <div className="absolute w-12 h-12 bg-indigo-500 rounded-full opacity-10 -top-6 right-20 z-0"></div>
        </div>
      </div>
    </div>
  );
};

export default Contact;