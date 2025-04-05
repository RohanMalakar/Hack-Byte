import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Tag, Building, Image as ImageIcon, Eye, EyeOff, Loader } from 'lucide-react';
import axiosInstance from '../../helper/axiosinstance';

const PostForm = ({ editPost = null, onSubmit }) => {
  // Form state
  const [title, setTitle] = useState(editPost?.title || '');
  const [description, setDescription] = useState(editPost?.description || '');
  const [location, setLocation] = useState(editPost?.location || '');
  const [issueType, setIssueType] = useState(editPost?.issueType || []);
  const [organization, setOrganization] = useState(editPost?.organization || []);
  const [images, setImages] = useState(editPost?.images || []);
  const [isAnonymous, setIsAnonymous] = useState(editPost?.isAnonymous || false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Refs
  const fileInputRef = useRef(null);
  
  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      // For demo purposes, we're creating object URLs
      // In a real app, you would upload to a server
      const newImages = files.map(file => ({
        url: URL.createObjectURL(file),
        file: file
      }));
      setImages([...images, ...newImages]);
    }
  };
  
  const removeImage = (index) => {
    const newImages = [...images];
    URL.revokeObjectURL(newImages[index].url);
    newImages.splice(index, 1);
    setImages(newImages);
  };
  
  const toggleIssueType = (type) => {
    if (issueType.includes(type)) {
      setIssueType(issueType.filter(t => t !== type));
    } else {
      setIssueType([...issueType, type]);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Here you would normally upload images to a server
      // and get back URLs to store in your database
      
      const postData = {
        title:title,
        description:description,
        location,
        tag:organization,
        post_media: images.map(img => img.url), // In real app, use server URLs
        anonymous:isAnonymous
      };

      console.log("Post Data:", postData);
      
      const response=await axiosInstance.post('/post/create', postData);
      if (response.status !== 201) {
        throw new Error('Failed to create post');
      }

      console.log("Post created successfully:", response.data);
      
      
      // Call the parent component's onSubmit
      if (onSubmit) {
        onSubmit(postData);
      }
      
      // Clear form if not editing
      if (!editPost) {
        setTitle('');
        setDescription('');
        setLocation('');
        setIssueType([]);
        setOrganization([]);
        setImages([]);
        setIsAnonymous(false);
      }
    } catch (error) {
      console.error("Error submitting post:", error);
      // Handle error (show error message, etc.)
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Animation variants
  const formVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <motion.div 
      className="w-full max-w-3xl mx-auto p-6 bg-gradient-to-r from-rose-50 to-slate-50 rounded-xl shadow-lg"
      initial="hidden"
      animate="visible"
      variants={formVariants}
    >
      <motion.h2 
        className="text-2xl font-bold text-rose-600 mb-6 text-center"
        variants={itemVariants}
      >
        {editPost ? 'Edit Post' : 'Create New Post'}
      </motion.h2>
      
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <motion.div className="mb-4" variants={itemVariants}>
          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
            Post Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300 transition"
            placeholder="What's the issue about?"
          />
        </motion.div>
        
        {/* Description */}
        <motion.div className="mb-4" variants={itemVariants}>
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="4"
            className="w-full px-4 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300 transition"
            placeholder="Describe the issue in detail..."
          />
        </motion.div>
        
        {/* Location */}
        <motion.div className="mb-4" variants={itemVariants}>
          <label htmlFor="location" className=" text-gray-700 font-medium mb-2 flex items-center">
            <MapPin className="mr-2 text-rose-600" size={18} />
            Location
          </label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300 transition"
            placeholder="Enter location or use map"
          />
          <div className="mt-2 bg-gray-100 h-40 rounded-lg flex items-center justify-center text-gray-400">
            Google Maps integration will go here
          </div>
        </motion.div>
        
        {/* Organization */}
        <motion.div className="mb-4" variants={itemVariants}>
          <label htmlFor="organization" className="text-gray-700 font-medium mb-2 flex items-center">
            <Building className="mr-2 text-rose-500" size={18} />
            Organizations
          </label>
          <div className="flex flex-wrap gap-2">
            {['NGOrohan', 'Organization B', 'Organization C', 'Organization D'].map((org) => (
              <motion.button
                key={org}
                type="button"
                onClick={() => {
                  if (organization.includes(org)) {
                    setOrganization(organization.filter((o) => o !== org));
                  } else {
                    setOrganization([...organization, org]);
                  }
                }}
                className={`px-3 py-1 rounded-full text-sm transition-all ${
                  organization.includes(org)
                    ? 'bg-rose-500 text-white'
                    : 'bg-rose-100 text-rose-600 hover:bg-rose-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {org}
              </motion.button>
            ))}
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Selected: {organization.length > 0 ? organization.join(', ') : 'None'}
          </p>
        </motion.div>
        
        {/* Image Upload */}
        <motion.div className="mb-4" variants={itemVariants}>
          <label className=" text-gray-700 font-medium mb-2 flex items-center">
            <ImageIcon className="mr-2 text-rose-600" size={18} />
            Upload Images
          </label>
          
          <div className="flex items-center justify-center w-full">
            <label 
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-rose-200 border-dashed rounded-lg cursor-pointer bg-rose-50 hover:bg-rose-100 transition-all"
              onClick={() => fileInputRef.current.click()}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <ImageIcon className="w-8 h-8 mb-3 text-rose-400" />
                <p className="mb-2 text-sm text-rose-600"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-rose-400">PNG, JPG or JPEG (MAX. 5MB)</p>
              </div>
              <input 
                ref={fileInputRef}
                type="file" 
                className="hidden" 
                accept="image/*"
                multiple
                onChange={handleImageUpload}
              />
            </label>
          </div>
          
          {/* Image Preview */}
          {images.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-3">
              {images.map((img, index) => (
                <div key={index} className="relative group">
                  <img 
                    src={img.url} 
                    alt={`Upload ${index + 1}`} 
                    className="h-24 w-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </motion.div>
        
        {/* Anonymity Toggle */}
        <motion.div className="mb-6 flex items-center" variants={itemVariants}>
          <label htmlFor="anonymity" className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                id="anonymity"
                type="checkbox"
                className="sr-only"
                checked={isAnonymous}
                onChange={() => setIsAnonymous(!isAnonymous)}
              />
              <div className={`block w-14 h-8 rounded-full transition ${isAnonymous ? 'bg-rose-500' : 'bg-gray-300'}`}></div>
              <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform ${isAnonymous ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </div>
            <div className="ml-3 flex items-center text-gray-700">
              {isAnonymous ? (
                <>
                  <EyeOff size={18} className="mr-1 text-rose-500" />
                  <span>Post Anonymously</span>
                </>
              ) : (
                <>
                  <Eye size={18} className="mr-1 text-rose-500" />
                  <span>Post Publicly</span>
                </>
              )}
            </div>
          </label>
        </motion.div>
        
        {/* Submit Button */}
        <motion.div className="flex justify-center" variants={itemVariants}>
          <motion.button
            type="submit"
            className="px-79 py-3 bg-rose-500 text-white rounded-lg font-medium shadow-md hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-opacity-50 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                Processing...
              </>
            ) : (
              <>
                {editPost ? 'Update Post' : 'Create Post'}
              </>
            )}
          </motion.button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default PostForm;