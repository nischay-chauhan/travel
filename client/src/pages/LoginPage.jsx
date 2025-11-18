import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion"; // Import motion
import { Loader2, Eye, EyeOff } from "lucide-react"; // Import Loader2 and eye icons
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

const cardVariants = { 
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("/api/login", {
        email,
        password,
      });
      
      const { user, token } = response.data;
      dispatch(setLogin({ user, token }));
      toast.success("Login successful");
      navigate("/");
      
    } catch (error) {
      console.error("Login failed:", error);
      
      if (error.response) {
        const errorMessage = error.response.data?.error || 
                           error.response.data?.message || 
                           "Login failed. Please try again.";
        toast.error(errorMessage);
      } else if (error.request) {
        toast.error("No response from server. Please check your connection.");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div initial="hidden" animate="visible" variants={cardVariants} className="w-full max-w-md">
        <Card> 
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
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
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
