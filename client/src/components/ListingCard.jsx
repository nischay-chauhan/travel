import { useState } from "react";
import { BiArrowBack, BiArrowToRight , BiHeart  } from "react-icons/bi";
import { IoHeartOutline } from "react-icons/io5";
import {useNavigate} from "react-router-dom"
import "../styles/ListingCard.css";
import PropTypes from "prop-types"
import {useSelector , useDispatch} from "react-redux"
import axios from "axios"
import {toast} from "react-hot-toast"
import { setWishList } from "../redux/state";

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
  booking
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user);
  const wishlist = useSelector((state) => state.user.wishList);
  
  const isLiked = wishlist.find((item) => item._id === listingId);

  const patchWishList = async() => {
    try{
        const response = await axios.patch(`http://localhost:3001/users/${user._id}/${listingId}`)
        console.log(response.data.wishList);
        dispatch(setWishList(response.data.wishList))
    }catch(error){
        console.log(error)
        toast.error("Error fetching liked listings")
    }
  }

  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length);
  };

  // Function to format date without GMT
  const formatDateWithoutGMT = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  return (
    <div
      className="listing-card  "
      onClick={() => {
        navigate(`/properties/${listingId}`);
      }}
    >
      <div className="slider-container">
        <div
          className="slider"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {listingPhotoPaths?.map((photo, index) => (
            <div key={index} className="slide">
              <img
                src={`http://localhost:3001/${photo?.replace("public", "")}`}
                alt={`photo ${index + 1}`}
                className="w-full h-64 md:h-48 lg:h-40 object-cover rounded-md"
              />
              <div
                className="prev-button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevSlide(e);
                }}
              >
                <BiArrowBack style={{ fontSize: "15px" }} />
              </div>
              <div
                className="next-button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNextSlide(e);
                }}
              >
                <BiArrowToRight style={{ fontSize: "15px" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <h3 className="text-2xl">
        {city}, {province}, {country}
      </h3>
      <p className="text-lg">{category}</p>
      {!booking ? (
        <>
          <p className="text-lg">{type}</p>
          <p>
            <span>${price}</span> per night
          </p>
        </>
      ) : (
        <>
          <p className="text-lg">{formatDateWithoutGMT(startDate)} - {formatDateWithoutGMT(endDate)}</p>
          <p className="text-lg">Total: ${totalPrice}</p> total
        </>
      )}
      <div className="favourite" onClick={(e) => {
        e.stopPropagation();
        patchWishList();
      }}>
        {isLiked ? (
          <BiHeart style={{ fontSize: '20px', color: 'red' }} />
        ) : (
          <IoHeartOutline style={{ fontSize: '20px' }} />
        )}
      </div>
    </div>
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
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date).isRequired,
  totalPrice: PropTypes.number.isRequired,
  booking: PropTypes.bool.isRequired,
};

export default ListingCard;
