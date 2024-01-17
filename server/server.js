import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/db.js"


const app = express()
dotenv.config()
app.use(cors())
app.use(express.static('public'))

connectDB()
const PORT = process.env.PORT || 3001


app.listen(PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})