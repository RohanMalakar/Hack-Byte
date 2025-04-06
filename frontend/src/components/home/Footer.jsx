import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Instagram, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const socialIcons = [
    { icon: <Linkedin size={20} />, name: 'LinkedIn', href: '#' },
    { icon: <Github size={20} />, name: 'GitHub', href: '#' },
    { icon: <Twitter size={20} />, name: 'Twitter', href: '#' },
    { icon: <Instagram size={20} />, name: 'Instagram', href: '#' },
  ];

  return (
    <motion.footer
      className="w-full py-6 px-4 md:px-8 bg-[rgba(128,128,128,0.2)] backdrop-blur-sm text-gray-100 dark:bg-[rgba(24,24,27,0.3)] dark:text-gray-200 rounded-xl shadow-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <motion.div 
          className="flex items-center space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex items-center space-x-4">
            {socialIcons.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.href}
                className="bg-gray-800 dark:bg-gray-700 p-2 rounded-full hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-200 relative group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.3 }}
                aria-label={social.name}
              >
                {social.icon}
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-gray-700 dark:bg-gray-600 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  {social.name}
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="flex flex-col items-center md:items-end gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <motion.button
            onClick={scrollToTop}
            className="bg-rose-600 hover:bg-rose-700 text-white p-2 rounded-full flex items-center justify-center group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Back to top"
          >
            <ArrowUp size={20} className="group-hover:animate-bounce" />
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-gray-700 dark:bg-gray-600 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              Back to top
            </span>
          </motion.button>
        </motion.div>
      </div>

      <motion.div 
        className="w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent my-4"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.6, duration: 0.7 }}
      />

      <motion.div 
        className="text-center text-sm text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        &copy; {new Date().getFullYear()} All Rights Reserved
      </motion.div>
    </motion.footer>
  );
};

export default Footer;