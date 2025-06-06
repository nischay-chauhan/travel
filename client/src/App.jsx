import { createBrowserRouter , RouterProvider } from "react-router-dom"
import RootLayout from "./layouts/RootLayout"; // Import RootLayout
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Toaster as SonnerToaster } from "sonner"; // Renamed to avoid conflict if react-hot-toast is still used elsewhere
import { toast as sonnerToast } from "sonner"; // Using sonner's toast
import CreateListing from "./pages/CreateListing";
import ListingDetails from "./pages/ListingDetails";
import TripLists from "./pages/TripLists";
import WishList from "./pages/WishList";
import PropertyList from "./pages/PropertyList";
import ReservationList from "./pages/ReservationList";
import CategoryPage from "./pages/CategoryPage";
import NotificationsPage from "./pages/NotificationsPage"; // Will be simplified
import { useEffect } from 'react';
import io from 'socket.io-client';
import { useSelector } from "react-redux";
import OtpVerificationPage from "./components/OtpVerificationPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "create-listing", element: <CreateListing /> },
      { path: "properties/:listingId", element: <ListingDetails /> },
      { path: "properties/category/:category", element: <CategoryPage /> },
      { path: ":userId/trips", element: <TripLists /> },
      { path: ":userId/wishList", element: <WishList /> },
      { path: ":userId/properties", element: <PropertyList /> },
      { path: ":userId/reservation", element: <ReservationList /> },
      { path: "notifications", element: <NotificationsPage /> },
      { path: "verify-otp", element: <OtpVerificationPage /> },
    ]
  }
]);

const App = () => {
  const user = useSelector((state) => state.user);

  useEffect(() => {
    // Ensure socket connection is only established if user is logged in,
    // or adjust server-side to handle anonymous sockets gracefully if needed.
    // For now, connecting anyway and registering if user exists.
    const socket = io('http://localhost:3001', {
      reconnectionAttempts: 3, // Example: limit reconnection attempts
      timeout: 10000, // Example: connection timeout
    });

    socket.on('connect', () => {
      console.log('Connected to socket server with ID:', socket.id);
      if (user?._id) {
        socket.emit('registerUser', user._id);
        console.log(`Emitted registerUser event for userId: ${user._id}`);
      }
    });

    socket.on('newBooking', (data) => {
      // The server now sends a targeted message.
      // No need to check hostId === user._id here if server does it right.
      // However, if App.jsx socket is for *any* logged-in user, this check might still be relevant
      // if the `registerUser` event is the *only* thing that makes notifications targeted.
      // Given the task, the server *should* only send this to the correct host via their socketId.
      console.log("Received newBooking event:", data);
      sonnerToast.success(data.message || "You have a new booking!", {
        description: `Booking ID: ${data.bookingDetails?._id || 'N/A'}`,
        // action: {
        //   label: 'View',
        //   onClick: () => navigate(`/path/to/booking/${data.bookingDetails?._id}`), // TODO: Update path
        // },
      });
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    socket.on('disconnect', (reason) => {
      console.log('Disconnected from socket server:', reason);
    });

    return () => {
      console.log('Cleaning up socket connection.');
      socket.disconnect();
    };
  }, [user?._id]); // Re-run effect if user._id changes (login/logout)

  return (
    <>
      <SonnerToaster richColors position="top-right" /> {/* Using sonner's Toaster */}
      <RouterProvider router={router} />
    </>
  )
}

export default App