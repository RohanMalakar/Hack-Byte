import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Simple Toast Component
const Toast = ({ message, isVisible, onClose }) => {
  return (
    <motion.div
      className="fixed bottom-8 right-8 bg-rose-700 text-white px-6 py-3 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      {message}
    </motion.div>
  );
};

const ForgotPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if passwords match
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    // Show toast and redirect
    setShowToast(true);
    
    // Redirect after 2 seconds
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-gray-100 p-4">
      {/* Floating elements */}
      <motion.div
        className="absolute w-20 h-20 rounded-full bg-rose-200/30 blur-xl"
        animate={{
          x: [0, 30, 0],
          y: [0, 50, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 15,
          ease: "easeInOut"
        }}
        style={{ top: '15%', left: '25%' }}
      />
      <motion.div
        className="absolute w-32 h-32 rounded-full bg-rose-200/40 blur-xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "easeInOut"
        }}
        style={{ bottom: '20%', right: '20%' }}
      />

      {/* Form */}
      <motion.div
        className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden border border-rose-200"
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-rose-50/90 pointer-events-none" />
        
        <motion.h2 
          className="text-3xl font-bold text-center mb-8 text-rose-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Reset Password
        </motion.h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <label htmlFor="newPassword" className="block text-sm font-medium mb-2 text-rose-800">
              New Password
            </label>
            <motion.input
              whileFocus={{ boxShadow: "0 0 0 2px rgba(225,29,72,0.3)" }}
              whileHover={{ scale: 1.01 }}
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white border border-rose-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-200 transition-all"
              placeholder="Enter new password"
              required
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2 text-rose-800">
              Confirm Password
            </label>
            <motion.input
              whileFocus={{ boxShadow: "0 0 0 2px rgba(225,29,72,0.3)" }}
              whileHover={{ scale: 1.01 }}
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white border border-rose-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-200 transition-all"
              placeholder="Confirm new password"
              required
            />
          </motion.div>
          
          <motion.button
            type="submit"
            className="w-full py-3 px-6 bg-gradient-to-r from-rose-700 to-rose-800 text-white font-medium rounded-lg shadow-lg"
            whileHover={{ scale: 1.03, boxShadow: "0 0 15px rgba(225,29,72,0.4)" }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 15,
              delay: 0.8 
            }}
          >
            Reset Password
          </motion.button>
        </form>
        
        <motion.div 
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.a
            href="#"
            onClick={() => navigate('/login')}
            className="text-rose-700 hover:text-rose-800 transition-colors text-sm"
            whileHover={{ scale: 1.05, color: "#9f1239" }}
          >
            Back to Login
          </motion.a>
        </motion.div>
      </motion.div>
      
      {/* Toast notification */}
      <Toast 
        message="Password changed successfully!" 
        isVisible={showToast} 
        onClose={() => setShowToast(false)} 
      />
    </div>
  );
};

export default ForgotPassword;