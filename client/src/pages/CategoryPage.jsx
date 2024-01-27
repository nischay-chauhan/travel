import { useState, useEffect } from "react";
import "../styles/List.css"; 
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setListings } from "../redux/state";
import Loader from "../components/Loader";
import ListingCard from "../components/ListingCard";

const CategoryPage = () => {
  const [loading, setLoading] = useState(true);
  const { category } = useParams();

  const dispatch = useDispatch();
  const listings = useSelector((state) => state.listings);

  const getFeedListings = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/properties?category=${category}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      dispatch(setListings({ listings: data }));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listings Failed", err.message);
    }
  };

  useEffect(() => {
    getFeedListings();
  }, [category]);

  return (
    <>
      <Navbar />
      <h1 className="title-list text-3xl font-semibold mb-8 transition duration-300 ease-in-out hover:text-pink-500">
        {category} listings
      </h1>
      {loading ? (
        <Loader />
      ) : (
        <>
          {listings.listings && listings.listings.length > 0 ? (
            <div className="list grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {listings.listings.map(
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
                  booking = false,
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
              )}
            </div>
          ) : (
            <p className="text-center text-gray-500 my-8">
              No listings under {category} category.
            </p>
          )}
        </>
      )}
    </>
  );
};

export default CategoryPage;
