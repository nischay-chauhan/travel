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
    <div className="bg-gray-800 p-6 flex justify-between items-center text-white">
      <Link to="/">
        <h1 className="text-3xl font-bold">TOURIST</h1>
      </Link>

      <div className="lg:hidden">
        {isSidebarOpen ? (
          <FaTimes
            className="text-white text-2xl cursor-pointer"
            onClick={toggleSidebar}
          />
        ) : (
          <FaBars
            className="text-white text-2xl cursor-pointer"
            onClick={toggleSidebar}
          />
        )}
      </div>

      <div className="hidden lg:flex items-center space-x-4">
        <div className="relative flex ">
          <input
            type="text"
            placeholder="Search ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="py-1 px-2 rounded-l bg-gray-700 text-white focus:outline-none"
          />
          <button
            disabled={search === ""}
            onClick={() => {
              navigate(``);
            }}
            className="py-1 px-4 bg-gray-600 rounded-r cursor-pointer"
          >
            <FaSearch className="text-white" />
          </button>
        </div>

        <Link to={user ? "" : "/login"} className="hover:text-gray-500">
          Become A Host
        </Link>

        <button
          className="flex items-center space-x-2  cursor-pointer relative"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        >
          {!user ? (
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="profile photo"
              className="w-16 h-16 object-cover rounded-full"
            />
          ) : (
            <img
              src={`http://localhost:3001/${user.profileImagePath.replace(
                "public",
                ""
              )}`}
              alt="profile photo"
              className="w-8 h-8 object-cover rounded-full"
            />
          )}
          {dropdownMenu && (
            <div className="absolute top-14 z-10 w-max right-0 bg-gray-800  space-y-2 p-8 max-w-xl">
              {!user ? (
                <div className="flex flex-col ">
                  <Link
                    to="/login"
                    className="block text-lg hover:text-gray-500"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    className="block text-lg hover:text-gray-500"
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col space-y-3">
                  <Link to={``} className="block text-xl hover:text-gray-500">
                    Trip List
                  </Link>
                  <Link to={``} className="block text-xl hover:text-gray-500">
                    Wish List
                  </Link>
                  <Link to={``} className="block text-xl hover:text-gray-500">
                    Property List
                  </Link>
                  <Link to={``} className="block text-xl hover:text-gray-500">
                    Reservation List
                  </Link>
                  <Link to="" className="block text-xl hover:text-gray-500">
                    Become A Host
                  </Link>
                  <Link
                    to="/login"
                    onClick={() => {
                      dispatch(setLogout());
                      setDropdownMenu(false);
                    }}
                    className="block text-xl hover:text-gray-500"
                  >
                    Log Out
                  </Link>
                </div>
              )}
            </div>
          )}
        </button>
      </div>

      {isSidebarOpen && (
        <div className="lg:hidden z-10 fixed top-0 left-0 h-full w-3/5 bg-gray-800">
          <div className="p-8">
            <div className="flex items-center space-x-2 mb-4">
              <img
                src={
                  user
                    ? `http://localhost:3001/${user.profileImagePath.replace(
                        "public",
                        ""
                      )}`
                    : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                }
                alt="profile photo"
                className="w-16 h-16 object-cover rounded-full"
              />
              <h3 className="text-white text-lg">
                {user ? user.username : "Guest"}
              </h3>

              <input
                type="text"
                placeholder="Search..."
                className="px-2 py-1 border border-gray-500 rounded-md focus:outline-none"
              />

              <button className="text-xl text-white hover:text-gray-500">
                Search
              </button>
            </div>

            <div className="space-y-4">
              {user ? (
                <div className="flex flex-col space-y-3">
                  <Link to={`/create-listing`} className="block text-xl hover:text-gray-500">
                    Create Listing
                  </Link>

                  <Link to={``} className="block text-xl hover:text-gray-500">
                    Trip List
                  </Link>
                  <Link to={``} className="block text-xl hover:text-gray-500">
                    Wish List
                  </Link>
                  <Link to={``} className="block text-xl hover:text-gray-500">
                    Property List
                  </Link>
                  <Link to={``} className="block text-xl hover:text-gray-500">
                    Reservation List
                  </Link>
                  <Link to="" className="block text-xl hover:text-gray-500">
                    Become A Host
                  </Link>
                  <Link
                    to="/login"
                    onClick={() => {
                      dispatch(setLogout());
                      setDropdownMenu(false);
                    }}
                    className="block text-xl hover:text-gray-500"
                  >
                    Log Out
                  </Link>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-xl text-white hover:text-gray-500 block"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    className="text-xl text-white hover:text-gray-500 block"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
            <div className=" rounded-full">
              <button
                onClick={toggleSidebar}
                className="text-xl text-red-500 rounded mt-3 "
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
