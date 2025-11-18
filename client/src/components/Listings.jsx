import { useEffect, useState } from "react";
import { categories } from "../data";
import ListingCard from "./ListingCard";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { setListings } from "../redux/state";
import { motion } from "framer-motion"; // Import motion

const containerVariants = { // Define containerVariants
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Listings = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const listings = useSelector((state) => state.listings);

  const getFeedListings = async () => {
    try {
      const response = await fetch(
        selectedCategory !== "All"
          ? `/properties?category=${selectedCategory}`
          : "/properties",
        {
          method: "GET",
        }
      );

      const data = await response.json();
      dispatch(setListings({ listings: data }));
      console.log(listings);
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listings Failed", err.message);
    }
  };

  useEffect(() => {
    getFeedListings();
  }, [selectedCategory]);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-6 mt-6 mb-6">
        {categories?.map((category, index) => (
          <div
            key={index}
            onClick={() => setSelectedCategory(category.label)}
            className={`flex flex-col text-center hover:cursor-pointer items-center justify-center h-32 w-32 p-4 rounded-md hover:scale-105 transition-all duration-300 ${
              category.label === selectedCategory ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            <div className="text-3xl"> {/* Icon inherits color */}
              {category.icon}
            </div>
            <p className="text-sm mt-2 font-medium">{category.label}</p> {/* Label inherits color, adjusted size */}
          </div>
        ))}
      </div>

      {loading ? (
        <Loader />
      ) : (
        <>
        <div className="flex justify-center mt-10 p-4">
         <h1 className="text-3xl font-bold text-foreground">Listings Presented By Others</h1>
         </div>
        <motion.div
          className="grid grid-cols-2 mb-10 md:grid-cols-3 lg:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {Array.isArray(listings.listings) ? (
            listings.listings.map(
              ({
                _id,
                creator,
                listingPhotoPaths,
                city,
                province,
                country,
                category,
                type,
                price,
                booking=false
              }) => (
                <ListingCard
                  key={_id}
                  listingId={_id}
                  creator={creator}
                  listingPhotoPaths={listingPhotoPaths}
                  city={city}
                  province={province}
                  country={country}
                  category={category}
                  type={type}
                  price={price}
                  booking={booking}
                  
                />
              )
            )
          ) : (
            <p>Error: Invalid listings format</p>
          )}
        </motion.div>
        </>
      )}
    </>
  );
};

export default Listings;
