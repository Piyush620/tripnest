import Booking from "../models/Booking.js"
import axios from "axios"

export const createBooking = async (req, res) => {
  try {
    const { userId, flightId, passengers, totalPrice } = req.body

    if (!userId || !flightId || !passengers || !totalPrice) {
      return res.status(400).json({ error: "All fields are required" })
    }

    // Check if flight exists
    const flightResponse = await axios.get(`http://flight-service:5002/flights/${flightId}`)
    const flight = flightResponse.data

    if (!flight) {
      return res.status(404).json({ error: "Flight not found" })
    }

    const booking = new Booking({
      userId,
      flightId,
      passengers,
      totalPrice
    })

    await booking.save()

    res.status(201).json(booking)
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json({ error: error.response.data.error })
    } else {
      res.status(500).json({ error: error.message })
    }
  }
}

export const getBookingsByUser = async (req, res) => {
  try {
    const { id } = req.params

    const bookings = await Booking.find({ userId: id, status: 'confirmed' })

    res.json(bookings)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params

    const booking = await Booking.findByIdAndUpdate(id, { status: 'cancelled' }, { new: true })

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" })
    }

    res.json(booking)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}