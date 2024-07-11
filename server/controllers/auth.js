import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User.js"
import crypto from "crypto";
import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config();
export const register = async (req, res) => {
    try{
        const {firstName , lastName , email , password} = req.body

        const profileImage = req.file
        if(!profileImage){
            return res.status(400).json({
                status : 'failure',
                error : 'Profile image is required'
            })
        }

        const profileImagePath = profileImage.path

        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(409).json({
                status : 'failure',
                error : 'User already exists'
            })
        }
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password , salt)

       
        const otp = crypto.randomBytes(3).toString('hex');
        const otpExpiry = Date.now() + 3600000; // 1 hour expiry

        const newUser = new User({
            firstName,
            lastName,
            email,
            password : hashedPassword,
            profileImagePath,
            otp,
            otpExpiry,
            isVerified : false
        })

        await newUser.save()
        //now i have to send OTP to user mail

        const transporter = nodemailer.createTransport({
            service : 'gmail',
            auth : {
                user : process.env.MAIL_USER,
                pass : process.env.MAIL_PASS
            }
        })

        const mailOptions = {
            from : process.env.MAIL_USER,
            to : email,
            subject : 'Verify your account',
            text : `Your OTP is ${otp}. It is a only valid for an Hour.`
        }
        console
        await transporter.sendMail(mailOptions);

    

        res.status(200).json({
            status : 'success',
            message : 'User created successfully , check your mail for your otp',
            user:newUser,
            userId : newUser._id
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            status : 'failure',
            error : error
        })
    }
}

export const login = async (req, res) => {
    try{

        const {email , password} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({
                status : 'failure',
                error : 'User not found & not exist'
            })
        }

        if (!user.isVerified) {
            return res.status(400).json({
                status: 'failure',
                error: 'User is not verified'
            });
        }

        const isMatch = await bcrypt.compare(password , user.password)

        if(!isMatch){
            return res.status(400).json({
                status : 'failure',
                error : 'Invalid credentials'
            })
        }

        const token = jwt.sign({id : user._id} , process.env.JWT_SECRET)
        delete user.password
        res.status(200).json({
            status : "success",
            token,
            user,
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            status : 'failure',
            error : "Internal server error "
        })
    }
}



export const verifyOtp = async(req , res) => {
    try{
        const {userId , otp} = req.body
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({
                status : 'failure',
                error : 'User not found'
            })
        }

        if(user.otp !== otp || Date.now() > user.otpExpiry){
            return res.status(400).json({
                status : 'failure',
                error : 'Invalid OTP'
            })
        }

        user.isVerified = true
        user.otp = null
        user.otpExpiry = null
        await user.save()

        res.status(200).json({
            status : 'success',
            message : 'User verified successfully'
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            status : 'failure',
            error : 'Internal server error while checking the OTP'
        })
    }
}