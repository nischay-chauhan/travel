import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import listingRoutes from "./routes/listing.js";
import authRoutes from "./routes/auth.js";
import bookingRoutes from "./routes/booking.js";
import userRoutes from "./routes/user.js";
import chatRoutes from "./routes/chat.js";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const server = http.createServer(app);

// Initialize userSockets map
const userSockets = {};

const isProd = process.env.NODE_ENV === "production";
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
const io = new Server(server, {
  cors: isProd
    ? { origin: true, methods: ["GET", "POST"] }
    : { origin: CLIENT_URL, methods: ["GET", "POST"] },
});

app.use(cors({ origin: isProd ? true : CLIENT_URL }));
app.use(express.json());
app.use(express.static('public'));

connectDB();

const PORT = process.env.PORT || 3001;

// Serve Vite build in production
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, "../client/dist");
app.use(express.static(distPath));

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

  // Listen for sending a message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const receiverSocketId = userSockets[receiverId];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receiveMessage", {
        senderId,
        text,
        createdAt: new Date(),
      });
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
app.use('/api/chat', chatRoutes);

// SPA fallback - send index.html for all non-API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
