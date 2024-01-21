import { useEffect, useState } from "react"
import "../styles/List.css"
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import {useSelector , useDispatch} from "react-redux"
import axios from "axios"
import { setTripList } from "../redux/state";
import {toast} from "react-hot-toast"
import ListingCard from "../components/ListingCard";
const TripLists = () => {
    const dispatch = useDispatch()
    const [loading , setLoading] = useState(true);
    const tripList = useSelector((state) => state.user.tripList);
    const userId = useSelector((state) => state.user._id);
    const getTripList = async () => {
        try{
            const response =await axios.get(`http://localhost:3001/users/${userId}/trips`);

            console.log(response.data);
            dispatch(setTripList(response.data));
            setLoading(false);
        }catch(error){
            console.log( "Error during fetching the get Trip lists " ,error);
            toast
        }
    }

    useEffect(() => {
        getTripList()
    } , [])

  return loading ? <Loader /> :
   (
    <>
    <Navbar />
    <h1 className="title-list text-3xl font-bold">Your Trip Lists </h1>
        <div className="list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tripList?.map(({ listingId, hostId, startDate, endDate, totalPrice, booking=true }) => (
          <ListingCard
            key={listingId._id}
            listingId={listingId._id}
            creator={hostId._id}
            listingPhotoPaths={listingId.listingPhotoPaths}
            city={listingId.city}
            province={listingId.province}
            country={listingId.country}
            category={listingId.category}
            startDate={startDate}
            endDate={endDate}
            totalPrice={totalPrice}
            booking={booking}
          />
        ))}
        </div>
   
    </>
  )
}

export default TripLists