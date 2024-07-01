import Listing from "../models/Listing.js";
import Booking from "../models/Booking.js";
export const createBooking = async (req, res) => {
  try {
    const { customerId, hostId, listingId, startDate, endDate, totalPrice } =
      req.body;
    const newBooking = new Booking({
      customerId,
      hostId,
      listingId,
      startDate,
      endDate,
      totalPrice,
    });
    await newBooking.save();

    req.io.to(hostId).emit("newBooking", {
      message :  `You have a new booking from ${customerId} for listing ${listingId}`,
      booking : newBooking
    });

    res.status(200).json(newBooking);
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ message: "Fail to create a new Booking!", error: err.message });
  }
};
