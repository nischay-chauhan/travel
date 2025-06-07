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

// Initialize userSockets map
const userSockets = {};

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
  console.log(`A user connected: ${socket.id}`);

  // Listen for user registration event
  socket.on("registerUser", (userId) => {
    if (userId) {
      userSockets[userId] = socket.id;
      console.log(`User registered: ${userId} with socket ID: ${socket.id}`);
      console.log("Current userSockets:", userSockets);
    } else {
      console.log(`Attempted to register with undefined userId for socket: ${socket.id}`);
    }
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    // Find and remove user from userSockets map
    for (const userId in userSockets) {
      if (userSockets[userId] === socket.id) {
        delete userSockets[userId];
        console.log(`User removed: ${userId}`);
        console.log("Current userSockets:", userSockets);
        break;
      }
    }
  });
});

app.use((req, res, next) => {
  req.io = io;
  req.userSockets = userSockets; // Make userSockets available in request object
  next();
});

// Optional: Test endpoint to see current userSockets (for debugging)
app.get("/test-usersockets", (req, res) => {
  res.json(req.userSockets || {});
});

app.use('/api', authRoutes);
app.use('/properties', listingRoutes);
app.use('/bookings', bookingRoutes);
app.use('/users', userRoutes);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
