import { createBrowserRouter , RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"

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
  }
])

const App = () => {
  return (
   <>
   <RouterProvider router={router} />
   </>
  )
}

export default App