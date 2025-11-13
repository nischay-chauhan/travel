import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { categories } from '../data';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6
    }
  }
};

const Categories = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="categories bg-background text-foreground p-8">
      <motion.h1 
        className="text-4xl font-bold mb-4 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Explore Top Categories
      </motion.h1>
      <motion.p 
        className="text-muted-foreground mb-8 text-xl text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Explore our wide range of vacation rentals that cater to all types of travelers. Immerse yourself in the local culture, enjoy the comforts of home, and create unforgettable memories in your dream destination.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {categories?.slice(1, 7).map((category, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.1 }}
          >
            <Link
              to={`/properties/category/${category.label}`}
              className="relative overflow-hidden rounded-md transition-transform duration-300 transform hover:scale-105 shadow-md block"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={category.img}
                alt={category.label}
                className="w-full h-64 md:h-48 lg:h-40 object-cover rounded-md"
              />
              <div
                className={`absolute inset-0 bg-foreground opacity-30 transition-opacity duration-300 ${
                  hoveredIndex === index ? 'opacity-0' : 'opacity-30'
                }`}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className={`text-primary-foreground text-center transform transition-transform duration-300 ease-in-out ${
                    hoveredIndex === index ? 'scale-110' : ''
                  } [text-shadow:0_1px_3px_rgba(0,0,0,0.5)]`}
                >
                  <div className="text-2xl">{category.icon}</div>
                  <p className="mt-2">{category.label}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Categories;