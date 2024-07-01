import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/db.js"
import listingRoutes from "./routes/listing.js"
import authRoutes from "./routes/auth.js"
import BookingRoutes from "./routes/booking.js"
import userRoutes from "./routes/user.js"
import http from "http"
import {Server} from "socket.io"
const app = express()
const server = http.createServer(app)
dotenv.config()
app.use(cors())
app.use(express.json())
app.use(express.static('public'))
const io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173', 
      methods: ['GET', 'POST'],
    },
  });
connectDB()
const PORT = process.env.PORT || 3001

io.on('connection' , (socket) => {
    console.log('User connected')

    socket.on('disconnect' , () => {
        console.log('User disconnected')
    })
})



app.use('/api', authRoutes)
app.use('/properties' , listingRoutes )
app.use('/bookings' , BookingRoutes)
app.use('/users' , userRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})