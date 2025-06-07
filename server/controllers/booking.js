import Listing from "../models/Listing.js";
import Booking from "../models/Booking.js";
import Razorpay from "razorpay"
import dotenv from "dotenv"
import crypto from "crypto"
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET
})

export const createBooking = async (req, res) => {
  try {
    const { customerId, hostId, listingId, startDate, endDate, totalPrice } = req.body;

    const options = {
      amount : totalPrice * 100,
      currency : "INR",
      receipt : `receipt_order_${Math.random()}`
    }

    const order = await razorpay.orders.create(options);
    console.log(order)

    const newBooking = new Booking({
      customerId,
      hostId,
      listingId,
      startDate,
      endDate,
      totalPrice,
      paymentStatus: "Pending",
      razorpayOrderId: order.id
    });
    await newBooking.save();

    // Populate related fields to include in the notification and response
    await newBooking.populate([
      { path: "customerId", select: "username profileImagePath" },
      { path: "listingId", select: "title listingPhotoPaths city country type price" },
      { path: "hostId", select: "username" } // Ensure hostId itself is populated if needed, though we have hostId string
    ]);

    const hostIdString = newBooking.hostId._id.toString(); // hostId is populated, get its _id
    const userSockets = req.userSockets;

    if (userSockets && hostIdString && userSockets[hostIdString]) {
      const hostSocketId = userSockets[hostIdString];
      req.io.to(hostSocketId).emit("newBooking", {
        message: `You have a new booking for your property: ${newBooking.listingId.title || 'N/A'} by ${newBooking.customerId.username || 'a customer'}.`,
        bookingDetails: newBooking,
      });
      console.log(`Emitted "newBooking" event to host ${hostIdString} on socket ${hostSocketId}`);
    } else {
      console.log(`Host ${hostIdString} is not connected or socket ID not found. No WebSocket event emitted for newBooking.`);
    }
    
    res.status(200).json(newBooking);
  } catch (err) {
    console.error("Error creating booking:", err); // Use console.error for errors
    res.status(400).json({ message: "Failed to create a new Booking!", error: err.message });
  }
};


export const verifyPayment = async(req , res) => {
  const {order_id , payment_id , signature} = req.body
  console.log({order_id , payment_id , signature})
  const generatedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(order_id + "|" + payment_id)
    .digest("hex");

    if (generatedSignature === signature) {
      const booking = await Booking.findOneAndUpdate(
        { razorpayOrderId: order_id },
        { paymentStatus: "Paid" },
        { new: true }
      );
  
      if (booking) {
        res.status(200).json({ message: "Payment verified successfully", booking });
      } else {
        res.status(400).json({ message: "Booking not found" });
      }
    } else {
      res.status(400).json({ message: "Invalid signature" });
    }
  };