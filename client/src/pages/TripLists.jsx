import { useEffect, useState } from "react";
// import "../styles/List.css"; // Removed
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setTripList } from "../redux/state";
import { toast } from "react-hot-toast";
import ListingCard from "../components/ListingCard";
import { Plane } from "lucide-react"; // For empty state icon

const TripLists = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.user?._id); // Safely access _id
  const tripList = useSelector((state) => state.user?.tripList || []); // Default to empty array

  const getTripList = async () => {
    if (!userId) { // Guard clause if user is not available
      setLoading(false);
      dispatch(setTripList([]));
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3001/users/${userId}/trips`
      );
      dispatch(setTripList(response.data));
    } catch (error) {
      console.error("Error during fetching the get Trip lists ", error);
      toast.error("Failed to fetch your trip list.");
      dispatch(setTripList([])); // Clear trip list on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTripList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, dispatch]); // Depend on userId and dispatch

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="pb-12">
      <Navbar />
      <div className="container mx-auto px-4 pt-8">
        <h1 className="text-3xl font-semibold mb-8 text-center md:text-left">
          Your Trip List
        </h1>
        {tripList && tripList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {tripList.map((trip) => {
              // Assuming trip.listingId contains the actual listing details
              // And trip.hostId is the creator of the listing
              if (!trip.listingId) {
                console.warn("Trip item missing listingId:", trip);
                return null; // Skip rendering if listingId is missing
              }
              return (
                <ListingCard
                  key={trip._id || trip.listingId._id} // Use trip._id if available, else fallback
                  listingId={trip.listingId._id}
                  // Assuming hostId is the creator object. If it's just an ID, it might need adjustment
                  // based on what ListingCard expects for `creator`.
                  // ListingCard expects `creator` to be an object with `_id`.
                  // If hostId is just an ID string, this might be: creator={{ _id: trip.hostId }}
                  // For now, assuming hostId is an object like: { _id: "someId", ...otherCreatorDetails }
                  // If listingId.creator is available and correct, that might be preferable.
                  creator={trip.hostId || trip.listingId.creator}
                  listingPhotoPaths={trip.listingId.listingPhotoPaths}
                  city={trip.listingId.city}
                  province={trip.listingId.province}
                  country={trip.listingId.country}
                  category={trip.listingId.category}
                  type={trip.listingId.type} // type might not be directly on listingId for trips, adjust if needed
                  price={trip.listingId.price} // price might not be directly on listingId for trips, adjust if needed
                  startDate={trip.startDate}
                  endDate={trip.endDate}
                  totalPrice={trip.totalPrice}
                  booking={true} // Explicitly true for trips
                />
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <Plane className="w-24 h-24 text-muted-foreground/50 mb-4" strokeWidth={1}/>
            <p className="text-xl text-muted-foreground mb-2">You have no trips booked.</p>
            <p className="text-sm text-muted-foreground">
              When you book a trip, it will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripLists;
