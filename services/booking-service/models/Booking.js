import mongoose from "mongoose"

const bookingSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  flightId: {
    type: String,
    required: true
  },
  passengers: {
    type: Number,
    required: true,
    min: 1
  },
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['confirmed', 'cancelled'],
    default: 'confirmed'
  },
  bookingDate: {
    type: Date,
    default: Date.now
  }
})

const Booking = mongoose.model('Booking', bookingSchema)

export default Booking