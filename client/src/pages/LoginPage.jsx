import { Link , useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios"
import toast from "react-hot-toast";
import { setLogin } from "../redux/state";
import {useDispatch} from "react-redux"

const LoginPage = () => {
  const dispatch = useDispatch()
  const Navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
        const response = await axios.post("http://localhost:3001/api/login", {email , password})
        const {user , token } = response.data;
        console.log("USER " , user)
        console.log("Token" , token)
        if (response.status === 200) {
            dispatch(setLogin({ user, token }));
            toast.success("Login successful");
            Navigate('/')
          }

    }catch(error){
        console.log(error)
        toast.error("Invalid credentials Login failed")
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8  rounded-lg flex flex-col justify-center items-center shadow-md md:w-[55%]  ">
        <h1 className="text-3xl font-bold mb-6">LOGIN HERE </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="border-b-2 border-gradient pb-2 mb-4">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
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
              value={password}
              onChange={handleChange}
              className="w-full h-12 p-4 rounded focus:outline-none focus:border-blue-500 text-xl focus:border-brightness-110"
              required
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white rounded-full py-3 px-6 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Login
          </button>
        </form>

        <div className="mt-4">
          New User? <Link to="/register" className="text-blue-500">Register here</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
