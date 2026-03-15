import express from "express"
import { createFlight, searchFlights, getFlightById } from "../controllers/flightController.js"

const router = express.Router()

router.post("/", createFlight)
router.get("/search", searchFlights)
router.get("/:id", getFlightById)

export default router