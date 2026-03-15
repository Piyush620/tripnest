import express from "express"
import { createHotel, searchHotels, getHotelById } from "../controllers/hotelController.js"

const router = express.Router()

router.post("/", createHotel)
router.get("/search", searchHotels)
router.get("/:id", getHotelById)
// router.post("/:id/upload-image", uploadImage)

export default router