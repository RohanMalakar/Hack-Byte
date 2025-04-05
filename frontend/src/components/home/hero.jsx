import React from 'react';
import { motion } from 'framer-motion';

const ImageCarousel = () => {
  // Sample image data - replace with your actual images
  const imagesRow1 = [
    "https://hips.hearstapps.com/hmg-prod/images/gh-int-womans-day-quotes-eleanor-roosevelt-1579630797.png?crop=1xw:1xh;center,top&resize=980:*",
    "https://mir-s3-cdn-cf.behance.net/projects/404/397ed5220184155.67beb139537be.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlPPe0o3PlPZLA55lUHNlDkfGJvtCnJSfMGC80IMbM44AmZdkdMBQJvl_7iIeEF58X7Pc&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS53pCM_1t5noDLX_nAHsx8dOhV187R4KwY3uzwmbVhhE7IzKcxZVlW0ngv0DDDy7yu_dE&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIDQguw9pK80WIykY4LIEymaJWVzHemRW0hA&s",
    "https://cdn.create.vista.com/downloads/c8af33ef-2e13-4ca7-a540-e97c857047d5_1024.jpeg",
    "https://static.vecteezy.com/system/resources/previews/029/569/502/non_2x/women-holding-hands-together-women-support-women-hand-written-lettering-minimalist-flat-illustrations-trending-design-feminist-poster-psychological-help-vector.jpg",
    "https://www.keg.com/hubfs/Keystone%20Higher%20Ed%20Blog%20%2810%29.png",
    "https://i.pinimg.com/564x/ed/f6/88/edf688841859c86d4210bbaf012ff1ae.jpg",
    "https://images.squarespace-cdn.com/content/v1/6230b858a4f79b0527239263/1677635697868-HGO5W0BFD4ZN6QCYRPAU/Melinda-1.png",
    "https://hips.hearstapps.com/hmg-prod/images/international-womens-day-quotes-9-67b64614c267f.png?crop=1xw:1xh;center,top&resize=980:*",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNnWClL295Ar3wtAmiKsr7SyYSc5cpHoHPHsltLgPIbf8TalD7e7pREZq5i9ymFTybC7Y&usqp=CAU"
  ];
  
  
  // Animation settings - increased speed
  const animationSettings = {
    duration: 25,
    repeat: Infinity,
    ease: "linear"
  };
  
  return (
    <div className="w-full overflow-hidden bg-rose-50">
      <h2 className="text-3xl font-bold text-center my-7 mb-3 text-rose-800">Empowering Women Through Support</h2>

      
      {/* First row - Left to Right */}
      <div className="relative w-full overflow-hidden mb-4 py-4">
        <motion.div
          className="flex"
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={animationSettings}
        >
          {/* Original set of images */}
          {imagesRow1.map((img, index) => (
            <motion.div
              key={`row1-${index}`}
              className="flex-shrink-0 mx-2 overflow-hidden rounded-lg"
              whileHover={{ 
                scale: 1.1,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: { 
                  scale: { duration: 0.3, ease: "easeOut" },
                  boxShadow: { duration: 0.3 }
                }
              }}
              style={{ transformOrigin: "center center" }}
            >
              <motion.img
                src={img}
                alt={`Carousel Image ${index + 1}`}
                className="w-[356px] h-[356px] object-cover rounded-lg"
                initial={{ scale: 1 }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.5 }
                }}
              />
            </motion.div>
          ))}
          
          {/* Duplicated set for seamless loop */}
          {imagesRow1.map((img, index) => (
            <motion.div
              key={`row1-dup-${index}`}
              className="flex-shrink-0 mx-2 overflow-hidden rounded-lg"
              whileHover={{ 
                scale: 1.1,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: { 
                  scale: { duration: 0.3, ease: "easeOut" },
                  boxShadow: { duration: 0.3 }
                }
              }}
              style={{ transformOrigin: "center center" }}
            >
              <motion.img
                src={img}
                alt={`Carousel Image ${index + 1}`}
                className="w-[356px] h-[356px] object-cover rounded-lg"
                initial={{ scale: 1 }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.5 }
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Second row - Right to Left */}
      <div className="relative w-full overflow-hidden ">
        <motion.div
          className="flex"
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          transition={animationSettings}
        >
      
        </motion.div>
      </div>
    </div>
  );
};

export default ImageCarousel;