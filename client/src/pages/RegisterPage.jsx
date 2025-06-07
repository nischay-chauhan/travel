import { Link, useNavigate } from "react-router-dom";
import { UploadCloud, Loader2 } from 'lucide-react'; // Replaced FaCloudUploadAlt, Added Loader2
import { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Import motion
import { toast } from "react-hot-toast";
import axios from "axios";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // For image preview

const cardVariants = { // Define cardVariants
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const RegisterPage = () => {
  const navigate = useNavigate(); // Changed Navigate to navigate
  const [formData, setFormData] = useState({ // Changed formdata to formData (convention)
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });
  const [previewImage, setPreviewImage] = useState(""); // For image preview URL
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // Added isLoading state

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImage") {
      const file = files[0];
      setFormData({
        ...formData,
        profileImage: file,
      });
      setPreviewImage(URL.createObjectURL(file)); // Create preview URL
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    setPasswordMatch(
      formData.password === formData.confirmPassword || formData.confirmPassword === ""
    );
  }, [formData.password, formData.confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true

    if (!passwordMatch) {
      toast.error("Passwords do not match!");
      setIsLoading(false); // Reset loading state
      return;
    }
    if (!formData.profileImage) {
        toast.error("Profile image is required.");
        setIsLoading(false); // Reset loading state
        return;
    }

    const data = new FormData(); // Changed variable name from formData to data
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/api/register",
        data
      );
      if (response.status === 200) {
        toast.success("User registered successfully!");
        navigate("/verify-otp", { state: { userId: response.data.userId } });
      }
      // No need for else block here, as axios throws an error for non-2xx responses, which is caught below.
    } catch (err) {
      console.error("Error registering:", err.response || err.message);
      toast.error(
        err.response?.data?.message ||
        err.response?.data?.error || // Check for error.response.data.error
        "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false); // Set loading to false
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div initial="hidden" animate="visible" variants={cardVariants} className="w-full max-w-lg">
        <Card> {/* Removed className from Card as it's on motion.div now */}
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">CREATE AN ACCOUNT</CardTitle>
          <CardDescription>
            Join us by filling out the information below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-center mb-6">
              <Label htmlFor="profileImage" className="cursor-pointer">
                <Avatar className="w-32 h-32 border-2 border-dashed hover:border-primary">
                  <AvatarImage src={previewImage} alt="Profile Preview" />
                  <AvatarFallback className="bg-muted">
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <UploadCloud className="w-12 h-12 mb-1" />
                      <span>Upload Image</span>
                    </div>
                  </AvatarFallback>
                </Avatar>
              </Label>
              <Input
                type="file"
                id="profileImage"
                name="profileImage"
                onChange={handleChange}
                accept="image/*"
                className="hidden" // Hidden, triggered by label
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  placeholder="John"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="••••••••"
              />
              {!passwordMatch && formData.confirmPassword !== "" && (
                <p className="text-sm text-destructive pt-1">
                  Passwords do not match.
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || (!passwordMatch && formData.confirmPassword !== "")}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center block">
          <p className="text-sm">
            Already Registered?{" "}
            <Button variant="link" asChild className="p-0 h-auto">
              <Link to="/login">Go to Login</Link>
            </Button>
          </p>
        </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
