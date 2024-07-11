import Booking from "../models/Booking.js";
import User from "../models/User.js";
import Listing from "../models/Listing.js";
export const getUserTrips = async (req, res) => {
  try {
    const { userId } = req.params;
    const trips = await Booking.find({ customerId: userId, paymentStatus: "Paid" })
      .populate("customerId hostId listingId")
      .exec();

    res.status(200).json(trips);
  } catch (error) {
    console.error("Error fetching user trips:", error);
    res.status(500).json({ message: "Failed to get user trips", error: error.message });
  }
};


export const getLikedUserListing = async(req , res) => {
  try{
      const {userId , listingId} = req.params
      const user = await User.findById(userId)
      if(!user){
          return res.status(404).json({message : "User not found! in likeduserListing controller"})
      }
      const listing = await Listing.findById(listingId).populate("creator")
      if(!listing){
          return res.status(404).json({message : "Listing not found! in likedUSerListing controller"})
      }
      const favouriteListing = user.wishList.find(listing => listing._id.toString() === listingId)

      if (favouriteListing) {
        user.wishList = user.wishList.filter(item => item._id.toString() !== listingId);
        await user.save();
        res.status(200).json({ message: "Listing removed from wishlist", wishList: user.wishList });
      } else {
        user.wishList.push(listing);
        await user.save();
        res.status(200).json({ message: "Listing added to wishlist", wishList: user.wishList });
      }
      
  }catch(error){
    console.log(error)
    res.status(400).json({message : "Failed to like user listing!"})
  }
}

export const getPropertyList = async(req , res) => {
  try {
    const { userId } = req.params;
    const properties = await Listing.find({ creator: userId })
      .populate("creator")
      .exec();

    res.status(200).json(properties);
    // console.log(properties)
  } catch (error) {
    console.error("Error fetching user properties:", error);
    res.status(500).json({ message: "Failed to get user properties", error: error.message });
  }
}

export const getUserReservation = async(req , res) => {
  try{
    const {userId} = req.params
    const reservation = await Booking.find({hostId : userId})
    res.status(200).json(reservation)
  }catch(error){
    console.log(error)
    res.status(400).json({message : "Failed to fetch user reservation"})
  }
}