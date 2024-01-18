import Navbar from "../components/Navbar";
import { categories } from "../components/Category";
import { FaHouseUser, FaHome } from "react-icons/fa";
import { BsFillDoorOpenFill } from "react-icons/bs";

export const types = [
  {
    name: "An entire place",
    description: "Guests have the whole place to themselves",
    icon: <FaHouseUser />,
  },
  {
    name: "Room(s)",
    description:
      "Guests have their own room in a house, plus access to shared places",
    icon: <BsFillDoorOpenFill />,
  },
  {
    name: "A Shared Room",
    description:
      "Guests sleep in a room or common area that may be shared with you or others",
    icon: <FaHome />, // Change to a different icon
  },
];

const CreateListing = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto">
        <div className="flex mt-6 flex-col items-center">
          <p
            className="text-4xl font-bold"
            style={{
              background: "linear-gradient(to right, #4F46E5, #F469A9)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Publish Your Place
          </p>
        </div>
        <form className="mt-10  m-4 flex flex-col">
          <div className="mb-4">
            <h3 className="text-2xl font-bold">Tell us about Your Place</h3>
          </div>
          <div className="flex flex-wrap justify-center">
            {categories.map((item, index) => (
              <div
                key={index}
                className="w-36 h-24 m-2 relative overflow-hidden rounded-md transition-transform duration-300 transform hover:scale-105"
              >
                <div className="absolute inset-0  bg-black opacity-70 transition-opacity duration-300 hover:opacity-0"></div>
                <div className="absolute  inset-0 flex items-center justify-center">
                  <div className="text-white  text-center">
                    <div className="text-2xl">{item.icon}</div>
                    <p className="mt-2">{item.label}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="mt-4 w-full">
              <h2 className="text-2xl font-bold">
                What type of Places will guests have ?
              </h2>
            </div>
            <div className="mt-4 w-full">
              {types?.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-200 p-4 rounded-md mb-2"
                >
                  <div className="flex flex-col">
                    <h4 className="text-xl font-bold">{item.name}</h4>
                    <p className="mr-2">{item.description}</p>
                  </div>
                  <div className="text-2xl">{item.icon}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-col w-full mt-6">
              <h3 className="text-2xl font-bold">
                Where is Your Place Located
              </h3>
              <div className="mt-4 w-full flex flex-col p-2">
                <label htmlFor="streetAddress" className="text-lg mb-1">
                  Street address
                </label>
                <input
                  id="streetAddress"
                  className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:border-primary"
                  type="text"
                  placeholder="Street name or Address"
                  name="streetAddress"
                  required
                />
              </div>
              <div className="w-full flex mb-2 p-2">
                <div className="w-full">
                  <label htmlFor="aptSuite" className="text-lg mb-1">
                    Apartment or suite
                  </label>
                  <input
                    id="aptSuite"
                    type="text"
                    name="aptSuite"
                    placeholder="Apartment or suite"
                    required
                    className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="w-full ml-4">
                  <label htmlFor="city" className="text-lg mb-1">
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    required
                    name="city"
                    placeholder="City .."
                    className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
              <div className="w-full flex mb-2 p-2">
                <div className="w-full">
                  <label htmlFor="province" className="text-lg mb-1">
                    Province
                  </label>
                  <input
                    id="province"
                    type="text"
                    placeholder="Province .."
                    required
                    name="province"
                    className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="w-full ml-4">
                  <label htmlFor="country" className="text-lg mb-1">
                    Country
                  </label>
                  <input
                    id="country"
                    type="text"
                    required
                    name="country"
                    placeholder="Country"
                    className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateListing;
