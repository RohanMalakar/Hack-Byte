import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import blogs from './blogs.json'; // adjust the path as per your folder structure

const BlogSection = () => {
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
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section>
      <div className="px-5 py-12 bg-rose-50">
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
              <div className="overflow-hidden h-48 relative">
                <motion.img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />

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

                  <motion.a
                    href={blog.url}
                    target="_blank"
                    rel="noopener noreferrer"
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
                  </motion.a>
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
