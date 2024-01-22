import express from "express"
import { getLikedUserListing, getPropertyList, getUserReservation, getUserTrips } from "../controllers/user.js"
const router = express.Router()


router.get("/:userId/trips" , getUserTrips)
router.patch('/:userId/:listingId' , getLikedUserListing )
router.get("/:userId/properties" , getPropertyList)
router.get("/:userId/reservation" , getUserReservation)
export default router