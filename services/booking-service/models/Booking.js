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
  hotelId: {
    type: String
  },
  passengers: {
    type: Number,
    required: true,
    min: 1,
    max: 9
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0,
    validate: {
      validator: function(v) {
        return v >= 0
      },
      message: "Price cannot be negative"
    }
  },
  currency: {
    type: String,
    default: "USD"
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'confirmed'
  },
  bookingDate: {
    type: Date,
    default: Date.now
  },
  checkInDate: {
    type: Date
  },
  checkOutDate: {
    type: Date
  },
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'paid', 'refunded'],
    default: 'unpaid'
  },
  notes: {
    type: String
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

// Indexes for faster queries
bookingSchema.index({ userId: 1 })
bookingSchema.index({ flightId: 1 })
bookingSchema.index({ hotelId: 1 })
bookingSchema.index({ status: 1 })
bookingSchema.index({ bookingDate: -1 })
bookingSchema.index({ userId: 1, status: 1 })

const Booking = mongoose.model('Booking', bookingSchema)

export default Booking