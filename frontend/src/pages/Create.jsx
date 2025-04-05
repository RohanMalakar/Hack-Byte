import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PostForm from '../components/createposts/PostForm';

const Create = () => {
  const [success, setSuccess] = useState(false);

  const handlePostSubmit = (postData) => {
    console.log("Post submitted:", postData);
    // Here you would typically send the data to your backend API
    // For now, we'll just simulate success
    setSuccess(true);
    setTimeout(() => setSuccess(false), 5000); // Hide success message after 5 seconds
  };

  return (
    <div className="min-h-screen bg-rose-50 py-6 px-4">
      {/* Page Header */}
      <motion.div 
        className="max-w-3xl mx-auto mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="mt-3 text-2xl text-gray-600 font-bold">Share an issue with your community and help make a difference!!</p>
      </motion.div>

      {/* Success Message */}
      {success && (
        <motion.div 
          className="max-w-3xl mx-auto mb-6 bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center justify-between"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Your post has been successfully created!</span>
          </div>
          <button onClick={() => setSuccess(false)} className="text-green-800">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </motion.div>
      )}

      {/* Post Form Component */}
      <PostForm onSubmit={handlePostSubmit} />
    </div>
  );
};

export default Create;