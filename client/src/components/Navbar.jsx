import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../redux/state";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="bg-blue-900 p-4 flex justify-between items-center text-white">
      <Link to="/" className="text-3xl font-bold tracking-wide">
        TOURIST
      </Link>

      <div className="lg:hidden">
        {isSidebarOpen ? (
          <FaTimes
            className="text-2xl cursor-pointer"
            onClick={toggleSidebar}
          />
        ) : (
          <FaBars
            className="text-2xl cursor-pointer"
            onClick={toggleSidebar}
          />
        )}
      </div>

      <div className="hidden lg:flex items-center space-x-6">
        <div className="relative flex items-center">
          {/** Search bar */}
          
        </div>

        <Link
          to={user ? "/create-listing" : "/login"}
          className="hover:text-blue-400 transition-colors duration-200"
        >
          Become A Host
        </Link>

        <div className="relative">
          <button
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setDropdownMenu(!dropdownMenu)}
          >
            <img
              src={
                user && user.profileImagePath
                  ? `http://localhost:3001/${user.profileImagePath.replace(
                      "public",
                      ""
                    )}`
                  : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              alt="profile"
              className="w-8 h-8 object-cover rounded-full"
            />
          </button>

          {dropdownMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-blue-800 rounded-lg shadow-lg py-2 z-20">
              {!user ? (
                <div className="flex flex-col items-start">
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-lg hover:text-blue-400 transition-colors duration-200"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-2 text-lg hover:text-blue-400 transition-colors duration-200"
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col items-start space-y-2">
                  <Link
                    to={`/${user._id}/trips`}
                    className="block px-4 py-2 text-lg hover:text-blue-400 transition-colors duration-200"
                  >
                    Trip List
                  </Link>
                  <Link
                    to={`/${user._id}/wishList`}
                    className="block px-4 py-2 text-lg hover:text-blue-400 transition-colors duration-200"
                  >
                    Wish List
                  </Link>
                  <Link
                    to={`/${user._id}/properties`}
                    className="block px-4 py-2 text-lg hover:text-blue-400 transition-colors duration-200"
                  >
                    Property List
                  </Link>
                  <Link
                    to={`/${user._id}/reservation`}
                    className="block px-4 py-2 text-lg hover:text-blue-400 transition-colors duration-200"
                  >
                    Reservation List
                  </Link>
                  <Link
                    to="/create-listing"
                    className="block px-4 py-2 text-lg hover:text-blue-400 transition-colors duration-200"
                  >
                    Become A Host
                  </Link>
                  <Link
                    to="/login"
                    onClick={() => {
                      dispatch(setLogout());
                      setDropdownMenu(false);
                    }}
                    className="block px-4 py-2 text-lg hover:text-blue-400 transition-colors duration-200"
                  >
                    Log Out
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {isSidebarOpen && (
        <div className="lg:hidden fixed top-0 left-0 h-full w-4/5 bg-blue-900 z-20 transition-transform transform">
          <div className="p-8">
            <div className="flex flex-col items-center mb-8">
              <img
                src={
                  user
                    ? `http://localhost:3001/${user.profileImagePath.replace(
                        "public",
                        ""
                      )}`
                    : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                }
                alt="profile"
                className="w-24 h-24 object-cover rounded-full mb-4"
              />
              <h3 className="text-white text-lg mb-4">
                {user ? user.username : "Guest"}
              </h3>
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-4 py-2 w-full bg-blue-800 text-white rounded-md focus:outline-none mb-4"
              />
              <button
                className="px-4 py-2 bg-blue-700 rounded-md text-white w-full"
                onClick={() => navigate(``)}
              >
                Search
              </button>
            </div>

            <div className="flex flex-col space-y-4">
              {user ? (
                <>
                  <Link
                    to={`/`}
                    className="block text-xl text-white hover:text-blue-400 transition-colors duration-200"
                    onClick={toggleSidebar}
                  >
                    Home
                  </Link>
                  <Link
                    to={`/${user._id}/trips`}
                    className="block text-xl text-white hover:text-blue-400 transition-colors duration-200"
                    onClick={toggleSidebar}
                  >
                    Trip List
                  </Link>
                  <Link
                    to={`/${user._id}/wishList`}
                    className="block text-xl text-white hover:text-blue-400 transition-colors duration-200"
                    onClick={toggleSidebar}
                  >
                    Wish List
                  </Link>
                  <Link
                    to={`/${user._id}/properties`}
                    className="block text-xl text-white hover:text-blue-400 transition-colors duration-200"
                    onClick={toggleSidebar}
                  >
                    Property List
                  </Link>
                  <Link
                    to={`/${user._id}/reservation`}
                    className="block text-xl text-white hover:text-blue-400 transition-colors duration-200"
                    onClick={toggleSidebar}
                  >
                    Reservation List
                  </Link>
                  <Link
                    to="/create-listing"
                    className="block text-xl text-white hover:text-blue-400 transition-colors duration-200"
                    onClick={toggleSidebar}
                  >
                    Become A Host
                  </Link>
                  <Link
                    to="/login"
                    onClick={() => {
                      dispatch(setLogout());
                      setSidebarOpen(false);
                    }}
                    className="block text-xl text-white hover:text-blue-400 transition-colors duration-200"
                  >
                    Log Out
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block text-xl text-white hover:text-blue-400 transition-colors duration-200"
                    onClick={toggleSidebar}
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    className="block text-xl text-white hover:text-blue-400 transition-colors duration-200"
                    onClick={toggleSidebar}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
            <button
              onClick={toggleSidebar}
              className="text-xl text-red-500 mt-8"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
