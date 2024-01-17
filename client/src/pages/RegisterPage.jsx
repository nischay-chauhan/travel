import { Link } from "react-router-dom";
import { FaCloudUploadAlt } from 'react-icons/fa';
import { useState } from "react";

const RegisterPage = () => {
    const [formdata , setFormdata] = useState({
        firstName : "",
        lastName : "",
        email : "",
        password : "",
        confirmPassword : "",
        profileImage : null,
    })

   const handleChange = (e) => {
    const {name , value , files} = e.target;
    setFormdata({
        ...formdata,
        [name] : value,
        [name]: name === "profileImage" ? files[0] : value
    })
   }

//    console.log(formdata)
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-lg shadow-md md:w-[55%] w-full">
      {formdata.profileImage && (
                <img src={URL.createObjectURL(formdata.profileImage)}
                alt="profileImage"
                className="w-36 h-36 rounded-full mb-4"
                 />
            )}
        <form className="flex flex-col gap-4">
          <div className="border-b-2 border-gradient pb-2 mb-4">
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={formdata.firstName}
              onChange={handleChange}
              className="w-full h-12  text-xl rounded p-4 focus:outline-none focus:border-blue-500 focus:border-brightness-110"
              required
              placeholder="First Name"
            />
          </div>

          <div className="border-b-2 border-gradient pb-2 mb-4">
            <input
              type="text"
              id="lastName"
              name = "lastName"
              value={formdata.lastName}
              onChange={handleChange}
              className="w-full h-12 text-xl p-4 rounded focus:outline-none focus:border-blue-500 focus:border-brightness-110"
              required
              placeholder="Last Name"
            />
          </div>

          <div className="border-b-2 border-gradient pb-2 mb-4">
            <input
              type="email"
              id="email"
              name="email"
              value={formdata.email}
              onChange={handleChange}
              className="w-full text-xl h-12 rounded p-4 focus:outline-none focus:border-blue-500 focus:border-brightness-110"
              required
              placeholder="Email"
            />
          </div>

          <div className="border-b-2 border-gradient pb-2 mb-4">
            <input
              type="password"
              id="password"
              name="password"
              value={formdata.password}
              onChange={handleChange}
              className="w-full h-12 p-4 rounded focus:outline-none focus:border-blue-500 text-xl focus:border-brightness-110"
              required
              placeholder="Password"
            />
          </div>

          <div className="border-b-2 border-gradient pb-2 mb-4">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formdata.confirmPassword}
              onChange={handleChange}
              className="w-full h-12 p-4 rounded focus:outline-none focus:border-blue-500 text-xl focus:border-brightness-110"
              required
              placeholder="Confirm Password"
            />
          </div>

          <label htmlFor="image" className="text-gray-600 flex items-center">
            <FaCloudUploadAlt className="mr-2" /> Upload Profile Picture
          </label>
          <div className="flex items-center border-b-2 border-gradient pb-2 mb-4">
            <input
              type="file"
              id="image"
              name="profileImage"
              onChange={handleChange}
              className="w-full text-xl h-12 rounded focus:outline-none focus:border-blue-500 focus:border-brightness-110"
              accept="image/*"
              style={{ display: "none" }}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white rounded-full py-3 px-6 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Register
          </button>
        </form>

        <div className="mt-4">
          Already Registered? <Link to="/login" className="text-blue-500">Go to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
