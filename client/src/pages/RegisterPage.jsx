import { Link } from "react-router-dom";
import { FaCloudUploadAlt } from 'react-icons/fa';
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import { toast} from "react-hot-toast"
import axios from "axios"


const RegisterPage = () => {
    const Navigate = useNavigate();
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
useEffect(() => {
    setPasswordMatch(formdata.password === formdata.confirmPassword && formdata.password !== "" ? true : false);
  }, [formdata.password, formdata.confirmPassword]);

const [passwordMatch , setPasswordMatch] = useState(true)
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const formData = new FormData();
        for (const key in formdata) {
            formData.append(key, formdata[key]);
        }
        const response = await axios.post("http://localhost:3001/api/register", formData);
        console.log(response.data);
        
        if (response.status === 200) {
            toast.success("User registered successfully!", {
                duration: 3000, 
                position: "top-center",
            });
            Navigate("/verify-otp", { state: { userId: response.data.userId } });
        } else {
            toast.error("Registration failed. Please try again.", {
                duration: 3000,
                position: "top-center",
            });
        }
    } catch (err) {
        console.error("Error registering", err);
        if (err.response && err.response.status === 409) {
            toast.error("User already exists. Please use a different email.", {
                duration: 3000,
                position: "top-center",
            });
        } else if (err.response && err.response.status === 400) {
            toast.error("Profile image is required.", {
                duration: 3000,
                position: "top-center",
            });
        } else {
            toast.error("Registration failed. Please try again.", {
                duration: 3000,
                position: "top-center",
            });
        }
    }
};


  return (
    <div className="min-h-screen flex items-center h-screen justify-center mt-4  bg-slate-100">
      <div className="bg-white p-8 rounded-lg shadow-md md:w-[55%] w-full">
        <h1 className="text-3xl font-bold mb-5">REGISTER PAGE</h1>
      {formdata.profileImage && (
                <img src={URL.createObjectURL(formdata.profileImage)}
                alt="profileImage"
                className="w-36 h-36 rounded-full mb-4"
                 />
            )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

          {!passwordMatch && (
            <p className="text-red-500">Passwords do not match</p>
          )}

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
            disabled={!passwordMatch}
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
