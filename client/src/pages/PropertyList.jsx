// import "../styles/List.css"; // Removed
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import { useEffect, useState } from "react";
import { setPropertyList } from "../redux/state";
import Loader from "../components/Loader";
import axios from "axios";
import { Home } from "lucide-react"; // For empty state icon
import { toast } from "react-hot-toast";

const PropertyList = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  // Ensure propertyList is always an array, even if user or user.propertyList is null/undefined
  const propertyList = useSelector((state) => state.user?.propertyList || []);
  const dispatch = useDispatch();

  const getPropertyList = async () => {
    if (!user?._id) { // Guard clause if user is not available (e.g., logged out)
      setLoading(false);
      dispatch(setPropertyList([])); // Clear any existing properties
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(
        `/users/${user._id}/properties`
      );
      dispatch(setPropertyList(response.data));
    } catch (err) {
      console.error("Fetch all properties failed:", err.message);
      toast.error("Failed to fetch your properties.");
      dispatch(setPropertyList([])); // Clear properties on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPropertyList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?._id, dispatch]); // Depend on user._id and dispatch

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="pb-12">
      <Navbar />
      <div className="container mx-auto px-4 pt-8">
        <h1 className="text-3xl font-semibold mb-8 text-center md:text-left">
          Your Property List
        </h1>
        {propertyList && propertyList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {propertyList.map((property) => (
              <ListingCard
                key={property._id}
                listingId={property._id}
                creator={property.creator} // Assuming creator is populated correctly
                listingPhotoPaths={property.listingPhotoPaths}
                city={property.city}
                province={property.province}
                country={property.country}
                category={property.category}
                type={property.type}
                price={property.price}
                booking={property.booking || false} // Ensure booking defaults to false
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <Home className="w-24 h-24 text-muted-foreground/50 mb-4" strokeWidth={1}/>
            <p className="text-xl text-muted-foreground mb-2">You haven't listed any properties yet.</p>
            <p className="text-sm text-muted-foreground">
              When you list properties, they will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyList;
