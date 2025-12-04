import express from "express"
import { uploadListingPhotos } from "../config/multerCloudinary.js";
import { createListing, getListingById, getListingData } from "../controllers/Listing.js";

const router = express.Router();

router.post('/create', uploadListingPhotos.array("listingPhotos"), createListing)

router.get('/', getListingData)
router.get('/:listingId', getListingById)

export default router