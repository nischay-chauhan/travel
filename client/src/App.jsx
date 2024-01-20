import { createBrowserRouter , RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import {Toaster} from "react-hot-toast"
import CreateListing from "./pages/CreateListing"
import ListingDetails from "./pages/ListingDetails"
import TripLists from "./pages/TripLists"

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
    path : "/:userId/trips",
    element : <TripLists />
  }
])

const App = () => {
  return (
   <>
   <Toaster  />
   <RouterProvider router={router} />
   </>
  )
}

export default App