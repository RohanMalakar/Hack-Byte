import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    
    // Validate password (only in login mode)
    if (!forgotPasswordMode && !formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        if (forgotPasswordMode) {
          console.log('Password reset email sent to:', formData.email);
          // Show success message or redirect
        } else {
          console.log('Login attempt with:', formData);
          // Here you would typically call your authentication service
          // and redirect the user after successful login
        }
      } catch (error) {
        console.error('Login failed:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleForgotPassword = () => {
    setForgotPasswordMode(!forgotPasswordMode);
    setErrors({});
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 50 
      }
    }
  };
  
  const buttonVariants = {
    idle: { scale: 1 },
    hover: { 
      scale: 1.05, 
      boxShadow: "0px 5px 15px rgba(236, 72, 153, 0.2)",
      transition: { duration: 0.2 } 
    },
    tap: { scale: 0.95 }
  };

  const floatingCircleVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 0.9, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        duration: 2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-rose-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Elements */}
      <motion.div 
        className="absolute top-10 right-10 w-32 h-32 rounded-full bg-rose-200 opacity-40 blur-xl"
        animate={{ 
          x: [0, 10, 0], 
          y: [0, -10, 0] 
        }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div 
        className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-rose-300 opacity-30 blur-xl"
        animate={{ 
          x: [0, -10, 0], 
          y: [0, 10, 0] 
        }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-rose-400 opacity-20 blur-md"
        variants={floatingCircleVariants}
        animate="animate"
      />
      <motion.div 
        className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full bg-rose-500 opacity-10 blur-lg"
        variants={pulseVariants}
        animate="animate"
      />
      
      {/* SVG Decorative Line */}
      <svg className="absolute top-0 right-0 w-1/3 h-1/3 opacity-20" viewBox="0 0 200 200">
        <motion.path 
          d="M 10,10 C 20,20 40,20 50,10 S 80,0 90,10 S 120,20 130,10 S 160,0 170,10 S 180,20 190,10" 
          stroke="rgba(244, 63, 94, 0.7)" 
          strokeWidth="2" 
          fill="none"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
        />
      </svg>
      <svg className="absolute bottom-0 left-0 w-1/3 h-1/3 opacity-20" viewBox="0 0 200 200">
        <motion.path 
          d="M 10,100 C 30,90 50,110 70,100 S 110,80 130,100 S 170,120 190,100" 
          stroke="rgba(244, 63, 94, 0.5)" 
          strokeWidth="2" 
          fill="none"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
        />
      </svg>

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-xl backdrop-blur-sm bg-opacity-80 relative z-10"
      >
        <div className="text-center">
          <motion.div 
            className="mx-auto h-16 w-16 bg-rose-100 rounded-full flex items-center justify-center"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8 text-rose-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={forgotPasswordMode ? 
                  "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" : 
                  "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                }
              />
            </svg>
          </motion.div>
          <motion.h2 
            variants={itemVariants}
            className="mt-6 text-3xl font-extrabold text-gray-900"
          >
            {forgotPasswordMode ? 'Reset your password' : 'Sign in to your account'}
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="mt-2 text-sm text-gray-600"
          >
            {forgotPasswordMode ? 
              "We'll send you an email with a reset link" : 
              'Welcome back! Please enter your details'
            }
          </motion.p>
        </div>
        
        <motion.form 
          variants={containerVariants}
          className="mt-8 space-y-6" 
          onSubmit={handleSubmit}
        >
          <div className="rounded-md shadow-sm space-y-4">
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-rose-500 focus:border-rose-500 focus:z-10 sm:text-sm transition-all duration-200`}
                placeholder="Email address"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </motion.div>

            {!forgotPasswordMode && (
              <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="relative"
              >
                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className={`mt-1 appearance-none relative block w-full px-3 py-2 pr-10 border ${
                      errors.password ? 'border-red-300' : 'border-gray-300'
                    } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-rose-500 focus:border-rose-500 focus:z-10 sm:text-sm transition-all duration-200`}
                    placeholder="Password"
                  />
                  <motion.button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none mt-1"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                      </svg>
                    )}
                  </motion.button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </motion.div>
            )}
          </div>

          {!forgotPasswordMode && (
            <motion.div variants={itemVariants} className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <motion.button
                type="button"
                className="text-sm font-medium text-rose-600 hover:text-rose-500"
                onClick={toggleForgotPassword}
                whileHover={{ 
                  scale: 1.05, 
                  textShadow: "0px 0px 8px rgba(244, 63, 94, 0.3)" 
                }}
              >
                Forgot your password?
              </motion.button>
            </motion.div>
          )}

          <motion.div variants={itemVariants} className="relative">
            <motion.button
              type="submit"
              variants={buttonVariants}
              initial="idle"
              whileHover="hover"
              whileTap="tap"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-all duration-300"
            >
              {isSubmitting ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : forgotPasswordMode ? "Send reset link" : "Sign in"}
              
              {!isSubmitting && (
                <motion.span 
                  className="absolute right-2"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.span>
              )}
            </motion.button>
            
            {/* Subtle pulse effect behind the button */}
            <motion.div 
              className="absolute inset-0 rounded-md bg-rose-400 opacity-30 blur-sm -z-10"
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          
          <motion.div variants={itemVariants} className="text-center text-sm">
            <p className="text-gray-600">
              {forgotPasswordMode ? (
                <>
                  Remember your password?{" "}
                  <motion.button
                    type="button"
                    onClick={toggleForgotPassword}
                    className="font-medium text-rose-600 hover:text-rose-500"
                    whileHover={{ 
                      scale: 1.05, 
                      textShadow: "0px 0px 8px rgba(244, 63, 94, 0.3)" 
                    }}
                  >
                    Back to login
                  </motion.button>
                </>
              ) : (
                <>
                  Don't have an account yet?{" "}
                  <motion.a 
                    href="/register" 
                    className="font-medium text-rose-600 hover:text-rose-500"
                    whileHover={{ 
                      scale: 1.05, 
                      textShadow: "0px 0px 8px rgba(244, 63, 94, 0.3)" 
                    }}
                  >
                    Create an account
                  </motion.a>
                </>
              )}
            </p>
          </motion.div>
        </motion.form>

        {/* Animated corner accents */}
        <motion.div 
          className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-rose-400"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
        />
        <motion.div 
          className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-rose-400"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9 }}
        />
        <motion.div 
          className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-rose-400"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0 }}
        />
        <motion.div 
          className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-rose-400"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1 }}
        />
      </motion.div>
    </div>
  );
};

export default Login;