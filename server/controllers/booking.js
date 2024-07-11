import Listing from "../models/Listing.js";
import Booking from "../models/Booking.js";
import Razorpay from "razorpay"
import dotenv from "dotenv"

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
      paymentStatus: "pending",
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
