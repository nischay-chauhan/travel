// import "../styles/List.css"; // Removed
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import { Heart } from "lucide-react"; // For empty state icon

const WishList = () => {
  const wishList = useSelector((state) => state.user?.wishList || []); // Added default empty array

  return (
    <div className="pb-12">
      <Navbar />
      <div className="container mx-auto px-4 pt-8">
        <h1 className="text-3xl font-semibold mb-8 text-center md:text-left">
          Your Wish List
        </h1>
        {wishList && wishList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {wishList.map(
              (item) => ( // Renamed to item for clarity, assuming these are full listing objects
                <ListingCard
                  key={item._id}
                  listingId={item._id}
                  creator={item.creator}
                  listingPhotoPaths={item.listingPhotoPaths}
                  city={item.city}
                  province={item.province}
                  country={item.country}
                  category={item.category}
                  type={item.type}
                  price={item.price}
                  booking={item.booking || false} // Ensure booking defaults to false
                />
              )
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <Heart className="w-24 h-24 text-muted-foreground/50 mb-4" strokeWidth={1} />
            <p className="text-xl text-muted-foreground mb-2">Your wishlist is empty.</p>
            <p className="text-sm text-muted-foreground">
              Browse listings and click the heart icon to save your favorites here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishList;
