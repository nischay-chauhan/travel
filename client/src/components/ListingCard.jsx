import { useState, useEffect } from "react"; 
import { Heart, ChevronLeft, ChevronRight } from "lucide-react"; 
import { useNavigate } from "react-router-dom"; 
import { motion } from "framer-motion"; 
import { useSelector, useDispatch } from "react-redux"; 
import axios from "axios"; 
import { toast } from "react-hot-toast"; 
import PropTypes from 'prop-types';
import { setWishList } from "../redux/state"; 

const cardVariants = { 
  hidden: { opacity: 0, y: 20 }, 
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6 
    } 
  } 
}; 

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
  booking = false, 
}) => { 
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [isLiked, setIsLiked] = useState(false); 
  const navigate = useNavigate(); 
  const dispatch = useDispatch(); 
  const user = useSelector((state) => state.user); 
  const wishlist = useSelector((state) => state.user?.wishList || []); 

  useEffect(() => { 
    setIsLiked(wishlist?.some((item) => item?._id === listingId)); 
  }, [wishlist, listingId]); 

  const patchWishList = async (e) => { 
    e.stopPropagation(); 
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
        `/users/${user?._id}/${listingId}` 
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

  const goToPrevSlide = (e) => { 
    e.stopPropagation(); 
    setCurrentIndex( 
      (prevIndex) => (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length 
    ); 
  }; 

  const goToNextSlide = (e) => { 
    e.stopPropagation(); 
    setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length); 
  }; 

  return ( 
    <motion.div 
      variants={cardVariants} 
      initial="hidden" 
      animate="visible" 
      className="bg-card text-card-foreground rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group" 
      onClick={() => navigate(`/properties/${listingId}`)} 
    > 
      <div className="relative"> 
        <div className="relative overflow-hidden rounded-t-2xl aspect-square"> 
          {listingPhotoPaths?.length > 0 ? ( 
            <> 
              <img 
                src={`/${listingPhotoPaths[currentIndex]?.replace("public", "")}`} 
                alt={`photo ${currentIndex + 1}`} 
                className="w-full h-full object-cover" 
              /> 
              
              {listingPhotoPaths.length > 1 && ( 
                <> 
                  <button 
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-foreground/50 hover:bg-foreground/75 text-background rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" 
                    onClick={goToPrevSlide} 
                  > 
                    <ChevronLeft className="w-4 h-4" /> 
                  </button> 
                  <button 
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-foreground/50 hover:bg-foreground/75 text-background rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" 
                    onClick={goToNextSlide} 
                  > 
                    <ChevronRight className="w-4 h-4" /> 
                  </button> 
                </> 
              )} 
            </> 
          ) : ( 
            <div className="w-full h-full bg-muted flex items-center justify-center"> 
              <p className="text-muted-foreground">No Image</p> 
            </div> 
          )} 

          <button 
            className={`absolute top-4 right-4 rounded-full p-2 transition-colors duration-200 z-10 ${
              isLiked 
                ? "bg-red-500/30 hover:bg-red-500/50 text-red-500 hover:text-red-600" 
                : "bg-foreground/30 hover:bg-foreground/50 text-background hover:text-background" 
            }`} 
            onClick={patchWishList} 
            disabled={!user} 
          > 
            <Heart 
              className={`h-5 w-5 ${
                isLiked ? "fill-red-500" : "fill-transparent stroke-current" 
              }`} 
            /> 
            <span className="sr-only">Add to wishlist</span> 
          </button> 
        </div> 

        <div className="p-6 space-y-1.5"> 
          <h3 className="text-lg font-semibold text-foreground truncate"> 
            {city}, {province}, {country} 
          </h3> 
          <p className="text-muted-foreground text-sm">{category}</p> 
          
          {!booking ? ( 
            <> 
              <p className="text-muted-foreground text-sm">{type}</p> 
              <p className="text-lg font-semibold text-foreground"> 
                <span>${price}</span>{" "} 
                <span className="text-sm text-muted-foreground">per night</span> 
              </p> 
            </> 
          ) : ( 
            <> 
              <p className="text-sm text-muted-foreground"> 
                {formatDateWithoutGMT(startDate)} - {formatDateWithoutGMT(endDate)} 
              </p> 
              <p className="text-lg font-semibold text-foreground"> 
                <span>${totalPrice}</span>{" "} 
                <span className="text-sm text-muted-foreground">total</span> 
              </p> 
            </> 
          )} 
        </div> 
      </div> 
    </motion.div> 
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
  startDate: PropTypes.string, 
  endDate: PropTypes.string, 
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
