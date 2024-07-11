import express from "express"
import { createBooking, verifyPayment } from "../controllers/booking.js";

const router = express.Router();

router.post('/create' , createBooking)
router.post('/verify-payment' , verifyPayment)
export default router