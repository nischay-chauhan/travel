import { createBrowserRouter , RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import toast, {Toaster} from "react-hot-toast"
import CreateListing from "./pages/CreateListing"
import ListingDetails from "./pages/ListingDetails"
import TripLists from "./pages/TripLists"
import WishList from "./pages/WishList"
import PropertyList from "./pages/PropertyList"
import ReservationList from "./pages/ReservationList"
import CategoryPage from "./pages/CategoryPage"
import NotificationsPage from "./pages/NotificationsPage"
import  { useEffect } from 'react';
import io from 'socket.io-client';
import { useSelector } from "react-redux"
import OtpVerificationPage from "./components/OtpVerificationPage"
const router = createBrowserRouter([
  {
    path : "/",
    element : <Home />
  },
  {
    path : "/login",
    element : <LoginPage />
  },
  {
    path : "/register",
    element : <RegisterPage />
  },
  {
    path : "/create-listing",
    element : <CreateListing />
  },
  {
    path : "/properties/:listingId",
    element : <ListingDetails />
  },
  {
    path : "/properties/category/:category",
    element : <CategoryPage />
  },
  {
    path : "/:userId/trips",
    element : <TripLists />
  },
  {
    path : "/:userId/wishList",
    element : <WishList />
  },
  {
    path : "/:userId/properties",
    element : <PropertyList />
  },
  {
    path : "/:userId/reservation",
    element : <ReservationList />
  },
  {
    path : "/notifications",
    element : <NotificationsPage />
  },
  {
    path : "/verify-otp",
    element : <OtpVerificationPage />
  }
])

const App = () => {
  const user = useSelector((state) => state.user)
  useEffect(() => {
    const socket = io('http://localhost:3001');
  
    socket.on('connect', () => {
      console.log('Connected to socket server');
    });
  
    socket.on('newBooking', (notification) => {
      if(notification.booking.hostId === user._id) {
        toast.success(`New booking from ${notification.booking.customerId.name}`);
      }
      
    });
  
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
   <>
   <Toaster  />
   <RouterProvider router={router} />
   </>
  )
}

export default App