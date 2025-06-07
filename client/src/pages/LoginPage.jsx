import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion"; // Import motion
import { Loader2 } from "lucide-react"; // Import Loader2
import toast from "react-hot-toast";
import { setLogin } from "../redux/state";
import { useDispatch } from "react-redux";
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

const cardVariants = { // Define cardVariants
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Changed Navigate to navigate (convention)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Added isLoading state

  // Simplified handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true
    try {
      const response = await axios.post("http://localhost:3001/api/login", {
        email,
        password,
      });
      const { user, token } = response.data;
      if (response.status === 200) {
        dispatch(setLogin({ user, token }));
        toast.success("Login successful");
        navigate("/"); // Changed Navigate to navigate
      }
    } catch (error) {
      console.error("Login failed:", error.response || error.message);
      toast.error(
        error.response?.data?.message ||
        error.response?.data?.error || // Check for error.response.data.error
        "Invalid credentials. Login failed."
      );
    } finally {
      setIsLoading(false); // Set loading to false
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div initial="hidden" animate="visible" variants={cardVariants} className="w-full max-w-md">
        <Card> {/* Removed className from Card as it's on motion.div now */}
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">LOGIN HERE</CardTitle>
          <CardDescription>Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                required
                placeholder="••••••••"
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center block">
          <p className="text-sm">
            New User?{" "}
            <Button variant="link" asChild className="p-0 h-auto">
              <Link to="/register">Register here</Link>
            </Button>
          </p>
        </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginPage;
