import { useEffect, useState } from "react";
// import "../styles/List.css"; // Already removed
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setReservationList } from "../redux/state";
import ListingCard from "../components/ListingCard";
import axios from "axios";
import { toast } from "react-hot-toast";
import { CalendarCheck } from "lucide-react"; // For empty state icon

const ReservationList = () => {
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.user?._id); // Safe access
  const reservationList = useSelector((state) => state.user?.reservationList || []); // Default to empty array

  const dispatch = useDispatch();

  const getReservationList = async () => {
    if (!userId) {
      setLoading(false);
      dispatch(setReservationList([]));
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(
        `/users/${userId}/reservation`
      );
      dispatch(setReservationList(response.data));
    } catch (err) {
      console.error("Fetch Reservation List failed!", err.message);
      toast.error("Failed to fetch your reservations.");
      dispatch(setReservationList([]));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReservationList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="pb-12">
      <Navbar />
      <div className="container mx-auto px-4 pt-8">
        <h1 className="text-3xl font-semibold mb-8 text-center md:text-left">
          Your Reservation List
        </h1>
        {reservationList && reservationList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {reservationList.map((reservation) => {
              if (!reservation.listingId || !reservation.hostId) {
                console.warn("Reservation item missing listingId or hostId:", reservation);
                return null; // Skip rendering if essential data is missing
              }
              // Assuming hostId is an object like { _id: "someId", ... }
              // If hostId is just an ID string, creator should be { _id: reservation.hostId }
              const creatorDetails = typeof reservation.hostId === 'string'
                                     ? { _id: reservation.hostId }
                                     : reservation.hostId;
              return (
                <ListingCard
                  key={reservation._id || reservation.listingId._id}
                  listingId={reservation.listingId._id}
                  creator={creatorDetails}
                  listingPhotoPaths={reservation.listingId.listingPhotoPaths}
                  city={reservation.listingId.city}
                  province={reservation.listingId.province}
                  country={reservation.listingId.country}
                  category={reservation.listingId.category}
                  type={reservation.listingId.type} // type might not be on listingId for reservations
                  price={reservation.listingId.price} // price might not be on listingId for reservations
                  startDate={reservation.startDate}
                  endDate={reservation.endDate}
                  totalPrice={reservation.totalPrice}
                  booking={true} // Explicitly true
                />
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <CalendarCheck className="w-24 h-24 text-muted-foreground/50 mb-4" strokeWidth={1}/>
            <p className="text-xl text-muted-foreground mb-2">No reservations found for your properties.</p>
            <p className="text-sm text-muted-foreground">
              When users book your properties, their reservations will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationList;
