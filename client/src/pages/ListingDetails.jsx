import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { facilities } from "../data";
import axios from "axios";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // For DateRange picker
import "react-date-range/dist/theme/default.css"; // For DateRange picker
// import "../styles/ListingDetails.css"; // Removed
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Minus } from "lucide-react"; // For amenity fallback

const ListingDetails = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { listingId } = useParams();
  const [listing, setListing] = useState(null); // Initialize with null
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
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3001/properties/${listingId}`
        );
        setListing(response.data.listing);
      } catch (error) {
        console.error("Failed to fetch listing details:", error);
        toast.error(
          error.response?.data?.message ||
            "Error fetching listing details. Please try again later."
        );
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    if (listingId) {
      getListingDetails();
    }
  }, [listingId, navigate]);

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };

  // Ensure dayCount is at least 1 if start and end dates are the same.
  const dayCount = Math.max(1, Math.round((dateRange[0].endDate - dateRange[0].startDate) / (1000 * 60 * 60 * 24)));


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customerId) {
      toast.error("Please login to book a property");
      return navigate("/login");
    }

    if (!listing || !listing.creator || !listing.creator._id) {
        toast.error("Host information is missing. Cannot proceed with booking.");
        return;
    }

    const currentDayCount = Math.max(1, dayCount); // Re-affirm dayCount for safety

    try {
      const bookingForm = {
        customerId,
        listingId,
        hostId: listing.creator._id,
        startDate: dateRange[0].startDate.toISOString(),
        endDate: dateRange[0].endDate.toISOString(),
        totalPrice: currentDayCount * listing.price,
      };

      const response = await axios.post(
        "http://localhost:3001/bookings/create",
        bookingForm
      );
      if (response.status === 200) { // Check for 200 or 201 if your API returns that for creation
        openRazorpayPaymentGateway(response.data);
      }
    } catch (error) {
      console.error("Booking submission failed:", error);
      toast.error(error.response?.data?.message || "Something went wrong while booking.");
    }
  };

  const openRazorpayPaymentGateway = (booking) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_API_KEY,
      amount: booking.totalPrice * 100,
      currency: "INR",
      name: listing?.title || "Booking Payment",
      description: `Booking for ${listing?.type}`,
      order_id: booking.razorpayOrderId,
      handler: async function (response) {
        try {
          const verificationResponse = await axios.post(
            "http://localhost:3001/bookings/verify-payment",
            {
              order_id: response.razorpay_order_id,
              payment_id: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              bookingId: booking._id,
            }
          );

          if (verificationResponse.status === 200) {
            toast.success("Payment successful and booking confirmed!");
            navigate(`/${customerId}/trips`);
          } else {
            toast.error(verificationResponse.data.message || "Payment verification failed.");
          }
        } catch (error) {
          console.error("Payment verification API error:", error);
          toast.error(error.response?.data?.message || "Payment verification failed. Please try again.");
        }
      },
      prefill: {
        // Consider fetching user's name/email from Redux state if available
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#F43F5E", // Example: Tailwind rose-500
      },
      modal: {
        ondismiss: function() {
          toast.info("Payment was not completed.");
        }
      }
    };

    if (window.Razorpay) {
      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response){
        toast.error(`Payment failed: ${response.error.description}`);
        // Handle payment failure, e.g., update booking status on server
        axios.post(`http://localhost:3001/bookings/payment-failed`, {
            bookingId: booking._id,
            razorpayOrderId: response.error.metadata.order_id,
            razorpayPaymentId: response.error.metadata.payment_id,
        }).catch(err => console.error("Failed to update payment failure status", err));
      });
      rzp1.open();
    } else {
      console.error("Razorpay SDK not loaded");
      toast.error("Payment gateway is currently unavailable. Please try again later.");
    }
  };

  if (loading) return <Loader />;
  if (!listing) return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-semibold">Listing not found.</h1>
        <Button onClick={() => navigate('/')} className="mt-4">Go Home</Button>
      </div>
    </>
  );

  const calculatedTotalPrice = dayCount * listing.price;

  return (
    <div className="pb-12 bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-6">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-2 break-words">
          {listing.title}
        </h1>
        {/* Location */}
        <p className="text-lg text-muted-foreground mb-4">
          {listing.type} in {listing.city}, {listing.province}, {listing.country}
        </p>

        {/* Image Carousel */}
        {listing.listingPhotoPaths && listing.listingPhotoPaths.length > 0 ? (
          <Carousel className="w-full max-w-4xl mx-auto mb-8 rounded-lg overflow-hidden shadow-lg">
            <CarouselContent>
              {listing.listingPhotoPaths.map((photo, index) => (
                <CarouselItem key={index}>
                  <div className="aspect-[16/9] w-full"> {/* Maintain aspect ratio */}
                    <img
                      src={`http://localhost:3001/${photo.replace("public", "")}`}
                      alt={`Listing photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {listing.listingPhotoPaths.length > 1 && (
              <>
                <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
                <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
              </>
            )}
          </Carousel>
        ) : (
          <div className="aspect-[16/9] w-full max-w-4xl mx-auto mb-8 rounded-lg bg-muted flex items-center justify-center shadow-lg">
            <p className="text-muted-foreground">No images available</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: Details & Host Info */}
          <div className="md:col-span-2 space-y-6">
            {/* Guest Info */}
            <p className="text-lg text-foreground">
              {listing.guestCount} guests - {listing.bedroomCount} bedroom(s) -{" "}
              {listing.bedCount} bed(s) - {listing.bathroomCount} bathroom(s)
            </p>
            <Separator />

            {/* Host Info */}
            {listing.creator && (
              <div className="flex items-center space-x-4">
                <Avatar className="h-14 w-14">
                  <AvatarImage
                    src={listing.creator.profileImagePath
                           ? `http://localhost:3001/${listing.creator.profileImagePath.replace("public", "")}`
                           : undefined } // undefined src will trigger fallback
                    alt={`${listing.creator.firstName} ${listing.creator.lastName}`}
                  />
                  <AvatarFallback>
                    {listing.creator.firstName?.charAt(0).toUpperCase()}
                    {listing.creator.lastName?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">
                    Hosted by {listing.creator.firstName} {listing.creator.lastName}
                  </h3>
                  {/* Add more host details if available, e.g., join date, superhost badge */}
                </div>
              </div>
            )}
            <Separator />

            {/* Description */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Description</h3>
              <p className="text-foreground whitespace-pre-wrap">
                {listing.description}
              </p>
            </div>
            <Separator />

            {/* Highlight */}
            {listing.highlight && (
              <div>
                <h3 className="text-xl font-semibold mb-1">{listing.highlight}</h3>
                <p className="text-muted-foreground">{listing.highlightDesc}</p>
              </div>
            )}
            <Separator />

            {/* Amenities */}
            <div>
              <h3 className="text-xl font-semibold mb-3">What this place offers</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                {listing.amenities && listing.amenities[0] && typeof listing.amenities[0] === 'string'
                 ? listing.amenities[0].split(",").map((item, index) => {
                    const facility = facilities.find(
                      (facility) => facility.name === item.trim()
                    );
                    return (
                      <div className="flex items-center space-x-3" key={index}>
                        {facility?.icon ? <span className="text-primary text-2xl">{facility.icon}</span> : <Minus className="w-5 h-5 text-muted-foreground" />}
                        <span className="text-foreground">{item.trim()}</span>
                      </div>
                    );
                  })
                 : <p className="text-muted-foreground">No amenities listed.</p>}
              </div>
            </div>
          </div>

          {/* Right Column: Booking Widget */}
          <div className="md:col-span-1">
            <Card className="sticky top-24 shadow-lg"> {/* Make booking card sticky */}
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Book your stay</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="date-range-calendar-container overflow-x-auto border rounded-md p-1"> {/* Container for date picker + border */}
                  <DateRange
                    editableDateInputs={true}
                    onChange={handleSelect}
                    moveRangeOnFirstSelection={false}
                    ranges={dateRange}
                    className="w-full" // Attempt to make it responsive
                    minDate={new Date()} // Prevent selecting past dates
                  />
                </div>
                <Separator />
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold">
                    Price details
                  </h3>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      ${listing.price} x {dayCount} {dayCount > 1 ? "nights" : "night"}
                    </span>
                    <span>${calculatedTotalPrice}</span>
                  </div>
                  {/* Add other fees like service fee, cleaning fee if applicable */}
                  <div className="flex justify-between font-bold text-lg pt-2">
                    <span>Total price</span>
                    <span>${calculatedTotalPrice}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Selected: {dateRange[0].startDate.toLocaleDateString()} - {dateRange[0].endDate.toLocaleDateString()}
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full text-lg py-6"
                  onClick={handleSubmit}
                  disabled={loading || !customerId || dayCount <= 0}
                >
                  {customerId ? 'Request to Book' : 'Login to Book'}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;
