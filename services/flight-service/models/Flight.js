import mongoose from "mongoose"

const flightSchema = new mongoose.Schema({
  airline: {
    type: String,
    required: true,
    trim: true
  },
  flightNumber: {
    type: String,
    required: true,
    unique: true
  },
  from: {
    type: String,
    required: true,
    trim: true
  },
  to: {
    type: String,
    required: true,
    trim: true
  },
  price: {
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
  departureTime: {
    type: String,
    required: true
  },
  arrivalTime: {
    type: String,
    required: true
  },
  departureDate: {
    type: Date,
    required: true
  },
  seatsAvailable: {
    type: Number,
    required: true,
    min: 0,
    default: 180
  },
  totalSeats: {
    type: Number,
    default: 180
  },
  duration: {
    type: String
  },
  aircraft: {
    type: String
  },
  status: {
    type: String,
    enum: ['scheduled', 'boarding', 'departed', 'arrived', 'cancelled'],
    default: 'scheduled'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

// Indexes for faster queries
flightSchema.index({ from: 1, to: 1 })
flightSchema.index({ departureDate: 1 })
flightSchema.index({ flightNumber: 1 }, { unique: true })
flightSchema.index({ from: 1, to: 1, departureDate: 1 })
flightSchema.index({ status: 1 })

const Flight = mongoose.model("Flight", flightSchema)

export default Flight