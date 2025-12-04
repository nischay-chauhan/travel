import express from "express"
import { uploadProfileImage } from "../config/multerCloudinary.js";
import { login, register, verifyOtp } from "../controllers/auth.js";

const router = express.Router();

router.post('/register', uploadProfileImage.single('profileImage'), register);

router.post('/login', login);
router.post('/verify-otp', verifyOtp)

export default router;