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
    console.log(hostId)

    req.io.emit("newBooking", {
      message: `You have a new booking from ${customerId} for listing ${listingId}`,
      booking: newBooking
    });
    
    console.log(`Emitting "newBooking" event to hostId ${hostId}`);
    res.status(200).json(newBooking);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Fail to create a new Booking!", error: err.message });
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