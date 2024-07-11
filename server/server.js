import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import listingRoutes from "./routes/listing.js";
import authRoutes from "./routes/auth.js";
import bookingRoutes from "./routes/booking.js";
import userRoutes from "./routes/user.js";
import http from "http";
import { Server } from "socket.io";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

connectDB();

const PORT = process.env.PORT || 3001;

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api', authRoutes);
app.use('/properties', listingRoutes);
app.use('/bookings', bookingRoutes);
app.use('/users', userRoutes);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
