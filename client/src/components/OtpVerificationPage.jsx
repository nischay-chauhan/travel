import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const OtpVerificationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Ensure userId is available, otherwise redirect or show error
  const userId = location.state?.userId;

  if (!userId) {
    // Handle case where userId is not passed, maybe redirect to register or show an error
    // For now, redirecting to register page
    navigate('/register');
    toast.error("User ID not found for OTP verification.");
    return null; // Render nothing while redirecting
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/api/verify-otp', { userId, otp });
      if (response.status === 200) {
        toast.success('OTP verified successfully! Please login.');
        navigate('/login');
      }
      // Axios throws error for non-2xx status, so no need for 'else'
    } catch (error) {
      console.error("OTP Verification failed:", error.response || error.message);
      toast.error(
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Invalid OTP or error verifying. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">OTP Verification</CardTitle>
          <CardDescription>
            Enter the OTP sent to your email address.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="otp">One-Time Password</Label>
              <Input
                type="text"
                id="otp"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                placeholder="Enter your 6-digit OTP"
                maxLength="6"
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify OTP"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center block">
          <p className="text-sm">
            Didn't receive OTP?{" "}
            {/* Basic resend functionality can be added here later if needed */}
            <Button variant="link" asChild className="p-0 h-auto">
              <Link to="/register">Try registering again</Link>
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OtpVerificationPage;
