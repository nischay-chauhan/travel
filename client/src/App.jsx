import { createBrowserRouter , RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import {Toaster} from "react-hot-toast"
import CreateListing from "./pages/CreateListing"

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