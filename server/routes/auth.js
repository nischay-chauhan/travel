import express from "express"
import multer from "multer";
import { login, register, verifyOtp } from "../controllers/auth.js";
const router = express.Router();

const storage  = multer.diskStorage({
    destination: function(req , file , cb){
        cb(null , 'public/images')
    },
    filename: function(req , file , cb){
        cb(null , file.originalname)
    }
})

const upload = multer({storage})

router.post('/register' , upload.single(('profileImage')) , register );

router.post('/login' , login);
router.post('/verify-otp' , verifyOtp)

export default router;