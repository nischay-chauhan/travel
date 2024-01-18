import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

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

        const newUser = new User({
            firstName,
            lastName,
            email,
            password : hashedPassword,
            profileImagePath,
        })

        await newUser.save()

        res.status(200).json({
            status : 'success',
            message : 'User created successfully',
            user:newUser
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

