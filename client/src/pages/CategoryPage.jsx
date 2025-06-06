import { useState, useEffect } from "react";
// import "../styles/List.css"; // To be removed
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setListings } from "../redux/state";
import Loader from "../components/Loader"; // Assuming Loader is a simple spinner/message
import ListingCard from "../components/ListingCard";

const CategoryPage = () => {
  const [loading, setLoading] = useState(true);
  const { category } = useParams();

  const dispatch = useDispatch();
  const listingsData = useSelector((state) => state.listings); // Renamed for clarity

  const getFeedListings = async () => {
    setLoading(true); // Ensure loading is true at the start of fetch
    try {
      const response = await fetch(
        // Ensure your backend API can handle URL encoded categories if they contain spaces or special chars
        `http://localhost:3001/properties?category=${encodeURIComponent(category)}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      if (response.ok) {
        dispatch(setListings({ listings: data }));
      } else {
        // Handle non-OK responses, e.g., show a toast, set an error state
        console.error("Failed to fetch listings:", data.message || response.statusText);
        dispatch(setListings({ listings: [] })); // Clear previous listings or handle error appropriately
      }
    } catch (err) {
      console.error("Fetch Listings Failed", err.message);
      dispatch(setListings({ listings: [] })); // Clear listings on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeedListings();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, dispatch]); // Added dispatch to dependency array as it's used in effect

  // Extracted listings array for cleaner access
  const currentListings = listingsData?.listings || [];

  return (
    <div className="pb-12"> {/* Added padding-bottom for spacing */}
      <Navbar />
      <div className="container mx-auto px-4 pt-8">
        <h1 className="text-3xl font-semibold mb-8 text-center md:text-left capitalize">
          {category} Listings
        </h1>
        {loading ? (
          <Loader />
        ) : (
          <>
            {currentListings && currentListings.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {currentListings.map(
                  (listing) => (
                    <ListingCard
                      key={listing._id}
                      listingId={listing._id}
                      creator={listing.creator}
                      listingPhotoPaths={listing.listingPhotoPaths}
                      city={listing.city}
                      province={listing.province}
                      country={listing.country}
                      category={listing.category}
                      type={listing.type}
                      price={listing.price}
                      booking={listing.booking || false} // Ensure booking defaults to false if undefined
                    />
                  )
                )}
              </div>
            ) : (
              <p className="text-center text-muted-foreground text-xl my-12">
                No listings found under the "{category}" category.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
