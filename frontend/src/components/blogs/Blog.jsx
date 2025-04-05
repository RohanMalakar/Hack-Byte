import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const BlogSection = () => {
  // Sample blog data
  const blogs = [
    {
      id: 1,
      genre: 'Safety Tips',
      title: 'How to Stay Safe in Urban Areas',
      description: 'Essential safety tips for navigating city streets and public transportation with confidence.',
      date: 'April 2, 2025',
      image: 'https://media.licdn.com/dms/image/v2/D4D12AQEc3hdu4ZSCZA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1709933153716?e=2147483647&v=beta&t=Q_tFnwKtblgmt2RTT7kqrkfiG2BGPjgLLV_obMKjM20'
    },
    {
      id: 2,
      genre: 'Empowerment',
      title: 'Finding Your Voice: Self-Defense Basics',
      description: 'Learn how verbal assertiveness can be your first line of defense in uncomfortable situations.',
      date: 'March 28, 2025',
      image: 'https://media.licdn.com/dms/image/v2/D4D12AQEc3hdu4ZSCZA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1709933153716?e=2147483647&v=beta&t=Q_tFnwKtblgmt2RTT7kqrkfiG2BGPjgLLV_obMKjM20'
    },
    {
      id: 3,
      genre: 'Awareness',
      title: 'Recognizing Warning Signs',
      description: 'How to identify potential threats and trust your instincts in challenging environments.',
      date: 'March 21, 2025',
      image: 'https://media.licdn.com/dms/image/v2/D4D12AQEc3hdu4ZSCZA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1709933153716?e=2147483647&v=beta&t=Q_tFnwKtblgmt2RTT7kqrkfiG2BGPjgLLV_obMKjM20'
    },
    {
      id: 4,
      genre: 'Resources',
      title: 'Community Support Networks',
      description: 'Discover local organizations that provide safety education and emergency assistance.',
      date: 'March 15, 2025',
      image: 'https://media.licdn.com/dms/image/v2/D4D12AQEc3hdu4ZSCZA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1709933153716?e=2147483647&v=beta&t=Q_tFnwKtblgmt2RTT7kqrkfiG2BGPjgLLV_obMKjM20'
    },
    {
      id: 5,
      genre: 'Technology',
      title: 'Apps That Keep You Connected',
      description: 'The latest smartphone applications designed to enhance personal safety and peace of mind.',
      date: 'March 10, 2025',
      image: 'https://media.licdn.com/dms/image/v2/D4D12AQEc3hdu4ZSCZA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1709933153716?e=2147483647&v=beta&t=Q_tFnwKtblgmt2RTT7kqrkfiG2BGPjgLLV_obMKjM20'
    },
    {
      id: 6,
      genre: 'Wellness',
      title: 'The Connection Between Safety and Mental Health',
      description: 'How feeling secure affects your overall wellbeing and strategies to maintain balance.',
      date: 'March 5, 2025',
      image: 'https://media.licdn.com/dms/image/v2/D4D12AQEc3hdu4ZSCZA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1709933153716?e=2147483647&v=beta&t=Q_tFnwKtblgmt2RTT7kqrkfiG2BGPjgLLV_obMKjM20'
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 py-12 bg-rose-50">
        <motion.h2 
          className="text-4xl font-bold text-center mb-12 text-rose-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Latest from Our Blog
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {blogs.map((blog) => (
            <motion.div 
              key={blog.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 max-w-md mx-auto w-full"
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
            >
              {/* Image Container with zoom effect */}
              <div className="overflow-hidden h-48 relative">
                <motion.img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Genre Badge */}
                <motion.span 
                  className="absolute top-4 left-4 bg-rose-400 text-white text-xs font-medium px-3 py-1 rounded-full"
                  whileHover={{ scale: 1.05 }}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {blog.genre}
                </motion.span>
              </div>
              
              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold mb-2 text-gray-800">{blog.title}</h3>
                <p className="text-gray-600 mb-4 text-sm line-clamp-2">{blog.description}</p>
                
                <div className="flex justify-between items-center">
                  <motion.span 
                    className="text-xs text-gray-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {blog.date}
                  </motion.span>
                  
                  <motion.button
                    className="flex items-center text-rose-400 font-medium text-sm group"
                    whileHover={{ scale: 1.05 }}
                  >
                    View More
                    <motion.div 
                      className="ml-1"
                      initial={{ x: 0 }}
                      whileHover={{ x: 2 }}
                    >
                      <ArrowUpRight size={16} />
                    </motion.div>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;