import express from "express"
import { createBooking, getBookingsByUser, cancelBooking } from "../controllers/bookingController.js"

const router = express.Router()

router.post("/", createBooking)
router.get("/user/:id", getBookingsByUser)
router.delete("/:id", cancelBooking)

export default router