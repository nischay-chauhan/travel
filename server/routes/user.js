import express from "express"
import { getLikedUserListing, getPropertyList, getUserTrips } from "../controllers/user.js"
const router = express.Router()


router.get("/:userId/trips" , getUserTrips)
router.patch('/:userId/:listingId' , getLikedUserListing )
router.get("/:userId/properties" , getPropertyList)
export default router