import express from "express"
import { getUserTrips } from "../controllers/user.js"
const router = express.Router()


router.get("/:userId/trips" , getUserTrips)

export default router