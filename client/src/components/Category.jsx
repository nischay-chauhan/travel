import { Link } from 'react-router-dom';
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import { IoDiamond } from "react-icons/io5";
import { BiWorld } from 'react-icons/bi';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import {MdOutlineVilla} from "react-icons/md"
import { useState } from 'react';
export const categories = [
    {
      label: 'All',
      icon: <BiWorld />,
    },
    {
      img: 'assets/beach_cat.jpg',
      label: 'Beachfront',
      icon: <TbBeach />,
      description: 'This property is close to the beach!',
    },
    {
      img: 'assets/windmill_cat.webp',
      label: 'Windmills',
      icon: <GiWindmill />,
      description: 'This property has windmills!',
    },
    {
      img: 'assets/modern_cat.webp',
      label: 'Iconic cities',
      icon: <MdOutlineVilla />,
      description: 'This property is modern!',
    },
    {
      img: 'assets/countryside_cat.webp',
      label: 'Countryside',
      icon: <TbMountain />,
      description: 'This property is in the countryside!',
    },
    {
      img: 'assets/pool_cat.jpg',
      label: 'Amazing Pools',
      icon: <TbPool />,
      description: 'This property has a beautiful pool!',
    },
    {
      img: 'assets/island_cat.webp',
      label: 'Islands',
      icon: <GiIsland />,
      description: 'This property is on an island!',
    },
    {
      img: 'assets/lake_cat.webp',
      label: 'Lakefront',
      icon: <GiBoatFishing />,
      description: 'This property is near a lake!',
    },
    {
      img: 'assets/skiing_cat.jpg',
      label: 'Ski-in/out',
      icon: <FaSkiing />,
      description: 'This property has skiing activities!',
    },
    {
      img: 'assets/castle_cat.webp',
      label: 'Castles',
      icon: <GiCastle />,
      description: 'This property is an ancient castle!',
    },
    {
      img: 'assets/cave_cat.jpg',
      label: 'Caves',
      icon: <GiCaveEntrance />,
      description: 'This property is in a spooky cave!',
    },
    {
      img: 'assets/camping_cat.jpg',
      label: 'Camping',
      icon: <GiForestCamp />,
      description: 'This property offers camping activities!',
    },
    {
      img: 'assets/arctic_cat.webp',
      label: 'Arctic',
      icon: <BsSnow />,
      description: 'This property is in an arctic environment!',
    },
    {
      img: 'assets/desert_cat.webp',
      label: 'Desert',
      icon: <GiCactus />,
      description: 'This property is in the desert!',
    },
    {
      img: 'assets/barn_cat.jpg',
      label: 'Barns',
      icon: <GiBarn />,
      description: 'This property is in a barn!',
    },
    {
      img: 'assets/lux_cat.jpg',
      label: 'Luxury',
      icon: <IoDiamond />,
      description: 'This property is brand new and luxurious!',
    },
  ];

const Categories = () => {
 
  const [hoveredIndex, setHoveredIndex] = useState(null)


  return (
    <div className="categories bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Explore Top Categories</h1>
      <p className="text-gray-600 mb-8 text-center">
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