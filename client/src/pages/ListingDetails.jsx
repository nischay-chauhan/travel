import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { facilities } from "../data";
import axios from "axios";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "../styles/ListingDetails.css"; 
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";

const ListingDetails = () => { 
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { listingId } = useParams();
  const [listing, setListing] = useState({});
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const customerId = useSelector((state) => state?.user?._id);

  useEffect(() => {
    const getListingDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/properties/${listingId}`);
        setListing(response.data.listing);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("Error while fetching listing details. Please try again later.");
      }
    };

    getListingDetails();
  }, [listingId]);

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const dayCount = Math.round((end - start) / (1000 * 60 * 60 * 24));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customerId) {
      toast.error("Please login to book a property");
      return navigate('/login');
    }

    if (dayCount <= 0) {
      toast.error("Please select valid dates for booking.");
      return;
    }

    try {
      const bookingForm = {
        customerId,
        listingId,
        hostId: listing.creator._id,
        startDate: dateRange[0].startDate,
        endDate: dateRange[0].endDate,
        totalPrice: dayCount * listing.price,
      };

      const response = await axios.post("http://localhost:3001/bookings/create", bookingForm);
      console.log(response.status);
      if (response.status == 200) {
        console.log("this is getting hit")
        
        openRazorpayPaymentGateway(response.data);
      }
    } catch (error) {
      toast.error("Something went wrong while booking");
    }
  };

  const openRazorpayPaymentGateway = (booking) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_API_KEY, 
      amount: booking.totalPrice * 100,
      currency: "INR",
      name: "Booking Payment",
      description: "Payment for booking",
      order_id: booking.razorpayOrderId,
      handler: async function (response) {
        try {
          console.log(response , "this is response from payment gateway");
          const verificationResponse = await axios.post("http://localhost:3001/bookings/verify-payment", {
            order_id: response.razorpay_order_id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          });

          if (verificationResponse.status === 200) {
            toast.success("Payment successful and booking confirmed!");
            navigate(`/${customerId}/trips`);
          } else {
            toast.error("Payment verification failed. Please try again.");
          }
        } catch (error) {
          toast.error("Payment verification failed. Please try again.");
        }
      },
      prefill: {
        name: "Your Name",
        email: "your.email@example.com",
        contact: "9999999999"
      },
      theme: {
        color: "#3399cc"
      }
    };

    if (window.Razorpay) {
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } else {
      console.error("Razorpay SDK not loaded");
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <div className="listing-details mt-6 p-4 mx-auto max-w-5xl bg-white rounded-md shadow-md">
        <div className="title mb-4">
          <h1 className="text-2xl font-bold">{listing?.title}</h1>
        </div>
        <div className="photos mb-4 grid grid-cols-2 gap-4">
          {listing.listingPhotoPaths?.map((item) => (
            <img
              key={item}
              src={`http://localhost:3001/${item.replace("public", "")}`}
              alt=""
              className="w-full h-48 object-cover rounded-md"
            />
          ))}
        </div>
        <h2 className="text-lg">
          {listing.type} in {listing.city} , {listing.province} , {listing.country}
        </h2>
        <p>
          {listing.guestCount} guests - {listing.bedroomCount} bedroom(s) - {listing.bedCount} bed(s) -{" "}
          {listing.bathroomCount} bathroom(s)
        </p>
        <hr className="my-4" />

        <div className="profile flex items-center mb-4">
          {listing.creator && listing.creator.profileImagePath && (
            <img
              src={`http://localhost:3001/${listing.creator.profileImagePath.replace("public", "")}`}
              alt={`Hosted by ${listing.creator?.firstName} ${listing.creator?.lastName}`}
              className="w-12 h-12 object-cover rounded-full mr-4"
            />
          )}
          <h3 className="text-lg">
            Hosted by {listing.creator?.firstName} {listing.creator?.lastName}
          </h3>
        </div>
        <hr className="my-4" />

        <h3 className="text-xl font-semibold">Description</h3>
        <p>{listing.description}</p>
        <hr className="my-4" />

        <h3 className="text-xl font-semibold">{listing.highlight}</h3>
        <p>{listing.highlightDesc}</p>
        <hr className="my-4" />

        <div className="booking flex justify-between">
          <div className="mr-4">
            <h2 className="text-lg font-semibold mb-2">What this place offers?</h2>
            <div className="amenities flex flex-wrap">
              {listing.amenities[0].split(",").map((item, index) => (
                <div className="facility flex items-center mb-2" key={index}>
                  <div className="facility_icon mr-2">
                    {facilities.find((facility) => facility.name === item)?.icon}
                  </div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">How long do you want to stay?</h2>
            <div className="date-range-calendar">
              <DateRange ranges={dateRange} onChange={handleSelect} />
              {dayCount > 1 ? (
                <h2 className="text-xl font-bold mt-4">
                  ${listing.price} x {dayCount} nights
                </h2>
              ) : (
                <h2 className="text-xl font-bold mt-4">
                  ${listing.price} x {dayCount} night
                </h2>
              )}

              <h2 className="text-xl font-bold mt-2">Total price: ${listing.price * dayCount}</h2>
              <p>Start Date: {dateRange[0].startDate.toDateString()}</p>
              <p>End Date: {dateRange[0].endDate.toDateString()}</p>

              <button
                className="button mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                type="submit"
                onClick={handleSubmit}
              >
                BOOKING
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingDetails;
