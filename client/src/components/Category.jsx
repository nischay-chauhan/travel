import { Link } from 'react-router-dom';
import { useState } from 'react';
import {categories} from "../data"
const Categories = () => {
 
  const [hoveredIndex, setHoveredIndex] = useState(null)


  return (
    <div className="categories bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-4 text-center">Explore Top Categories</h1>
      <p className="text-gray-600 mb-8 text-xl text-center">
        Explore our wide range of vacation rentals that cater to all types of travelers. Immerse yourself in the local culture, enjoy the comforts of home, and create unforgettable memories in your dream destination.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {categories?.slice(1, 7).map((category, index) => (
          <Link
            to={``}
            key={index}
            className="relative overflow-hidden rounded-md transition-transform duration-300 transform hover:scale-105 shadow-md"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img
              src={category.img}
              alt={category.label}
              className="w-full h-64 md:h-48 lg:h-40 object-cover rounded-md"
            />
            <div
              className={`absolute inset-0 bg-black opacity-30 transition-opacity duration-300 ${
                hoveredIndex === index ? 'opacity-0' : 'opacity-30'
              }`}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className={`text-white text-center transform ${
                  hoveredIndex === index ? 'scale-110' : ''
                }`}
                style={{ transition: 'transform 0.3s ease-in-out' }}
              >
                <div className="text-2xl">{category.icon}</div>
                <p className="mt-2">{category.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;