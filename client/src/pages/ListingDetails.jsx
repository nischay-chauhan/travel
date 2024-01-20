import  { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { facilities } from "../data";
import axios from "axios";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "../styles/ListingDetails.css"; 
import Loader from "../components/Loader";

const ListingDetails = () => {
  const [loading, setLoading] = useState(true);
  const { listingId } = useParams();
  const [listing, setListing] = useState({});

  const getListingDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/properties/${listingId}`);
    //   console.log(response);
      setListing(response.data.listing);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Error while fetching listing details. Please try again later.");
      console.error("Fetching the listing details failed:", error);
    }
  };

  useEffect(() => {
    getListingDetails();
  }, []);

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const dayCount = Math.round((end - start) / (1000 * 60 * 60 * 24));

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("WE'LL MAKE YOUR BOOKING SOON");
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="listing-details p-4 mx-auto max-w-3xl bg-white rounded-md shadow-md">
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
