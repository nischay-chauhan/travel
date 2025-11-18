import { useState, useEffect } from 'react';
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

  const params = new URLSearchParams(location.search);
  const userIdFromUrl = params.get('userId');
  const userIdFromState = location.state?.userId;

  const userId = userIdFromUrl || userIdFromState || sessionStorage.getItem('otpUserId');

  useEffect(() => {
    if (userId) {
      sessionStorage.setItem('otpUserId', userId);
    } else {
      toast.error("User ID not found for OTP verification.");
      navigate('/register', { replace: true });
    }
  }, [userId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp) {
      toast.error('Please enter the OTP');
      return;
    }

    if (!userId) {
      toast.error('Session expired. Please start the registration again.');
      navigate('/register', { replace: true });
      return;
    }

    setIsLoading(true);
    console.log('Submitting OTP verification with:', { userId, otp });

    try {
      const response = await axios.post('/api/verify-otp', {
        userId,
        otp
      });

      console.log('OTP verification response:', response.data);

      if (response.data?.status === 'success') {
        console.log('OTP verification successful, navigating to login');
        toast.dismiss();
        toast.success(response.data.message || 'OTP verified successfully! Please login.');

        localStorage.setItem('otpVerified', 'true');

        setTimeout(() => {
          navigate('/login', {
            replace: true,
            state: {
              fromOtpVerification: true,
              email: location.state?.email || ''
            }
          });
          setTimeout(() => sessionStorage.removeItem('otpUserId'), 500);
        }, 1000);
      } else {
        throw new Error(response.data?.message || 'OTP verification failed.');
      }

    } catch (error) {
      console.error("OTP Verification failed:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        'An error occurred during OTP verification.';
      toast.error(errorMessage);
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
            Didn’t receive OTP?{' '}
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
