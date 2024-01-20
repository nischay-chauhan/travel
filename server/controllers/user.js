import Booking from "../models/Booking.js";

export const getUserTrips = async (req, res) => {
  try {
    const { userId } = req.params;
    const trips = await Booking.find({ customerId: userId })
      .populate("customerId hostId listingId")
      .exec();

    res.status(200).json(trips);
    // console.log(trips)
  } catch (error) {
    console.error("Error fetching user trips:", error);
    res.status(500).json({ message: "Failed to get user trips", error: error.message });
  }
};
