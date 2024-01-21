import express from "express"
import { getLikedUserListing, getUserTrips } from "../controllers/user.js"
const router = express.Router()


router.get("/:userId/trips" , getUserTrips)
router.patch('/:userId/:listingId' , getLikedUserListing )
export default router