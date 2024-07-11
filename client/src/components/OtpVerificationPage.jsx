import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const OtpVerificationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state);
  const [otp, setOtp] = useState('');

  const userId = location.state.userId;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/verify-otp', { userId, otp });
      if (response.status === 200) {
        toast.success('OTP verified successfully!');
        navigate('/login');
      } else {
        toast.error('Invalid OTP. Please try again.');
      }
    } catch (error) {
      toast.error('Error verifying OTP. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-5">OTP Verification</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full h-12 text-xl p-4 rounded focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter OTP"
            required
          />
          <button
            type="submit"
            className="w-full h-12 text-xl bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpVerificationPage;
