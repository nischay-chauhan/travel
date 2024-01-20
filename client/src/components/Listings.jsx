import { useEffect, useState } from "react";
import { categories } from "../data";
import ListingCard from "./ListingCard";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { setListings } from "../redux/state";

const Listings = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const listings = useSelector((state) => state.listings);

  const getFeedListings = async () => {
    try {
      const response = await fetch(
        selectedCategory !== "All"
          ? `http://localhost:3001/properties?category=${selectedCategory}`
          : "http://localhost:3001/properties",
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
            className={`flex hover:cursor-pointer items-center justify-center h-32 w-32 p-4 bg-gray-200 rounded-md hover:scale-105 transition-transform duration-300 ${
              category.label === selectedCategory ? "bg-blue-300" : ""
            }`}
          >
            <div className="flex items-center justify-center text-3xl">
              {category.icon}
            </div>
            <p className="text-base mt-2">{category.label}</p>
          </div>
        ))}
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
        </div>
      )}
    </>
  );
};

export default Listings;
