import { useState, useEffect } from "react"; // Added useEffect for potential client-side checks
import { Heart, ChevronLeft, ChevronRight } from "lucide-react"; // Replaced react-icons
import { useNavigate } from "react-router-dom";
// import "../styles/ListingCard.css"; // To be removed
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import { setWishList } from "../redux/state";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";


const ListingCard = ({
  listingId,
  creator,
  listingPhotoPaths,
  city,
  province,
  country,
  category,
  type,
  price,
  startDate,
  endDate,
  totalPrice,
  booking,
}) => {
  // const [currentIndex, setCurrentIndex] = useState(0); // Carousel handles this
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const wishlist = useSelector((state) => state.user?.wishList || []);

  // Ensure component updates if wishlist changes externally or user logs in/out
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(wishlist?.some((item) => item?._id === listingId));
  }, [wishlist, listingId]);


  const patchWishList = async () => {
    if (!user) {
      toast.error("You must be logged in to add to wishlist.");
      navigate("/login");
      return;
    }
    try {
      if (user?._id === creator._id) {
        toast.error("You cannot add your own property to your wishlist.");
        return;
      }
      const response = await axios.patch(
        `http://localhost:3001/users/${user?._id}/${listingId}`
      );
      dispatch(setWishList(response.data.wishList));
      toast.success(isLiked ? "Removed from wishlist" : "Added to wishlist");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update wishlist. Please try again.");
    }
  };

  const formatDateWithoutGMT = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="w-full overflow-hidden cursor-pointer group" onClick={() => navigate(`/properties/${listingId}`)}>
      <div className="relative">
        <Carousel className="w-full">
          <CarouselContent>
            {listingPhotoPaths?.map((photo, index) => (
              <CarouselItem key={index}>
                <div className="aspect-square w-full relative">
                  <img
                    src={`http://localhost:3001/${photo?.replace("public", "")}`}
                    alt={`photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
            {(listingPhotoPaths?.length || 0) === 0 && (
                 <CarouselItem>
                    <div className="aspect-square w-full relative bg-muted flex items-center justify-center">
                        <p className="text-muted-foreground">No Image</p>
                    </div>
                 </CarouselItem>
            )}
          </CarouselContent>
          {listingPhotoPaths && listingPhotoPaths.length > 1 && (
            <>
              <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 hover:bg-black/75 text-white border-none" onClick={(e) => e.stopPropagation()} />
              <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 hover:bg-black/75 text-white border-none" onClick={(e) => e.stopPropagation()} />
            </>
          )}
        </Carousel>
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-2 right-2 z-10 rounded-full bg-black/30 hover:bg-black/50 text-white hover:text-white ${isLiked ? "text-red-500 hover:text-red-600 bg-red-500/30 hover:bg-red-500/50" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            patchWishList();
          }}
          disabled={!user}
        >
          <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500" : "fill-transparent stroke-white"}`} />
          <span className="sr-only">Add to wishlist</span>
        </Button>
      </div>

      <CardContent className="p-4 space-y-1.5">
        <h3 className="font-semibold text-lg truncate">
          {city}, {province}, {country}
        </h3>
        <p className="text-sm text-muted-foreground truncate">{category}</p>
        {!booking ? (
          <>
            <p className="text-sm text-muted-foreground truncate">{type}</p>
            <p className="font-semibold">
              <span className="text-lg">${price}</span>{" "}
              <span className="text-sm text-muted-foreground">per night</span>
            </p>
          </>
        ) : (
          <>
            <p className="text-sm">
              {formatDateWithoutGMT(startDate)} - {formatDateWithoutGMT(endDate)}
            </p>
            <p className="font-semibold">
              <span className="text-lg">${totalPrice}</span>{" "}
              <span className="text-sm text-muted-foreground">total</span>
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
};



ListingCard.propTypes = {
  listingId: PropTypes.string.isRequired,
  creator: PropTypes.object.isRequired,
  listingPhotoPaths: PropTypes.arrayOf(PropTypes.string).isRequired,
  city: PropTypes.string.isRequired,
  province: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  startDate: PropTypes.string, // Changed from Date to string, as it comes from API
  endDate: PropTypes.string,   // Changed from Date to string
  totalPrice: PropTypes.number,
  booking: PropTypes.bool,
};

ListingCard.defaultProps = {
  startDate: null,
  endDate: null,
  totalPrice: null,
  booking: false,
};

export default ListingCard;
