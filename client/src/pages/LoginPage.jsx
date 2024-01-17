import { Link } from "react-router-dom";
import { useState } from "react";

const LoginPage = () => {
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formdata,
      [name]: value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8  rounded-lg shadow-md md:w-[55%] w-full">
        <form className="flex flex-col gap-4">
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
